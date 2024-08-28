/**
 * serverError.js
 *
 * A custom response.
 *
 * Example usage:
 * ```
 *     return res.serverError();
 *     // -or-
 *     return res.serverError(optionalData);
 * ```
 *
 * Or with actions2:
 * ```
 *     exits: {
 *       somethingHappened: {
 *         responseType: 'serverError'
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
var util = require('util');
var _ = require('@sailshq/lodash');
module.exports = function serverError(data) {
  // Get access to `req` and `res`
  var req = this.req;
  var res = this.res;

  // Get access to `sails`
  var sails = req._sails;

  var statusCodeToSet = 500;
  // Set status code
  res.status(statusCodeToSet);

  // If no data was provided, use res.sendStatus().
  if (_.isUndefined(data)) {
    return res.json({
      message: sails.__(statusCodeToSet)
    });
  }
  if (data) {
    log.error(data, req);
  }
  if (_.isError(data)) {

    if (!_.isFunction(data.toJSON)) {
      let errMess = String(data);
      let tmp = errMess.split('Envelope:');
      let message = sails.__(statusCodeToSet);
      let error = util.inspect(data);
      req.responseMessageLog = JSON.stringify({ error, message });
      if (tmp.length === 2) {
        message = tmp[1].trim();
      }
      if (process.env.NODE_ENV === 'production') {
        return res.json({
          message
        });
      }
      // No need to JSON stringify (this is already a string).

      return res.json({
        message,
        error
      });
    }
  }
  req.responseMessageLog = JSON.stringify(data);
  if (!data.message) {
    data.message = "Error: Unknown error";
  }
  return res.json(data);
};
