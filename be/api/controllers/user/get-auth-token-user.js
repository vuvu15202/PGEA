const _ = require("@sailshq/lodash");
module.exports = {
  friendlyName: "get auth token user",

  description: "Hiện danh sách token hiện tại của user",

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
      inputs.where.isDelete = false;
      if (!inputs.where.user) {
        inputs.where.user = user.id;
      }

      let data = await AuthToken.find({
        where: inputs.where,
        select: inputs.select,
        limit: inputs.limit || 100,
        skip: inputs.skip || 0,
        sort: inputs.sort,
      });
      return res.ok({
        data,
      });
    } catch (error) {
      return res.serverError(error);
    }
  },
};
