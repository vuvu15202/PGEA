module.exports = {


  friendlyName: 'Seen',


  description: 'Seen notice.Set trạng thái của một thông báo là đã đọc',


  inputs: {
    where: {
      type: 'string',
      required: true
    },
  },


  exits: {

  },


  fn: async function (inputs,exits)  {
    try {
      let req = this.req;
      let res = this.res;
      inputs.where = common.parseWhere(inputs.where);
      inputs.where.user = req.user.id;
      let data = await Notice.update(inputs.where).set({ read: true }).fetch();;
      return res.ok({ data, message: sails.__('200') })
    } catch (error) {
      return res.serverError(error)
    }

  }


};
