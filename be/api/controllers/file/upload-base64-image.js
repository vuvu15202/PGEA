const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
function getFilesizeInBytes(filename) {
  var stats = fs.statSync(filename)
  var fileSizeInBytes = stats["size"]
  return fileSizeInBytes
}

module.exports = {
  friendlyName: 'Upload image',

  description: '',

  inputs: {
    base64Image: {
      type: 'string',
      required: true
    },
    width: {
      type: 'number',
      min: 0
    },
    height: {
      type: 'number',
      min: 0
    }
  },


  exits: {

  },


  fn: async function (inputs, exits) {
    let origin = this.req.headers.origin;
    let req = this.req;
    let res = this.res;

    // if (process.env.NODE_ENV === 'production' && origin !== Conf.getDataFromKey('BASE_ADMIN_PAGE_URL')) {
    //   clearTimeout(inputs.images.timeouts.untilMaxBufferTimer)
    //   clearTimeout(inputs.images.timeouts.untilFirstFileTimer)

    //   return res.forbidden({
    //     message: sails.__('DOMAIN NOT ALLOW!')
    //   });
    // }

    try {
      if (!inputs.base64Image.toLowerCase().startsWith('data:image/')) {
        return res.badRequest({
          message: sails.__('File không phải định dạng hình ảnh cho phép!')
        });
      }

      let tmp = {
        fileName: 'dummy.jpg',
        serverFileName: uuidv1() + ".jpg",
        serverFileDir: 'images',
        size: 0,
        fileType: 'image/jpeg',
        status: 'finished',
        field: 'base64Image'
      }
      if (this.req.user && this.req.user.id) {
        tmp.createdBy = this.req.user.id;
      }
      let buf = new Buffer(inputs.base64Image.replace(/^data:image\/\w+;base64,/, ""), 'base64')
      let w = inputs.width;
      let h = inputs.height;
      if (w && h) {
        await sharp(buf)
          .resize(w, h, {
            withoutEnlargement: false,
            kernel: sharp.kernel.lanczos2,
            // interpolator: sharp.interpolator.nohalo
          })
          .jpeg()
          .toFile(path.join(FileUpload.dir[tmp.serverFileDir], tmp.serverFileName));
      } else {
        await sharp(buf)
          .jpeg()
          .toFile(path.join(FileUpload.dir[tmp.serverFileDir], tmp.serverFileName));
      }
      tmp.size = getFilesizeInBytes(path.join(FileUpload.dir[tmp.serverFileDir], tmp.serverFileName))
      let created = await FileUpload.create(tmp).fetch();

      return res.ok(created);
    } catch (error) {
      return this.res.serverError({
        message: sails.__('500'),
        error: String(error)
      });
    }

  }
};