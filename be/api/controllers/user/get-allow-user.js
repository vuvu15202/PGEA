const _ = require("@sailshq/lodash");
const { friendlyName, description, inputs } = require("./get-allow-user-type");
const { exists } = require("grunt");
module.exports = {
  friendlyName: "get allow user ",

  description:
    "API cung cấp cho người dùng trang quản trị lấy danh sách những người dùng được phép vào sử dụng trang quản trị. Danh sách hiển thị sẽ phụ thuộc vào quyền mỗi người nắm giữ",

  inputs: {
    limit: {
      type: "number",
      min: 0,
    },
    skip: {
      type: "number",
      min: 0,
    },
    where: {
      type: "string",
    },
    sort: {
      type: "string",
    },
    select: {
      type: "string",
    },
  },

  exits: {},

  fn: async function (inputs, exits) {
    let req = this.req;
    let res = this.res;

    let user = req.user;
    let userLength = Object.keys(user).length;
    if (!userLength) {
      return res.forbidden({
        message: sails.__("403"),
      });
    }

    try {
      inputs.where = common.parseWhere(inputs.where);
      inputs.sort = common.parseSort(inputs.sort);
      inputs.select = common.parseSelect(inputs.select);
      let { userType } = user;
      if (!userType) {
        return res.notFound({
          message: sails.__("Dữ liệu người dùng không khả dụng!"),
        });
      }
      inputs.where.isDelete = false;
      if (!inputs.where.userType) {
        inputs.where.userType = userType.ruleViewUserType;
      } else {
        // console.log({ userType: inputs.where.userType })
        if (
          !Array.isArray(inputs.where.userType) &&
          !(inputs.where.userType + "").length
        ) {
          return res.badRequesr({
            message: sails.__("Dữ liệu lọc không hợp lệ!"),
          });
        }
        if (
          Array.isArray(inputs.where.userType) &&
          _.intersection(inputs.where.userType, userType.ruleViewUserType)
            .length !== inputs.where.userType.length
        ) {
          return res.forbidden({
            message: sails.__("Invalid access permission!"),
          });
        }
        if (
          typeof inputs.where.userType === "string" &&
          (inputs.where.userType + "").length &&
          !userType.ruleViewUserType.includes(inputs.where.userType)
        ) {
          return res.forbidden({
            message: sails.__("Invalid access permission!"),
          });
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
        sort: inputs.sort,
      });

      let count = await User.count(inputs.where);
      for (let i = 0; i < data.length; i++) {
        data[i].title = data[i].title || (await UserType.getTitle(data[i]));
      }
      return res.ok({
        data,
        count: count,
      });
    } catch (error) {
      return res.serverError(error);
    }
  },
};
