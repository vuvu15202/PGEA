const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const replaceExt = require('replace-ext');


module.exports = {
  friendlyName: 'Upload image',
  files: ['images'],
  description: '',

  inputs: {
    images: {
      type: 'ref',
      required: true
    },
    width: {
      type: 'number',
      min: 0
    },
    height: {
      type: 'number',
      min: 0
    },
    isToJPG: {
      type: 'boolean',
      defaultsTo: false
    }
  },


  exits: {

  },


  fn: async function (inputs, exits) {
    // let origin = this.req.headers.origin;
    let req = this.req;
    let res = this.res;

    // if (process.env.NODE_ENV === 'production' && origin !== Conf.getDataFromKey('BASE_ADMIN_PAGE_URL') ) {
    //   clearTimeout(inputs.images.timeouts.untilMaxBufferTimer)
    //   clearTimeout(inputs.images.timeouts.untilFirstFileTimer)

    //   return res.forbidden({
    //     message: sails.__('DOMAIN NOT ALLOW!')
    //   });
    // }
    let listFileUploadInfo = FileUpload.formatStreamingForm(_.cloneDeep(inputs.images));
    if (!FileUpload.isAllowFile(listFileUploadInfo, true)) {
      clearTimeout(inputs.images.timeouts.untilMaxBufferTimer)
      clearTimeout(inputs.images.timeouts.untilFirstFileTimer)
      return res.forbidden({
        message: sails.__('File không phải định dạng hình ảnh cho phép!')
      });
    }
    try {
      let w = inputs.width;
      let h = inputs.height;
      let info = await sails.upload(inputs.images);
      if (info.length === 0) {
        return res.badRequest({
          message: sails.__('No files uploaded!'),
        });
      }


      let filesCreate = [];
      let filesNotCreate = [];

      for (let i = 0; i < info.length; i++) {
        const v = info[i];
        let tmp = {
          fileName: v.filename,
          serverFileName: path.basename(v.fd),
          serverFileDir: 'images',
          size: v.size,
          fileType: v.type,
          status: v.status,
          field: v.field
        }
        if (this.req.user && this.req.user.id) {
          tmp.createdBy = this.req.user.id;
        }
        if (FileUpload.isImage(tmp)) {
          // let tempPromise = sharp(v.fd).resize({ withoutEnlargement: true });
          if ((w && h) || inputs.isToJPG) {
            Object.assign(tmp, {
              serverFileName: replaceExt(tmp.serverFileName, '.jpg'),
              fileName: replaceExt(tmp.fileName, '.jpg'),
              fileType: 'image/jpeg'
            });
            if ((w && h)) {
              await sharp(v.fd)
                .resize(w, h, {
                  withoutEnlargement: false,
                  kernel: sharp.kernel.lanczos2,
                  // interpolator: sharp.interpolator.nohalo
                })
                .jpeg()
                .toFile(path.join(FileUpload.dir[tmp.serverFileDir], tmp.serverFileName));
            } else {
              await sharp(v.fd).jpeg()
                .toFile(path.join(FileUpload.dir[tmp.serverFileDir], tmp.serverFileName));
            }
          } else {
            await FileUpload.moveFile(v.fd, FileUpload.getFilePath(tmp));
          }
          filesCreate.push(tmp);
        } else {
          let notCreate = {
            fileName: tmp.fileName,
            error: 'File không phải định dạng hình ảnh'
          };
          filesNotCreate.push(notCreate);
        }
        try {
          fs.unlinkSync(v.fd);
        } catch (error) {

        }
      }
      let created = await FileUpload.createEach(filesCreate).fetch();

      return res.ok({
        created,
        notCreate: filesNotCreate
      });
    } catch (error) {
      return this.res.serverError({
        message: sails.__('500'),
        error: String(error)
      });
    }

  }
};