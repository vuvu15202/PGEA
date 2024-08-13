module.exports = {

    friendlyName: 'Add new',
  
  
    description: '',
  
  
    inputs: {
      name: {
        type: 'string'
      },
      phone: {
        type: 'string',
        custom: function (value) {
          //validate phone here
          return true;
        },
      },
      userType: {
        type: 'number',
        description: 'Sử dụng cho việc phân role người dùng'
      },
      email: {
        type: 'string',
        isEmail: true,
      },
      gender: {
        type: 'string',
        isIn: ['male', 'female', 'other'],
        defaultsTo: 'other'
      },
      description: {
        type: 'string',
      },
      roleId: {
        type: 'json',
        custom: function (value) {
          return Array.isArray(value);
        },
        defaultsTo: []
      },
      account: {
        type: 'string',
        required: true
      },
      password: {
        type: 'string',
        required: true
      },
      partner: {
        type: 'string'
      }
    },
  
  
    exits: {
  
    },
  
  
    fn: async function (inputs, exits) {
      let req = this.req;
      let res = this.res;
      let sessionUser = req.user;
      let sessionUserType = sessionUser.userType;
      if (typeof sessionUserType === 'string') {
        sessionUserType = await UserType.findOne({
          id: sessionUserType
        });
      }
      try {
        inputs.userType = inputs.userType || sessionUserType.defaultGrantUserType;
        if (!inputs.userType) return res.badRequest({
          message: sails.__('Account is missing permission information granted!')
        });
        let check = await userService.checkPermissionOnCreateUser(
          sessionUser,
          inputs.userType,
          inputs.roleId
        );
        if (!check) {
          return res.forbidden({
            message: sails.__('Insufficient permissions to create new users as selected!')
          })
        }
        if (!constant.ACCOUNT_REGEX.test(inputs.account)) {
          return res.badRequest({
            message: sails.__('The account contains invalid characters or not enough 3 characters!')
          });
        }
  
        if (!constant.PASSWORD_REGEX.test(inputs.password)) {
          return res.badRequest({
            message: sails.__('Password must include both alphanumeric and at least 6 characters in length!')
          });
        }

        if (inputs.phone && !constant.PHONE_REGEX.test(inputs.phone)) {
          return res.badRequest({
            message: sails.__('Invalid phone number!')
          });
        }
        
        inputs.createdBy = sessionUser.id;
        // inputs.partner = inputs.partner || sessionUser.partner;
        let tmp = Object.assign({}, inputs);
        let exitsAccount = await Auth.findOne({
          key: (inputs.account + '').toLowerCase(),
          type: 'up',
          isDelete: false
        });
        if (exitsAccount) {
          return res.forbidden({
            message: sails.__('The login name already exists, please use another username!')
          })
        }
  
        // await sails.getDatastore()
        //   .transaction(async (db) => {
        let user = await User.create(tmp).fetch() //.usingConnection(db);
        try {
          await Auth.create({
            key: inputs.account,
            password: inputs.password,
            type: 'up',
            user: user.id,
            createdBy: inputs.createdBy
          })
        } catch (error) {
          await User.destroy({
            id: user.id
          })
          throw error;
        }
        //.usingConnection(db);
        // })
  
        return res.ok({
          message: sails.__('Create new account successfully: ') + `Account: ${inputs.account}  --- Password: ${inputs.password}`,
        });
  
      } catch (error) {
        return res.serverError(error)
      }
  
  
    }
  
  
  };