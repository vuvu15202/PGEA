const fs = require('fs');
const moment = require('moment');

module.exports = {


  friendlyName: 'Delete file',


  description: '',


  inputs: {
    id: {
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
    
    // if (process.env.NODE_ENV === 'production' && origin !== Conf.getDataFromKey('BASE_ADMIN_PAGE_URL') && origin !== Conf.getDataFromKey('BASE_USER_PAGE_URL')) {
    //   return res.forbidden({
    //     message: sails.__('DOMAIN NOT ALLOW!')
    //   });
    // }

    try {
      let file = await FileUpload.findOne({
        id: inputs.id,
        isDelete: false
      });
      if (!file) {
        return res.notFound({
          message: sails.__('Không tìm  thấy file!')
        })
      }
      let ret = await FileUpload.deleteFile(file, req);
      if (ret.status) {
        return res.ok({
          message: ret.message
        });
      } else {
        return res.badRequest({
          message: ret.message
        });
      }
    } catch (error) {
      return res.serverError(error)
    }

  }


};
