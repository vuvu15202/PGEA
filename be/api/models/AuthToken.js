/**
 * Capt.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
module.exports = {
  attributes: {
    user: {
      model: "user",
    },
    token: {
      type: "string",
      unique: true,
      required: true,
    },
   
  },
};