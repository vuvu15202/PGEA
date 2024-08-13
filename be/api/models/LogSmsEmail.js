/**
 * LogSmsEmail.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
const uuidv1 = require('uuid/v1');

module.exports = {
  attributes: {
    id: {
      type: 'string',
      required: true,
      columnName: 'id',
      //--------------------------------------------------------------------------
      //  /\   Using MongoDB?
      //  ||   Replace `id` above with this instead:
      //
      // ```
      // id: { type: 'string', columnName: '_id' },
      // ```
    },
    to: {
      type: 'string',
    },
    content: {
      type: 'string',
      columnType: 'longtext'
    },
    type: {
      type: 'string',
      isIn: ['EMAIL']
    },
    isSuccess: {
      type: 'boolean'
    },
    quantity: {
      type: 'number',
      min: 1,
      defaultsTo: 1
    },
    subject: {
      type: 'string', columnType: 'text'
    },
    responseInfo: {
      type: 'json'
    },
    payload: {
      type: 'json',
      defaultsTo: {}
    }
  },
  
  beforeCreate: function (createData, cb) {
    if (!createData.id) {
      createData.id = uuidv1();
    }
    return cb();
  },

};