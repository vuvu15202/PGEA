module.exports = {


  friendlyName: 'Download file',


  description: '',


  inputs: {
    fileId: {
      type: 'string',
      required: true
    }
  },


  exits: {

  },


  fn: async function (inputs, exits) {
    let req = this.req;
    let res = this.res;
    // let origin = req.headers.origin;
    // console.log({headers:req.headers,origin,conf:Conf.getDataFromKey('BASE_ADMIN_PAGE_URL') });
    // if (process.env.NODE_ENV === 'production' && origin !== Conf.getDataFromKey('BASE_ADMIN_PAGE_URL') && origin !== Conf.getDataFromKey('BASE_USER_PAGE_URL')) {
    //   return res.forbidden({
    //     message: sails.__('DOMAIN NOT ALLOW!')
    //   });
    // }
    var file = await FileUpload.findOne({
      id: inputs.fileId
    });
    if (!file) {
      return this.res.notFound({
        message: sails.__('File không tồn tại!')
      });
    }

    this.res.attachment(file.fileName);
    var downloading = await sails.startDownload(FileUpload.getFilePath(file));
    return res.ok(downloading);
  }


};
