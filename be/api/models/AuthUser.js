/**
 * Capt.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
module.exports = {

  attributes: {
    auth: {
      model: "auth",
    },
    key: {
      type: "string",
    },
    token: {
      type: "string",
      unique: true,
      required: true
    },
    expiredAt: {
      type: "number",
    }
  },


};