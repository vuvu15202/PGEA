/**
 * Default model settings
 * (sails.config.models)
 *
 * Your default, project-wide model settings. Can also be overridden on a
 * per-model basis by setting a top-level properties in the model definition.
 *
 * For details about all available model settings, see:
 * https://sailsjs.com/config/models
 *
 * For more general background on Sails model settings, and how to configure
 * them on a project-wide or per-model basis, see:
 * https://sailsjs.com/docs/concepts/models-and-orm/model-settings
 */
const moment = require('moment');
module.exports.models = {
  /***************************************************************************
   *                                                                          *
   * Whether the `.create()` and `.update()` model methods should ignore      *
   * (and refuse to persist) unrecognized data-- i.e. properties other than   *
   * those explicitly defined by attributes in the model definition.          *
   *                                                                          *
   * To ease future maintenance of your code base, it is usually a good idea  *
   * to set this to `true`.                                                   *
   *                                                                          *
   * > Note that `schema: false` is not supported by every database.          *
   * > For example, if you are using a SQL database, then relevant models     *
   * > are always effectively `schema: true`.  And if no `schema` setting is  *
   * > provided whatsoever, the behavior is left up to the database adapter.  *
   * >                                                                        *
   * > For more info, see:                                                    *
   * > https://sailsjs.com/docs/concepts/orm/model-settings#?schema           *
   *                                                                          *
   ***************************************************************************/

  schema: true,

  /***************************************************************************
   *                                                                          *
   * How and whether Sails will attempt to automatically rebuild the          *
   * tables/collections/etc. in your schema.                                  *
   *                                                                          *
   * > Note that, when running in a production environment, this will be      *
   * > automatically set to `migrate: 'safe'`, no matter what you configure   *
   * > here.  This is a failsafe to prevent Sails from accidentally running   *
   * > auto-migrations on your production database.                           *
   * >                                                                        *
   * > For more info, see:                                                    *
   * > https://sailsjs.com/docs/concepts/orm/model-settings#?migrate          *
   *                                                                          *
   ***************************************************************************/

  migrate: "safe",

  /***************************************************************************
   *                                                                          *
   * Base attributes that are included in all of your models by default.      *
   * By convention, this is your primary key attribute (`id`), as well as two *
   * other timestamp attributes for tracking when records were last created   *
   * or updated.                                                              *
   *                                                                          *
   * > For more info, see:                                                    *
   * > https://sailsjs.com/docs/concepts/orm/model-settings#?attributes       *
   *                                                                          *
   ***************************************************************************/

  attributes: {
    id: {
      type: "number",
      columnType: "bigint",
      autoIncrement: true,
    },
    isDelete: {
      type: "boolean",
      defaultsTo: false,
    },
    createdBy: {
      // model: 'user'
      type: "string",
      allowNull: true,
    },
    deletedBy: {
      // model: 'user'
      type: "string",
      allowNull: true,
    },
    createdAt: {
      type: "number",
      autoCreatedAt: true,
    },
    updatedAt: {
      type: "number",
      autoUpdatedAt: true,
    },
    deletedAt: {
      type: "number",
      columnType: "bigint",
    },
    //--------------------------------------------------------------------------
    //  /\   Using MongoDB?
    //  ||   Replace `id` above with this instead:
    //
    // ```
    // id: { type: 'string', columnName: '_id' },
    // ```
    //
    // Plus, don't forget to configure MongoDB as your default datastore:
    // https://sailsjs.com/docs/tutorials/using-mongo-db
    //--------------------------------------------------------------------------
  },

  /******************************************************************************
   *                                                                             *
   * The set of DEKs (data encryption keys) for at-rest encryption.              *
   * i.e. when encrypting/decrypting data for attributes with `encrypt: true`.   *
   *                                                                             *
   * > The `default` DEK is used for all new encryptions, but multiple DEKs      *
   * > can be configured to allow for key rotation.  In production, be sure to   *
   * > manage these keys like you would any other sensitive credential.          *
   *                                                                             *
   * > For more info, see:                                                       *
   * > https://sailsjs.com/docs/concepts/orm/model-settings#?dataEncryptionKeys  *
   *                                                                             *
   ******************************************************************************/
  beforeCreate: function (v, cb) {
    return cb();
  },
  beforeUpdate: function (v, cb) {
    if (v.isDelete) {
      v.deletedAt = moment().valueOf();
    }
    return cb();
  },

  afterUpdate: async function (v, cb) {
    let modelName = v.toJSON().modelName;
    if (modelName && sails.models[modelName].setCache) {
      try {
        await sails.models[modelName].setCache();
      } catch (error) {
        log.error(error);
      }
    }
    return cb();
  },

  afterDestroy: async function (v, cb) {
    let modelName = v.toJSON().modelName;
    if (modelName && sails.models[modelName].setCache) {
      try {
        await sails.models[modelName].setCache();
      } catch (error) {
        log.error(error);
      }
    }
    return cb();
  },
  
  afterCreate: async function (v, cb) {
    let modelName = v.toJSON().modelName;
    if (modelName && sails.models[modelName].setCache) {
      try {
        await sails.models[modelName].setCache();
      } catch (error) {
        log.error(error);
      }
    }
    return cb();
  },

  dataEncryptionKeys: {
    default: "tKGs9uJq6EQ4CNaAdsa7GSfC0fIdsaszvxc3HwqgNGcdfVumA=",
  },
  fetchRecordsOnCreate: false, //To enable cache the model. Set
  fetchRecordsOnUpdate: false, //fetchRecordsOnCreate,fetchRecordsOnUpdate, enableCache = true in the model need cache
  enableCache: false, // and define customToJSON in the model with this.modelName='{name of model in lowercase}' to trigger caching auto refresh
  customToJSON: function () {
    // this.modelName = 'menu';
    return this;
  },
  cacheData: [],
  refreshCache: async function () {
    if (!this.enableCache) return;
    let modelName = this.identity;
    try {
      if (!(await cache.get("cache_" + modelName)))
        throw new Error("Missing caching");
      this.cacheData = JSON.parse(
        await cache.get("cache_" + modelName)
      );
    } catch (error) {
      this.cacheData = await this.setCache();
    }
    if (this.__proto__.afterRefreshCache) {
      this.__proto__.afterRefreshCache(this.cacheData);
    }
    console.log("Done refresh cache " + modelName);
    return this.cacheData;
  },

  setCache: async function () {
    if (!this.enableCache) return;
    let modelName = this.identity;
    let model = sails.models[modelName];
    console.log("Set cache " + modelName);
    let dataCache = await model.find({
      isDelete: false,
    });
    if (this.__proto__.rewriteCacheData) {
      dataCache = this.__proto__.rewriteCacheData(dataCache);
    }
    cache.set("cache_" + modelName, JSON.stringify(dataCache));
    console.log("Done set cache " + modelName);
    let nrp = nrpService.getNrp();
    nrp.emit(sails.config.datastores.redis.prefix + "_refresh_cache", {
      modelName,
    });
    return dataCache;
  },

  getCache: function () {
    return this.cacheData;
  },

  addingOmitValue: [],
  removeUneccessaryValue: function (obj) {
    let omits = [
      "isDelete",
      "createdBy",
      "createdAt",
      "updatedAt",
      "deletedAt",
      "deletedBy",
    ];

    if (this.__proto__.addingOmitValue.length) {
      omits = omits.concatUnique(this.__proto__.addingOmitValue);
    }
    // obj = _.omit(obj, omits);
    for (let i = 0; i < omits.length; i++) {
      const element = omits[i];
      delete obj[element];
    }
    return obj;
  },

  /***************************************************************************
   *                                                                          *
   * Whether or not implicit records for associations should be cleaned up    *
   * automatically using the built-in polyfill.  This is especially useful    *
   * during development with sails-disk.                                      *
   *                                                                          *
   * Depending on which databases you're using, you may want to disable this  *
   * polyfill in your production environment.                                 *
   *                                                                          *
   * (For production configuration, see `config/env/production.js`.)          *
   *                                                                          *
   ***************************************************************************/
  // cascadeOnDestroy: true
};