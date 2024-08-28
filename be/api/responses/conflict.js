/**
 * conflict.js
 *
 * A custom response.
 *
 * Example usage:
 * ```
 *     return res.conflict();
 *     // -or-
 *     return res.conflict(optionalData);
 * ```
 *
 * Or with actions2:
 * ```
 *     exits: {
 *       somethingHappened: {
 *         responseType: 'conflict'
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
module.exports = function conflict(data) {
  // Get access to `req` and `res`
  var req = this.req;
  var res = this.res;

  // Get access to `sails`
  var sails = req._sails;

  var statusCodeToSet = 409;
  // Set status code
  res.status(statusCodeToSet);

  // If no data was provided, use res.sendStatus().
  if (_.isUndefined(data)) {
    return res.json({
      message: sails.__(statusCodeToSet)
    });
  }

  if (_.isError(data)) {
    if (!_.isFunction(data.toJSON)) {
      let error = util.inspect(data);
      let message = sails.__(statusCodeToSet);
      req.responseMessageLog = JSON.stringify({error,message});
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
  return res.json(data);
};
