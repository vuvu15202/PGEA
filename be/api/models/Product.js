/**
 * Conf.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
module.exports = {
  attributes: {
    productName: {
      type: "string",
      required: true,
    },
    price: {
      type: "number",
    },
    company: {
      type: "string",
    },
    quantityInOrder: {
      type: "number",
    },
    quantityOnStore: {
      type: "number",
    },
  },
};
