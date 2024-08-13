const _ = require('@sailshq/lodash');
module.exports = {


  friendlyName: 'Get allow user type',
//lấy danh sách usertype A mà người gọi api mang usertype có quyền chỉnh sửa usertype A

  description: '',


  inputs: {
    limit: {
      type: 'number',
      min: 0
    },
    skip: {
      type: 'number',
      min: 0
    },
    where: {
      type: 'string'
    },
    sort: {
      type: 'string'
    },
    select: {
      type: 'string'
    }
  },


  exits: {

  },


  fn: async function (inputs, exits) {
    let req = this.req;
    let res = this.res;
    let user = req.user;
    let userLength = Object.keys(user).length;
    if (!userLength) {
      return res.forbidden({
        message: sails.__('403')
      });
    }

    try {
      inputs.where = common.parseWhere(inputs.where);
      inputs.sort = common.parseSort(inputs.sort);
      inputs.select = common.parseSelect(inputs.select);

      let {
        userType
      } = user;
      if (!userType) {
        return res.notFound({
          message: sails.__('Dữ liệu người dùng không khả dụng!'),
        });
      }
      inputs.where.isDelete = false;
      if (!inputs.where.id) {
        inputs.where.id = userType.ruleViewUserType;
      } else {

        if (!Array.isArray(inputs.where.id) && !(inputs.where.id + "").length) {
          return res.badRequesr({
            message: sails.__('Dữ liệu lọc không hợp lệ!')
          })
        }
        if (Array.isArray(inputs.where.id) && _.intersection(inputs.where.id, userType.ruleViewUserType).length !== inputs.where.id.length) {
          return res.forbidden({
            message: sails.__('Invalid access permission!')
          })
        }
        if (typeof (inputs.where.id) === 'string' && (inputs.where.id + "").length && !userType.ruleViewUserType.includes(inputs.where.id)) {
          return res.forbidden({
            message: sails.__('Invalid access permission!')
          })
        }

      }

      let data = await UserType.find({
        where: inputs.where,
        select: inputs.select,
        limit: inputs.limit || 100,
        skip: inputs.skip || 0,
        sort: inputs.sort
      });
      let count = await UserType.count(inputs.where);

      return res. ok({
        data,
        count: count
      });

    } catch (error) {
      return res.serverError(error);
    }

  }


};