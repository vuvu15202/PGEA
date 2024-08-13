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
      required: true,
    },
    type: {
      type: "string",
      maxLength: 10,
      required: true,
    },
    token: {
      type: "string",
      unique: true,
      required: true
    },
    expiredAt: {
      type: "number",
    },
    isUse: {
      type: "boolean",
      defaultsTo: false,
    },
  },

  // get: async (inputs) => {
  //   let current = moment().valueOf();
  //   let authPermission = await AuthPermisstion.findOne({
  //     token: inputs.token, key: inputs.account.toLowerCase(),
  //     isDelete: false, expiredAt: { '>': current }, isUse: false
  //   })
  //   return authPermission;
  // },

  // create: (inputs) => {
  //    try {
  //      let auth = AuthPermission.create(inputs);
  //      return exits.success({
  //        message: sails.__("200"),
  //        auth
  //      });
  //    } catch (err) {
  //      return this.res.serverError(err);
  //    }
  // },

  // delete: async (inputs) => {
  //   try {
  //      let auth = AuthPermission.destroy({
  //        auth: auth.id,
  //        key: auth.key,
  //      });
  //      return exits.success({
  //        message: sails.__(200"),
  //        auth
  //      });
  //    } catch (err) {
  //      return this.res.serverError(err);
  //    }

  // }

};