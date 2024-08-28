/**
 * HTTP Server Settings
 * (sails.config.http)
 *
 * Configuration for the underlying HTTP server in Sails.
 * (for additional recommended settings, see `config/env/production.js`)
 *
 * For more information on configuration, check out:
 * https://sailsjs.com/config/http
 */
const uuidv1 = require('uuid/v1');
const passport = require('passport');
const express = require('express');


module.exports.http = {


  /****************************************************************************
   *                                                                           *
   * Sails/Express middleware to run for every HTTP request.                   *
   * (Only applies to HTTP requests -- not virtual WebSocket requests.)        *
   *                                                                           *
   * https://sailsjs.com/documentation/concepts/middleware                     *
   *                                                                           *
   ****************************************************************************/
  middleware: {

    /***************************************************************************
     *                                                                          *
     * The order in which middleware should be run for HTTP requests.           *
     * (This Sails app's routes are handled by the "router" middleware below.)  *
     *                                                                          *
     ***************************************************************************/

    order: [
      'staticAsset',
      'staticUpload',
      'cookieParser',
      'session',
      'passportInit',
      'passportSession',
      'bodyParser',
      'setLanguageLocale',
      'compress',
      //Custome middleware go here
      'logApiCall',
      // 'updateCache',
      //End custome middleware
      'poweredBy',
      'router',
      'www',
      'favicon',
    ],


    /***************************************************************************
     *                                                                          *
     * The body parser that will handle incoming multipart HTTP requests.       *
     *                                                                          *
     * https://sailsjs.com/config/http#?customizing-the-body-parser             *
     *                                                                          *
     ***************************************************************************/
    passportInit: passport.initialize(),
    passportSession: passport.session(),
    staticAsset: express.static(process.cwd() + '/assets'),
    staticUpload: express.static(process.cwd() + '/upload/public'),
    
    setLanguageLocale: (function () {
      return (req, res, next) => {
        // set locale by req
        // if (constant.ALLOW_LANGUAGE.includes((req.headers['accept-language'] + '').toLowerCase())) {
        //   sails.hooks.i18n.setLocale(req.headers[('accept-language' + '').toLowerCase()]);
        // } else {
        //   sails.hooks.i18n.setLocale('vi');
        // }
        sails.hooks.i18n.setLocale('vi');
        return next();
      };
    })(),
    


    logApiCall: (function () {
      return function (req, res, next) {
        res.on('finish', async () => {
          try {
            let userId = (req.user || {}).id || undefined;
            let authId = (req.auth || {}).id || undefined;

            let responseMessage = req.responseMessageLog || '';
            let apiDescription = req.apiDescription || 'Chưa có mô tả';
            // console.log({responseMessage})

            let requestHeader = req.headers;
            let body = req.body;
            let params = req.params;
            let query = req.query;
            let requestMethod = req.method.toUpperCase();
            let startTime = req._startTime;
            let requestUrl = req.path.toLowerCase();
            let responseStatusCode;
            let requestData = {};
            let ip = req.headers['x-forwarded-for'] ||
              req.connection.remoteAddress ||
              req.socket.remoteAddress ||
              (req.connection.socket ? req.connection.socket.remoteAddress : null);
            let apiVersion = req.headers['api-version'] || req.query['api-version'] || '';
            if (body) {
              requestData.body = _.omit(body, ['password', 'oldPassword', 'newPassword']);
            }
            if (query) {
              requestData.query = _.omit(query, ['password', 'oldPassword', 'newPassword']);
            }
            if (params) {
              requestData.params = _.omit(params, ['password', 'oldPassword', 'newPassword']);
            }
            responseStatusCode = res.statusCode;
            takeTime = new Date() - startTime;


            if (requestUrl.includes('auth/sign-in') && responseStatusCode === 200) {
              let authenType = (requestUrl.split('/auth/sign-in/')[1] || '').toLowerCase();
              apiDescription = 'Đăng nhập hệ thống';

              try {
                await LogAuthen.create({
                  // id: uuidv1(),
                  ip,
                  authId,
                  authenType,
                  createdBy: userId
                });
              } catch (error) {
                log.error(
                  error
                );
              }
            }

            if (requestUrl.includes('auth/logout') && responseStatusCode === 200) {
              try {
                await LogAuthen.create({
                  // id: uuidv1(),
                  ip,
                  authId,
                  authenType: 'logout',
                  createdBy: userId
                });
              } catch (error) {
                log.error(error);
              }
            }

            if (req.params && req.params.id) {
              apiDescription = apiDescription.replace('{id}', req.params.id);
            }

            let logCallApi = {
              // id: uuidv1(),
              requestHeader,
              requestMethod,
              requestUrl,
              requestData,
              responseStatusCode,
              takeTime,
              userId,
              ip,
              responseMessage,
              apiDescription,
              authId, apiVersion
            };
            if (requestMethod !== 'OPTIONS') {
              try {
                await LogCallApi.create(logCallApi);
              } catch (error) {
                log.error(error);
              }
            }
          } catch (e) {
            log.error(e)
          }
        });
        return next();
      };
    })(),

    bodyParser: (function _configureBodyParser() {
      var skipper = require('skipper');
      var middlewareFn = skipper({
        strict: true,
        maxTimeToBuffer: 100000,
        limit: '20mb'
      });
      return middlewareFn;
    })(),

    

  },

};









































