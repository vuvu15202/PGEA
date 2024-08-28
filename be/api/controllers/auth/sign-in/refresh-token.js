const moment = require('moment');
module.exports = {


  friendlyName: 'Refresh token',


  description: '',


  inputs: {},


  exits: {},


  fn: async function (inputs, exits) {
    let req = this.req;
    let res = this.res;

    try {
      let ret = await Auth.login(null, null, null, req.auth.id);
      if (ret.status) {
        ret = Object.assign({}, ret.obj);
        User.removeUneccessaryValue(ret.user);
        Auth.removeUneccessaryValue(ret.auth);
        UserType.removeUneccessaryValue(ret.user.userType);
        ret.token = await jwt.generate(ret, Conf.getDataFromKey("TTL_TOKEN") || 0); //0 = life time
       
        return res.ok(ret);
      } else {
        return res.unauthorized({
          message: ret.message
        });
      }
    } catch (error) {
      return res.serverError(error);
    }


  }

};