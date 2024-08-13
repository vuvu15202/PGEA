/**
 * Page.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
const fs = require('fs');
const _ = require('lodash');
module.exports = {
  fetchRecordsOnUpdate: true,
  fetchRecordsOnCreate: true,
  // dontUseObjectIds: true,
  // datastore: 'mysql',
  attributes: {
    id: {
      type: "number",
      columnType: "bigint",
      autoIncrement: true,
    },
    name: {
      type: "string",
      required: true,
      maxLength: 255,
      columnType: "text",
    },
    desc: {
      type: "string",
      maxLength: 255,
      columnType: "text",
    },
    schema: {
      type: "json",
    },
    buttons: {
      type: "json",
    },
    additionalGrid: {
      type: "json",
    },
    read: {
      type: "string",
      maxLength: 255,
    },
    roles: {
      type: "json",
      defaultsTo: [],
    },
    apis: {
      type: "json",
    },
    grid: {
      type: "json",
    },
    languages: {
      type: "json",
    },
  },
  getPage: async (id) => {
    if (sails.config.mode === "staging") {
      return await Page.findOne({
        id,
      });
    } else {
      let pageData = Page.getCache();
      for (var i = 0; i < pageData.length; i++) {
        if (pageData[i].id == id) return pageData[i];
      }
      return null;
    }
  },
  enableCache: true,
  customToJSON: function () {
    //defind modelName for trigger in model.js auto refresh cache after create or after update.
    //Remind that: for auto update caching, just only using updateOne and create with fetch
    //Using blueprint is auto refresh cache
    this.modelName = "page";
    return this;
  },
  bootstrap: async () => {
    return true;
  },
};