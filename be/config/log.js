/**
 * Built-in Log Configuration
 * (sails.config.log)
 *
 * Configure the log level for your app, as well as the transport
 * (Underneath the covers, Sails uses Winston for logging, which
 * allows for some pretty neat custom transports/adapters for log messages)
 *
 * For more information on the Sails logger, check out:
 * https://sailsjs.com/docs/concepts/logging
 */
const winston = require('winston');
require('winston-daily-rotate-file');
const moment = require('moment');
const tsFormat = () => moment().format('YYYY-MM-DD HH:mm:ss').trim();

const moduleName = require('../package').name;
var transport = new(winston.transports.DailyRotateFile)({
  filename: __dirname + '/../logs/' + moduleName + ".log",
  datePattern: 'DD-MM-YYYY',
  timestamp: tsFormat,
  json: false,
  level: 'debug',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '20d'
});



var logger = new(winston.Logger)({
  transports: [
    transport
  ]
});

// set logging level one of { error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }
// logger.level = 'debug';
let obj = {

  /***************************************************************************
   *                                                                          *
   * Valid `level` configs: i.e. the minimum log level to capture with        *
   * sails.log.*()                                                            *
   *                                                                          *
   * The order of precedence for log levels from lowest to highest is:        *
   * silly, verbose, info, debug, warn, error                                 *
   *                                                                          *
   * You may also set the level to "silent" to suppress all logs.             *
   *                                                                          *
   ***************************************************************************/

  level: 'info',

};
let globalVar = require('./globals');
if (process.env.NODE_ENV === 'production' || globalVar.globals.LOG_FILE) {
  obj.custom = logger;
}
module.exports.log = obj;