const path = require('path');
const fs = require('fs');

function moveFile(oldPath, newPath) {
  return new Promise((resolve, reject) => {
    fs.rename(oldPath, newPath, (err) => {
      if (err) {
        // console.log('reject');
        return reject(err);
      }
      // console.log('resolve');

      return resolve();
    });
  });
}

module.exports = {


  friendlyName: 'Upload image',

  files: ['files'],

  description: '',


  inputs: {
    files: {
      type: 'ref',
      required: true
    }
  },

  exits: {

  },


  fn: async function (inputs, exits) {
    let req = this.req;
    let res = this.res;
    let user = req.user || {};
    // let origin = req.headers.origin;
    // if (process.env.NODE_ENV === 'production' && origin !== Conf.getDataFromKey('BASE_ADMIN_PAGE_URL')) {
    //   clearTimeout(inputs.files.timeouts.untilMaxBufferTimer)
    //   clearTimeout(inputs.files.timeouts.untilFirstFileTimer)
    //   return res.forbidden({
    //     message: sails.__('DOMAIN NOT ALLOW!')
    //   });
    // }

    try {
      let listFileUploadInfo = FileUpload.formatStreamingForm(inputs.files);

      if (!FileUpload.isAllowFile(listFileUploadInfo, false)) {
        clearTimeout(inputs.files.timeouts.untilMaxBufferTimer)
        clearTimeout(inputs.files.timeouts.untilFirstFileTimer)
        return res.forbidden({
          message: sails.__('File extension not allow')
        });
      }

      let info = await sails.upload(inputs.files);
      if (info.length === 0) {
        return res.badRequest({
          message: sails.__('File not found!'),
        });
      }

      let fileUploadTmp = {
        fileName: '',
        serverFileDir: '',
        serverFileName: '',
        fileType: '',
        size: '',
        status: '',
        field: '',
        createdBy: user.id
      };
      let filesCreate = [];
      let filesNotCreate = [];

      for (let i = 0; i < info.length; i++) {
        const v = info[i];
        let tmp = Object.assign({}, fileUploadTmp);
        tmp.fileName = v.filename;
        tmp.serverFileName = path.basename(v.fd);
        tmp.serverFileDir = 'other';
        tmp.size = v.size;
        tmp.fileType = v.type;
        tmp.status = v.status;
        tmp.field = v.field;
        try {
          await moveFile(v.fd, FileUpload.getFilePath(tmp));
          filesCreate.push(tmp);
        } catch (error) {
          try {
            fs.unlinkSync(v.fd);
          } catch (error) {

          }
          filesNotCreate.push({
            filename: v.filename,
            error: String(error)
          });
        }
      }
      let created = await FileUpload.createEach(filesCreate).fetch();

      return res.ok({
        created,
        notCreate: filesNotCreate
      });
    } catch (error) {
      return res.serverError(error)
    }


  }


};