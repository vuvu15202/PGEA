module.exports = {


  friendlyName: 'Get',


  description: 'Get notice.',


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
  },


  exits: {

  },


  fn: async function (inputs,exits)  {
    let req = this.req;
    let res = this.res;

    try {
      let sort = [{ createdAt: 'DESC' }]
      let where = {
        user: req.user.id,
        isDelete: false,
        or: [{ expiredAt: 0 }, { expiredAt: { ">=": moment().valueOf() } }]
      };
      where = Object.assign({}, common.parseWhere(inputs.where), where);
      let data = await Notice.find(where).sort(sort).limit(inputs.limit || 100).skip(inputs.skip || 0);
      let ids = data.filter(v => !v.seen).map(v => v.id);
      if (ids.length) {
        await Notice.update({ id: ids }).set({ seen: true })
      }
      let count = await Notice.count(where);
      return res.ok({ data, count });
    } catch (error) {
      return res.serverError(error);
    }
  }

};
