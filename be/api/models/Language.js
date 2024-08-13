/**
 * Language.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    name: { type: "string" },
    flag: { type: "string" },
    code: { type: "string" },
  },
  enableCache: true,
  customToJSON: function () {
    //defind modelName for trigger in model.js auto refresh cache after create or after update.
    //Remind that: for auto update caching, just only using updateOne and create with fetch
    //Using blueprint is auto refresh cache
    this.modelName = "language";
    return this;
  },
  fetchRecordsOnUpdate: true,
  fetchRecordsOnCreate: true,
};
  
  