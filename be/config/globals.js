/**
 * Global Variable Configuration
 * (sails.config.globals)
 *
 * Configure which global variables which will be exposed
 * automatically by Sails.
 *
 * For more information on any of these options, check out:
 * https://sailsjs.com/config/globals
 */

module.exports.globals = {

  /****************************************************************************
   *                                                                           *
   * Whether to expose the locally-installed Lodash as a global variable       *
   * (`_`), making  it accessible throughout your app.                         *
   *                                                                           *
   ****************************************************************************/

  _: require('@sailshq/lodash'),

  /****************************************************************************
   *                                                                           *
   * Whether to expose the locally-installed `async` as a global variable      *
   * (`async`), making it accessible throughout your app.                      *
   * (See the link above for help.)                                            *
   *                                                                           *
   ****************************************************************************/

  async: require('async'),

  /****************************************************************************
   *                                                                           *
   * Whether to expose each of your app's models as global variables.          *
   * (See the link at the top of this file for more information.)              *
   *                                                                           *
   ****************************************************************************/

  models: true,
 

  /****************************************************************************
   *                                                                           *
   * Whether to expose the Sails app instance as a global variable (`sails`),  *
   * making it accessible throughout your app.                                 *
   *                                                                           *
   ****************************************************************************/

  sails: true,
  /**
   * Custome global variable
   */

  JWT_TOKEN_SECRET: (process.env.NODE_ENV === 'production' ? '' : ''),
  BASE_URL: process.env.BASE_URL || 'http://localhost:1337',
  LOG_FILE: false,
  GOOGLE_CLIENT_ID:'',
  GOOGLE_CLIENT_SECRET: '',
};