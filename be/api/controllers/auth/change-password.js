module.exports = {


    friendlyName: 'Change password',
  
  
    description: '',
  
  
    inputs: {
      account: {
        type: 'string',
        required: true
      },
      type: {
        type: 'string',
        required: true,
      },
      oldPassword: {
        type: 'string',
        required: true,
        // regex: /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{6,}$/
      },
      newPassword: {
        type: 'string',
        required: true,
        // regex: /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{6,}$/
      }
    },
  
  
    exits: {
  
    },
  
  
    fn: async function (inputs,exits)  {
  
      let {
        account,
        type,
        oldPassword,
        newPassword
      } = inputs;
      let res = this.res;
      let req = this.req;

      let ret = await Auth.changePassword(account, oldPassword, newPassword, type);
      if (ret.status) {
        return res.ok({
          message: ret.message
        })
      } else {
        return res.badRequest({
          message: ret.message
        })
      }
    }
  
  
  };
  