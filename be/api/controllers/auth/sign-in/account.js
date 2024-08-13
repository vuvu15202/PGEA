
module.exports = {
    friendlyName: 'Local',
  
    description: 'login with account and password',
  
    inputs: {
      account: {
        type: 'string',
        required: true
      },
      password: {
        type: 'string',
        required: true
      }
    },
  
    exits: {},
  
    fn: async function (inputs, exits) {
      let req = this.req;
      let res = this.res;
  
      try {
        let ret = await Auth.login(inputs.account, inputs.password, 'up');
  
        if (ret.status) {
          let {
            auth,
            user
          } = ret.obj;
  
          req.auth = auth;
          req.user = user;
          ret = Object.assign({}, ret.obj);
          let timeToLifeToken = Conf.getDataFromKey("TTL_TOKEN");
          //fix remove until hash jwt
          User.removeUneccessaryValue(ret.user);
          Auth.removeUneccessaryValue(ret.auth);
          UserType.removeUneccessaryValue(ret.user.userType);
          ret.token = await jwt.generate(ret, timeToLifeToken || 0);
          return exits.success(ret);
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