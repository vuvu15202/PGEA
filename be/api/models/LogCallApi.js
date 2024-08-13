/**
 * LogCallApi.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
const moment = require('moment');
const uuidv1 = require('uuid/v1');
module.exports = {
  // datastore: 'mongo',
  attributes: {
    // id: {
    //   type: 'string',
    //   // required: true,
    //   // columnName: 'id'
    //   columnName: '_id'

    //   //--------------------------------------------------------------------------
    //   //  /\   Using MongoDB?
    //   //  ||   Replace `id` above with this instead:
    //   //
    //   // ```
    //   // id: { type: 'string', columnName: '_id' },
    //   // ```
    // },
    requestUrl: {
      type: 'string',
      required: true
    },
    requestMethod: {
      type: 'string',
      required: true,
    },
    requestHeader: {
      type: 'json',
    },
    requestData: {
      type: 'json', columnType: 'text'
    },
    responseStatusCode: {
      type: 'number',
    },
    responseMessage: {
      type: 'string', columnType: 'text'
    },
    apiDescription: {
      type: 'string', columnType: 'text'
    },
    ip: {
      type: 'string'
    },
    takeTime: {
      type: 'number',
      defaultsTo: 0
    },
    userId: {
      type: 'string'
    },
    authId: {
      type: 'string'
    },
    apiVersion: {
      type: 'string'
    }
  },

  beforeCreate: function (createData, cb) {
    // if (!createData.id) {
    //   createData.id = uuidv1();
    // }
    return cb();
  },
  clearLog: async () => {
    let createdAtBefore = moment().startOf('day').add(-15, 'days').valueOf();
    await LogCallApi.destroy({
      createdAt: {
        '<': createdAtBefore
      }
    });
  }


};