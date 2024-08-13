module.exports = {


  friendlyName: 'Count',


  description: 'Count notice that new',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs,exits)  {
    let req = this.req;
    let res = this.res;
    let where = {
      user: req.user.id,
      isDelete: false,
      or: [
        { expiredAt: 0 },
        { expiredAt: { ">=": moment().valueOf() } }
      ],
      seen: false,
      read: false
    };
    try {
      let count = await Notice.count(where);
      return res.ok({ count });
    } catch (error) {
      return res.serverError(error);
    }
  }


};
