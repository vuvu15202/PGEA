/**
 * Notice.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
const uuidv1 = require('uuid/v1');

module.exports = {

  attributes: {
    user: {
      model: 'user',
      description: 'Người dùng nhận thông báo'
    },
    subject: {
      type: 'string',
      columnType: 'text'
    },
    content: {
      type: 'string',
      columnType: 'text'
    },
    seen: {
      type: 'boolean',
      defaultsTo: false
    },
    level: {
      type: 'string'
    },
    openUrl: {
      type: 'string',
      columnType: 'text'
    },
    expiredAt: {
      type: 'number',
      defaultsTo: 0
    },
    read: {
      type: 'boolean',
      defaultsTo: false
    },
    payload: {
      type: 'json',
      defaultsTo: {},
      description: 'Trang thông tin redirect đến để xem chi tiết thông báo'
    }
  },

  beforeCreate: function (createData, cb) {
    return cb();
  },
  fetchRecordsOnCreate: true,
  afterCreate: async function (createdData, cb) {
    let nrp = nrpService.getNrp();
    nrp.emit(sails.config.datastores.redis.prefix + '_send_socket', createdData);
    if (createdData.level === 'DELETE_ON_SEND') {
      await Notice.destroy({
        id: createdData.id
      });
    }
    return cb();
  }

};