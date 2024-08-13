const moment = require('moment');

module.exports = {


  friendlyName: 'Gen auth token',


  description: 'Gen auth token.',


  inputs: {
    authId: {
      type: 'string',
      required: true,
    },
    lifeTimeInMinutes: {
      type: 'number',
      min: 0,
      defaultsTo: 0
    },
    email: {
      type: 'string',
      isEmail: true
    },
    additionInfo: {
      type: 'json',
      defaultsTo: {},
      custom: function (v) {
        if (Array.isArray(v)) {
          return false;
        }
        return true;
      }
    }
  },


  exits: {

  },


  fn: async function (inputs, exits) {
    let req = this.req;
    let res = this.res;

    try {
      let ret = await Auth.login(null, null, null, inputs.authId);
      if (ret.status) {
        ret = Object.assign({}, ret.obj);
        ret.additionInfo = Object.assign({}, inputs.additionInfo);
        ret.token = await jwt.generate(ret, inputs.lifeTimeInMinutes); //0 = life time
        if (inputs.email) {
          let mailTitle = ` Thông báo token truy cập hệ thống!`;
          let mailContent = `Token của bạn là: <b>${ret.token}</b><br></br>Hạn sử dụng: <b>${inputs.lifeTimeInMinutes ? moment().add(inputs.lifeTimeInMinutes, 'minutes').format('HH:mm - DD/MM/YYYY') : 'Không giới hạn'}</b>`;
          try {
            await pushNotification.sendMail(inputs.email, mailTitle, mailContent, req);
          } catch (error) {
            log.error(error)
          }
        }
        User.removeUneccessaryValue(ret.user);
        Auth.removeUneccessaryValue(ret.auth);
        UserType.removeUneccessaryValue(ret.user.userType);
        return res.ok({
          loginInfo: ret,
          message: ret.token
        });
      } else {
        return res.forbidden({
          message: ret.message
        });
      }
    } catch (e) {
      return res.serverError(e);
    }

  }


};