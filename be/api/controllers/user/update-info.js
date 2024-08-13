
module.exports = {


    friendlyName: 'Update info',
  
  
    description: '',
  
  
    inputs: {
      id: {
        type: 'string',
        required: true,
        description: 'Id người dùng cần cập nhật'
      },
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
        isIn: ['male', 'female', 'other']
      },
      description: {
        type: 'string',
      },
      roleId: {
        type: 'json',
        custom: function (value) {
          return Array.isArray(value);
        }
      },
      locked: {
        type: 'boolean'
      }
  
    },
  
  
    exits: {
  
    },
  
  
    fn: async function (inputs, exits) {
      let req = this.req;
      let res = this.res;
      let sessionUser = req.user;
      try {

        if (inputs.phone && !constant.PHONE_REGEX.test(inputs.phone)) {
          return res.badRequest({
            message: sails.__('Invalid phone number!')
          });
        }

        let input = {
          sessionUser: sessionUser,
          id: inputs.id,
          userType: inputs.userType,
          roleId: inputs.roleId,
        };
        let check = await userService.checkPermissionOnUpdateUser(
          sessionUser,
          inputs.id,
          inputs.userType,
          inputs.roleId
        );
        if (!check) {
          return res.forbidden({
            message: sails.__('Insufficient permissions to perform this action!')
          })
        }
        for (const key in inputs) {
          if (inputs.hasOwnProperty(key)) {
            const element = inputs[key];
            if (element === null || element === undefined) {
              delete inputs[key];
            }
          }
        }
        let updatedUser = await User.updateOne({
          id: inputs.id
        }).set(inputs);
        return res.ok(updatedUser);
      } catch (error) {
        return res.serverError(error)
      }
  
    }
  
  
  };