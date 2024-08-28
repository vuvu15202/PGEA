const _ = require('@sailshq/lodash')
module.exports = {

  friendlyName: 'Get allow user',


  description: 'API cung cấp cho người dùng trang quản trị lấy danh sách những người dùng được phép vào sử dụng trang quản trị. Danh sách được hiển thị sẽ phụ thuộc vào quyền mỗi người nắm giữ',
//lấy danh sách user có roleId nằm trong danh sách role mà người gọi API có thể sửa, optional: lấy bản ghi do chính mình tạo ra hoăc là ko

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
      if (!inputs.where.userType) {
        inputs.where.userType = userType.ruleViewUserType;
      } else {
        if (!Array.isArray(inputs.where.userType) && !(inputs.where.userType + "").length) {
          return res.badRequesr({
            message: sails.__('Dữ liệu lọc không hợp lệ!')
          })
        }
        if (Array.isArray(inputs.where.userType) && _.intersection(inputs.where.userType, userType.ruleViewUserType).length !== inputs.where.userType.length) {
          return res.forbidden({
            message: sails.__('Invalid access permission!')
          })
        }
        if (typeof inputs.where.userType === 'string' && (inputs.where.userType + "").length && !userType.ruleViewUserType.includes(inputs.where.userType)) {
          return res.forbidden({
            message: sails.__('Invalid access permission!')
          })
        }

      }
      if (userType.ruleOnlyViewCreatedBy) {
        inputs.where.createdBy = user.id;
      }
      let data = await User.find({
        where: inputs.where,
        select: inputs.select,
        limit: inputs.limit || 100,
        skip: inputs.skip || 0,
        sort: inputs.sort
      });

      let count = await User.count(inputs.where);
      return res.ok({
        data,
        count: count
      });

    } catch (error) {
      return res.serverError(error);
    }

  }


};