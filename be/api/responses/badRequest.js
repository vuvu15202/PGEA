/**
 * Module dependencies
 */

var util = require('util');
var _ = require('@sailshq/lodash');



/**
 * 400 (Bad Request) Handler
 *
 * Usage:
 * return res.badRequest();
 * return res.badRequest(data);
 *
 * e.g.:
 * ```
 * return res.badRequest(
 *   'Please choose a valid `password` (6-12 characters)',
 *   'trial/signup'
 * );
 * ```
 */

module.exports = function badRequest(data) {

  // Get access to `req` and `res`
  var req = this.req;
  var res = this.res;

  // Get access to `sails`
  var sails = req._sails;

  var statusCodeToSet = 400;
  // Set status code
  res.status(statusCodeToSet);

  // If no data was provided, use res.sendStatus().
  if (_.isUndefined(data)) {
    return res.json({
      message: sails.__(statusCodeToSet)
    });
  }

  if (_.isError(data)) {
    // If the data is an Error instance and it doesn't have a custom .toJSON(),
    // then util.inspect() it instead (otherwise res.json() will turn it into an empty dictionary).
    // > Note that we don't do this in production, since (depending on your Node.js version) inspecting
    // > the Error might reveal the `stack`.  And since `res.badRequest()` could certainly be used in
    // > production, we wouldn't want to inadvertently dump a stack trace.
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
