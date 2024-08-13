/**
 * Conf.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
module.exports = {
  fetchRecordsOnCreate: true,
  fetchRecordsOnUpdate: true,
  enableCache: true,

  //fetch to trigger after create and after update setup in model.js
  TYPE: {
    NUMBER: 1,
    STRING: 2,
  },
  attributes: {
    key: {
      type: "string",
      required: true,
    },
    val: {
      type: "string",
      columnType: "text",
      required: true,
    },
    type: {
      type: "number",
      required: true,
      columnType: "int",
    },
    forFe: {
      type: "boolean",
      defaultsTo: false,
    },
    desc: {
      type: "string",
      columnType: "text",
    },
  },
  customToJSON: function () {
    this.modelName = "conf";
    return this;
  },

  getDataFromKey: (key) => {
    return Conf.getCache()[key];
  },

  getCacheFe: () => {
    return Conf.getDataFromKey("__feCache__");
  },

  bootstrap: async () => {
    return true;
  },

  // refreshCache: async () => {
  //   sails.helpers.cache.setCacheConf().then((v) => {}).catch((e) => {
  //     log.error(e)
  //   });
  // },

  afterRefreshCache: function (dataCache) {
    sails.config.globals.BASE_URL =
      this.getDataFromKey("BASE_URL") || sails.config.globals.BASE_URL;
  },

  rewriteCacheData: function (dataCache) {
    //Mặc định cache data dạng array lấy trực tiếp từ db ra đẩy lên redis.
    let conf = {};
    let feCache = {};
    dataCache.map((d) => {
      switch (d.type) {
        case 1:
          conf[d.key] = Number(d.val);
          break;
        default:
          conf[d.key] = d.val;
          break;
      }
      if (d.forFe) {
        feCache[d.key] = conf[d.key];
      }
    });
    conf.__feCache__ = Object.assign({}, feCache);

    return conf;
  },
};