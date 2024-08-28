/**
 * LogAuthen.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
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
    authId: {
      type: 'string'
    },
    ip: {
      type: 'string'
    },
    authenType: {
      type: 'string'
    },
  },

  beforeCreate: function (createData, cb) {
    // if (!createData.id) {
    //   createData.id = uuidv1();
    // }
    return cb();
  },
};