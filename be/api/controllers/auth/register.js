const moment = require("moment");
const md5 = require("md5");
const uuidv1 = require("uuid/v1");


module.exports = {
  friendlyName: "Register",

  description: "Register auth.",

  inputs: {
    account: {
      type: "string",
      required: true,
      // regex: /^[a-zA-Z0-9]([._](?![._])|[a-zA-Z0-9])+[a-zA-Z0-9]$/,
    },
    password: {
      type: "string",
      required: true,
      // regex: /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{6,}$/,
    },
    email: {
      type: "string",
      required: true,
      isEmail: true,
    },
  },

  exits: {},

  fn: async function (inputs, exits) {
    let req = this.req;
    let res = this.res;
    try {
      if (!constant.ACCOUNT_REGEX.test(inputs.account)) {
        return res.badRequest({
          message: sails.__(
            "The account contains invalid characters or not enough 3 characters!"
          ),
        });
      }

      if (!constant.PASSWORD_REGEX.test(inputs.password)) {
        return res.badRequest({
          message: sails.__(
            "Password must include both alphanumeric and at least 6 characters in length!"
          ),
        });
      }

      let exitsAccount = await Auth.findOne({
        key: (inputs.account + "").toLowerCase(),
        type: "up",
        isDelete: false,
      });
      if (exitsAccount) {
        return res.forbidden({
          message: sails.__(
            "The login name already exists, please use another username!"
          ),
        });
      }

      let defaultUserType = Conf.getDataFromKey("DEFAULT_USERTYPE_ON_REGISTING") || 3;
      let roleId = [];
      let { auth, user } = await sails
        .getDatastore()
        .transaction(async (db) => {
          let createNewUser = {
            name: inputs.account,
            locale: "vi",
            email: inputs.email,
            userType: defaultUserType,
            roleId,
          };
          let createNewAuth = {
            key: inputs.account,
            password: inputs.password,
            type: "up",
            activated: false,
          };

          let createdUser = await User.create(createNewUser)
            .fetch()
            .usingConnection(db);
          createNewAuth.user = createdUser.id;
          createNewAuth = await Auth.create(createNewAuth)
            .fetch()
            .usingConnection(db);
          return {
            user: createdUser,
            auth: createNewAuth,
          };
        });

      let token = md5(auth.key + auth.type + moment().valueOf() + uuidv1());

      let authActivate = {
        auth: auth.id,
        key: auth.key,
        type: auth.type,
        token: token,
        expiredAt: moment().valueOf() + 24 * 60 * 60 * 1000,
        isUse: false,
      };

      await AuthPermission.create(authActivate);

      let link = Conf.getDataFromKey("ACTIVE_ACCOUNT_URL")
        .replace("{{token}}", token)
        .replace("{{account}}", auth.key);
      let content = `Bạn hoặc ai đó đã sử dụng email để tạo tài khoản <b>${auth.key}</b> !
<br><br>
Vui lòng truy cập đường dẫn: <a href="${link}">${link}</a> để kích hoạt tài khoản 
<br><br>
Lưu ý: Đường link chỉ được sử dụng 01 lần và có thời hạn trong 24 giờ. 
Sau thời gian trên hãy sử dụng chức năng quên mật khẩu để tiến hành tạo mới mật khẩu và kích hoạt tài khoản. 
<br><br><br>

Trân trọng cảm ơn, 
<br><br>
------------------------------------------- 
        `;
      pushNotification
        .sendMail(
          user.email,
          sails.__("[Announcement] - Activate PGEA account!"),
          content,
          req,
          {}
        )
        .catch((e) => {
          log.error(e, req);
        });
      return res.ok({
        message: sails.__("Please check your email to activate your account!"),
      });
    } catch (e) {
      return res.serverError(e);
    }
  },
};
