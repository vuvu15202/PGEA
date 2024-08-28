
module.exports = {

  friendlyName: 'Change password of others',

  description: 'Change the password of another user',

  inputs: {
    userId: {
      type: 'string',
      required: true,
      description: 'User ID'
    },
    newPassword: {
      type: 'string',
      required: true
    },
    confirmPassword: {
      type: 'string',
      required: true
    }
  },

  exits: {},

  fn: async function (inputs, exits) {
    let { req, res } = this;
    let sessionUser = req.user;
    let {userId} = inputs;

    if (!isPasswordMatching(inputs.newPassword, inputs.confirmPassword, res)) {
      return res.badRequest({ message: sails.__('Passwords do not match!') });
      ;
    }

    if (!isPasswordStrong(inputs.newPassword, res)) {
      return res.badRequest({
        message: sails.__(
          "Password must include both alphanumeric and at least 6 characters in length!"
        ),
      });;
    }

    try {
      let auth = await findAuth(inputs.userId, res);
      if (!auth) {
        return  res.notFound({
          message: sails.__('Account information not found!')
        });
      }

      // if (!await hasPermission(sessionUser, auth.user, res)) {
      //   return res.forbidden({
      //     message: sails.__('Insufficient permissions to perform this action!')
      //   });
      // }

      let check = await userService.checkPermissionOnUpdateUser(sessionUser, userId, null, null);
        if (!check) {
          return res.forbidden({
            message: sails.__('Insufficient permissions to perform this action!')
          })
        }


      await updatePassword(auth.id, inputs.newPassword, res);

      return res.ok({
        message: sails.__('Password changed successfully!') + ` Account: ${auth.key} ---- Password: ${inputs.newPassword}`
      });
    } catch (error) {
      return res.serverError(error);
    }
  }
};

function isPasswordMatching(newPassword, confirmPassword, res) {
  if (newPassword !== confirmPassword) {
    return false;
  }
  return true;
}

function isPasswordStrong(password, res) {
  if (!common.checkPasswordStrength(password)) {
    return false;
  }
  return true;
}

async function findAuth(userId, res) {
  let auth = await Auth.find({
    user: userId,
    type: 'up',
    isDelete: false
  });
  if (auth.length !== 1) {
    return null;
  }
  return auth[0];
}

async function hasPermission(sessionUser, userId, res) {
  let check = await userService.checkPermissionOnUpdateUser(
    sessionUser,
    userId
  );
  return check;
}

async function updatePassword(authId, newPassword, res) {
  await Auth.updateOne({
    id: authId
  }).set({
    password: newPassword
  });
}