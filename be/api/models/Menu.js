/**
 * Menu.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
let menuData = [];
module.exports = {
  fetchRecordsOnCreate: true,
  fetchRecordsOnUpdate: true,

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
      columnType: "text",
      required: true,
      maxLength: 255,
    },
    url: {
      type: "string",
      columnType: "text",
      maxLength: 255,
    },
    icon: {
      type: "string",
      maxLength: 255,
    },
    roles: {
      type: "json",
      defaultsTo: [],
    },
    parent: {
      type: "number",
    },
    isParent: {
      type: "boolean",
      defaultsTo: false,
    },
    orderNumber: {
      type: "number",
      defaultsTo: 0,
    },
  },

  enableCache: true,

  customToJSON: function () {
    this.modelName = "menu";
    return this;
  },
  bootstrap: async () => {
    return true;
  },
  rewriteCacheData: function (dataCache) {
    //Mặc định cache data dạng array lấy trực tiếp từ db ra đẩy lên redis.
    return dataCache.sort((a, b) => a.orderNumber - b.orderNumber);
  },
};