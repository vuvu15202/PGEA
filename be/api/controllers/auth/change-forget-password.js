const moment = require('moment');
module.exports = {


  friendlyName: 'Change forget password',


  description: '',


  inputs: {
    account: {
      type: 'string',
      required: true
    },
    token: {
      type: 'string',
      required: true
    },
    newPassword: {
      type: 'string',
      required: true,
      // regex: /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{6,}$/
    }
  },


  exits: {

  },


  fn: async function (inputs, exits) {
    let req = this.req;
    let res = this.res;
    try {
       let current = moment().valueOf();
      // let authResetPassword = await AuthResetPassword.findOne({
      //   token: inputs.token, type: inputs.type, key: inputs.account.toLowerCase(),
      //   isDelete: false, expiredAt: { '>': current }, isUse: false
      // });

      let authResetPassword = await AuthPermission.findOne({
        token: inputs.token,
        isDelete: false,
        expiredAt: { ">": current },
        isUse: false,
      });
     
      if (!authResetPassword || inputs.account !== authResetPassword.key) {
        return res.notFound({
          message: sails.__('The link to change your password is unavailable, expired, or already in use!')
        });
      }

      if (inputs.newPassword && !constant.PASSWORD_REGEX.test(inputs.newPassword)) {
        return res.badRequest({
          message: sails.__('Password must include both alphanumeric and at least 6 characters in length!')
        });
      }

      await Auth.updateOne({
        id: authResetPassword.auth
      }).set({
        password: inputs.newPassword,
        activated: true
      });
      // authResetPassword.updateOne({ id: authResetPassword.id }).set({ isUse: true });
      await AuthPermission.destroy(authResetPassword);
      return res.ok({
        message: sails.__('Update password successfully!')
      });
    } catch (error) {
      return res.serverError(error)
    }
  }


};