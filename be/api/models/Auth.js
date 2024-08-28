
/**
 * Auth.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
module.exports = {
  attributes: {
    user: {
      model: "user",
    },
    key: {
      type: "string",
      maxLength: 255,
      required: true,
    },
    password: {
      type: "string",
      allowNull: true,
    },
    type: {
      type: "string",
      maxLength: 10,
      isIn: ["up", "myfpt", "google"],
    },
    firstLoginAt: {
      type: "number",
      columnType: "bigint",
    },
    lastLoginAt: {
      type: "number",
      columnType: "bigint",
    },
    lastChangePasswordAt: {
      type: "number",
      columnType: "bigint",
    },
    payload: {
      type: "json",
      defaultsTo: {},
      description: "payload of myfpt jwt",
    },
    activated: {
      type: "boolean",
      defaultsTo: true,
    },
  },
  login: login,
  changePassword: changePassword,
  resetPassword: resetPassword,
  beforeCreate: function (createData, cb) {
    if (createData.key) {
      createData.key = (createData.key + "").toLowerCase();
    }
    if (createData.password) {
      if (!common.checkPasswordStrength(createData.password)) {
        return cb(
          sails.__(
            "Password must include both alphanumeric and at least 6 characters in length!"
          )
        );
      }
      createData.password = common.hash(createData.password);
    } else {
      delete createData.password;
    }
    return cb();
  },
  addingOmitValue: ["password"], //view more for logic in model.js

  beforeUpdate: function (updateData, cb) {
    if (updateData.key) {
      updateData.key = (updateData.key + "").toLowerCase();
    }
    if (updateData.password === "") {
      return cb(sails.__("Password can not be blank!"));
    }
    if (updateData.password) {
      if (!common.checkPasswordStrength(updateData.password)) {
        return cb(
          sails.__(
            "Password must include both alphanumeric and at least 6 characters in length!"
          )
        );
      }
      updateData.lastChangePasswordAt = moment().valueOf();
      updateData.password = common.hash(updateData.password);
    } else {
      delete updateData.password;
    }
    return cb();
  },
  bootstrap: async () => {},


};

function validatePassword(auth, password) {
  return common.checkHash(password, auth.password);
}

async function login(account, password, type, authId) {
  let where = {
    isDelete: false,
  };
  if (authId) {
    //using for generate token from admin page or refresh token
    where.id = authId;
  } else {
    where.key = (account + "").toLowerCase();
    where.type = type;
  }
  let ret = {};
  try {
    let auth = await Auth.findOne(where);

    if (!auth || !auth.user) {
      return {
        status: false,
        message: sails.__("Wrong account infomation!"),
      };
    }
    if (!auth.activated) {
      return {
        status: false,
        message: sails.__("Account was not activate!"),
      };
    }
    ret.auth = auth;
    let user = await User.findOne({
      id: auth.user,
      isDelete: false,
    }).populate("userType");
    if (user.locked) {
      return {
        status: false,
        message: sails.__("Account was blocked!"),
      };
    }

    if (where.id || validatePassword(auth, password)) {
      user.account = auth.key;
      ret.user = user;
      if (type) {
        //Khi login có type đăng nhập thì ghi lại  thời gian đăng nhập lần đầu và lần cuối
        await Auth.updateOne({
          id: auth.id,
        }).set({
          lastLoginAt: moment().valueOf(),
        });
        if (!auth.firstLoginAt) {
          await Auth.updateOne({
            id: auth.id,
          }).set({
            firstLoginAt: moment().valueOf(),
          });
        }
        if (!user.firstLoginAt) {
          await User.updateOne({
            id: auth.id,
          }).set({
            firstLoginAt: moment().valueOf(),
          });
        }
      }

      return {
        status: true,
        obj: ret,
        message: sails.__("200"),
      };
    } else {
      return {
        status: false,
        message: sails.__("Wrong account infomation!"),
      };
    }
  } catch (e) {
    // log.error(e);
    return {
      status: false,
      message: sails.__("500"),
    };
  }
}

async function changePassword(account, oldPassword, newPassword, type) {
  try {
    if (oldPassword === newPassword) {
      return {
        status: false,
        message: sails.__("New password must not the same with old password!"),
      };
    }
    if (!common.checkPasswordStrength(newPassword)) {
      return {
        status: false,
        message: sails.__(
          "Password must include both alphanumeric and at least 6 characters in length!"
        ),
      };
    }
    let tmp = await login(account, oldPassword, type);
    if (!tmp.status) {
      return tmp;
    }
    let auth = tmp.obj.auth;
    await Auth.update({
      id: auth.id,
    }).set({
      password: newPassword,
    });
    return {
      status: true,
      message: sails.__("Update password successfully!"),
    };
  } catch (e) {
    log.error(e);
    return {
      status: false,
      message: sails.__("500"),
    };
  }
}

async function resetPassword(account, type) {
  try {
    let password = Conf.getDataFromKey("DEFAULT_PASSWORD") || "abc1234";
    await Auth.update({
      key: account,
      type,
    }).set({
      password,
    });
    return {
      status: true,
      message: sails.__("New password is: ") + password,
      newPassword: password,
    };
  } catch (e) {
    log.error(e);
    return {
      status: false,
      message: sails.__("500"),
    };
  }
}
