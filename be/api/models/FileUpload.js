/**
 * FileUpload.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

const path = require('path');
const moment = require('moment');
const fs = require('fs');

const getFileExtension = function (fileName) {
  var a = fileName.split(".");
  if (a.length === 1 || (a[0] === "" && a.length === 2)) {
    return "";
  }
  return a.pop().toLowerCase();
};

const allowExtension = ['png', 'jpg', 'jpeg']

module.exports = {

  attributes: {
    fileName: {
      type: 'string',
      columnType: 'text'
    },
    serverFileDir: {
      type: 'string',
    },
    serverFileName: {
      type: 'string',
    },
    fileType: {
      type: 'string',
    },
    size: {
      type: 'number',
    },
    status: {
      type: 'string'
    },
    field: {
      type: 'string'
    }
  },
  dir: {
    images: path.join(__dirname, '../../upload/public/uploaded/images'),
    other: path.join(__dirname, '../../upload/private/other'),
    upload: path.join(__dirname, '../../upload'),
  },
  getFilePath: function (fileUpload) {
    let filePath = path.join(FileUpload.dir[fileUpload.serverFileDir], fileUpload.serverFileName);
    return filePath;
  },
  getFileExtension: getFileExtension,
  isImage: function (fileUpload) {
    if (fileUpload && fileUpload.fileType) {
      return fileUpload.fileType.toLowerCase().includes('image');
    } else {
      return false;
    }
  },
  formatStreamingForm: function (fileUploadInputs) {
    let tmp = Array.isArray(fileUploadInputs._files) ? _.cloneDeep(fileUploadInputs._files) : [_.cloneDeep(fileUploadInputs._files)];

    let listFileUploadInfo = tmp.map(v => {
      let stream = v.stream;
      return {
        fileName: stream.filename,
        headers: stream.headers
      }
    });
 
    return listFileUploadInfo;
  },
  isAllowFile: function (fileUploadInfo, checkImage = true) {
    let tmp = Array.isArray(fileUploadInfo) ? fileUploadInfo : [fileUploadInfo];
    for (let i = 0; i < tmp.length; i++) {
      const e = tmp[i];

      if (checkImage) {
        if (!e.headers['content-type'].toLowerCase().includes('image')) {
          return false;
        }
      } else {
        let fileExtension = getFileExtension(e.fileName);
        if (!(Conf.getDataFromKey('ALLOW_FILE_EXTENSION') || 'xlsx').includes(fileExtension)) return false;
      }
    }
    return true;
  },
  getLinkImage: function (fileUpload) {
    if (!FileUpload.isImage(fileUpload)) {
      return {
        status: false,
        url: ''
      };
    }
    return {
      status: true,
      url: sails.config.globals.BASE_URL + '/uploaded/images/' + fileUpload.serverFileName
    };
  },
  deleteFile: async (fileUpload, req) => {
    if (!req || !fileUpload || !fileUpload.id || !req.user || !req.user.id) {
      return {
        status: false,
        message: sails.__('Không đủ điều kiện để xóa file')
      }
    }
    try {
      let filePath = FileUpload.getFilePath(fileUpload);
      fs.unlinkSync(filePath);
      await FileUpload.update({
        id: fileUpload.id
      }).set({
        isDelete: true,
        deletedBy: req.user.id,
        deletedAt: moment().valueOf()
      });
      return {
        status: true,
        message: sails.__('File deleted successfully!')
      }
    } catch (error) {
      throw error;
    }

  },
  moveFile: function moveFile(oldPath, newPath) {
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
  },

  customToJSON: function () {
    let link = FileUpload.getLinkImage(this);
    if (link.status && this.serverFileDir === 'images') {
      this.url = link.url;
    }
    return this;
  },

  bootstrap: async () => {
    return true;
  }
};