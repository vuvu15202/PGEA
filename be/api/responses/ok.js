/**
 * ok.js
 *
 * A custom response.
 *
 * Example usage:
 * ```
 *     return res.ok();
 *     // -or-
 *     return res.ok(optionalData);
 * ```
 *
 * Or with actions2:
 * ```
 *     exits: {
 *       somethingHappened: {
 *         responseType: 'ok'
 *       }
 *     }
 * ```
 *
 * ```
 *     throw 'somethingHappened';
 *     // -or-
 *     throw { somethingHappened: optionalData }
 * ```
 */

const { forEach } = require("async");
const _ = require('lodash');

module.exports = function ok(optionalData) {

  // Get access to `req` and `res`
  var req = this.req;
  var res = this.res;
  let {
    params,
    options
} = req;


  // Define the status code to send in the response.
  var statusCodeToSet = 200;

  // If no data was provided, use res.sendStatus().
  if (optionalData === undefined) {
    sails.log.info('Ran custom response: res.ok()');
    return res.sendStatus(statusCodeToSet);
  }
  // Else if the provided data is an Error instance, if it has
  // a toJSON() function, then always run it and use it as the
  // response body to send.  Otherwise, send down its `.stack`,
  // except in production use res.sendStatus().
  else if (_.isError(optionalData)) {
    sails.log.info('Custom response `res.ok()` called with an Error:', optionalData);

    // If the error doesn't have a custom .toJSON(), use its `stack` instead--
    // otherwise res.json() would turn it into an empty dictionary.
    // (If this is production, don't send a response body at all.)
    if (!_.isFunction(optionalData.toJSON)) {
      if (process.env.NODE_ENV === 'production') {
        return res.sendStatus(statusCodeToSet);
      }
      else {
        return res.status(statusCodeToSet).send(optionalData.stack);
      }
    }
  }
  // Set status code and send response data.
  else {
    // var user = req.user;
    // let model = options.model;

    // if(model === 'page'){
    //   var pages = optionalData.data;
    //   pages.forEach(function(page, index1) {
    //     if(page.grid){
    //       var fields = page.grid;
    //       fields.forEach(function(field, index2) {
    //         if(field.ignoreRoles && field.ignoreRoles.length >0 && _.intersectionWith(user.roleId, field.ignoreRoles).length > 0){
    //           optionalData.data[index1].grid.splice(index2,1);
    //         }
    //       });
          
    //     }

    //     if(page.schema){
    //       var fields = page.schema;
    //       fields.forEach(function(field, index2) {
    //         if(field.ignoreRoles && field.ignoreRoles.length >0 && _.intersectionWith(user.roleId, field.ignoreRoles).length > 0){
    //           optionalData.data[index1].schema.splice(index2,1);
    //         }
    //       });
          
    //     }
    //   });
    // }else if(optionalData.data){
      
    // }
    
    return res.status(statusCodeToSet).send(optionalData);

    // return res.json({
    //   message,
    //   error
    // });
  }

};
