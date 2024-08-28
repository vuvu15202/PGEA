module.exports = {


  friendlyName: 'Get roles allow',


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


  fn: async function (inputs,exits)  {

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

      inputs.where = Object.assign({
        isDelete: false,
        id: {
          '!=': userType.ruleIgnoreRole
        }
      }, inputs.where);
      let data = await Role.find({
        where: inputs.where,
        select: inputs.select,
        limit: inputs.limit || 100,
        skip: inputs.skip || 0,
        sort: inputs.sort
      });
      let count = await Role.count(inputs.where);

      return res.ok({
        data,
        count: count
      });

    } catch (error) {
      return res.serverError(error);
    }
  }


};
