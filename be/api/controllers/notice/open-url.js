module.exports = {


  friendlyName: 'Open url',


  description: '',


  inputs: {
    noticeId: { type: "number", required: true, min: 1 }
  },


  exits: {
   
  },


  fn: async function (inputs, exits) {
    let { req, res } = this;
    try {
      let notice = await Notice.findOne({ id: inputs.noticeId, user: req.user.id });
      if (!notice) {
        return res.notFound({ message: 'Không tìm thấy thông báo!' });
      }
      return res.ok({
        open_url: notice.openUrl,
        target: "_blank",
        message: "Opening..."
      });
    } catch (error) {
      return res.serverError(error);
    }




  }


};
