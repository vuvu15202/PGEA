/**
 * Datastores
 * (sails.config.datastores)
 *
 * A set of datastore configurations which tell Sails where to fetch or save
 * data when you execute built-in model methods like `.find()` and `.create()`.
 *
 *  > This file is mainly useful for configuring your development database,
 *  > as well as any additional one-off databases used by individual models.
 *  > Ready to go live?  Head towards `config/env/production.js`.
 *
 * For more information on configuring datastores, check out:
 * https://sailsjs.com/config/datastores
 */

module.exports.datastores = {
  /***************************************************************************
   *                                                                          *
   * Your app's default datastore.                                            *
   *                                                                          *
   * Sails apps read and write to local disk by default, using a built-in     *
   * database adapter called `sails-disk`.  This feature is purely for        *
   * convenience during development; since `sails-disk` is not designed for   *
   * use in a production environment.                                         *
   *                                                                          *
   * To use a different db _in development_, follow the directions below.     *
   * Otherwise, just leave the default datastore as-is, with no `adapter`.    *
   *                                                                          *
   * (For production configuration, see `config/env/production.js`.)          *
   *                                                                          *
   ***************************************************************************/

  // mongo: {

  //   /***************************************************************************
  //    *                                                                          *
  //    * Want to use a different database during development?                     *
  //    *                                                                          *
  //    * 1. Choose an adapter:                                                    *
  //    *    https://sailsjs.com/plugins/databases                                 *
  //    *                                                                          *
  //    * 2. Install it as a dependency of your Sails app.                         *
  //    *    (For example:  npm install sails-mysql --save)                        *
  //    *                                                                          *
  //    * 3. Then pass it in, along with a connection URL.                         *
  //    *    (See https://sailsjs.com/config/datastores for help.)                 *
  //    *                                                                          *
  //    ***************************************************************************/
  //   // adapter: require('sails-mysql'),
  //   // url: process.env.MYSQL_DB ||
  //   //   'mysql://root:tomamy1234@54.255.220.197:3306/dps1402'
  //   // // ||
  //   // // 'mysql://root@localhost:3306/dps_om'
  //   // ,
  //   // connectTimeout: 20000, //time out = 20s
  //   adapter: 'sails-mongo',
  //   url: process.env.MONGO_DB ||
  //     ''
  // },
  default: {
    adapter: require("sails-mysql"),
    url:
      process.env.MYSQL_DB ||
      'mysql://root:password@localhost:port/db',
  },

  redis: {
    adapter: "sails-redis",
    host: process.env.REDIS_HOST || "host",
    password: process.env.REDIS_PASS || "pass",
    auth_pass: process.env.REDIS_PASS || "pass",
    // host: 'localhost',
    // password: '',
    // auth_pass: '',
    port: process.env.REDIS_PORT || 6379,
    prefix: "tpe_" + (process.env.NODE_ENV || "development") + "_",
    db: process.env.REDIS_DB || 3,
    retry_strategy: function (options) {
      if (options.error && options.error.code === "ECONNREFUSED") {
        // End reconnecting on a specific error and flush all commands with
        // a individual error
        return new Error("The server refused the connection");
      }
      if (options.total_retry_time > 1000 * 60 * 60) {
        // End reconnecting after a specific timeout and flush all commands
        // with a individual error
        return new Error("Retry time exhausted");
      }
      if (options.attempt > 10) {
        // End reconnecting with built in error
        return undefined;
      }
      // reconnect after
      return Math.min(options.attempt * 100, 3000);
    },
  },
};
