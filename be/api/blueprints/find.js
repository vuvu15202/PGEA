/**
 * Module dependencies
 */
var actionUtil = require('sails/lib/hooks/blueprints/actionUtil');
_ = require('@sailshq/lodash');
var formatUsageError = require('sails/lib/hooks/blueprints/formatUsageError.js');
const MAX_RECORDS = 10000;
/**
 * Find Records
 *
 *  get   /:modelIdentity
 *   *    /:modelIdentity/find
 *
 * An API call to find and return model instances from the data adapter
 * using the specified criteria.  If an id was specified, just the instance
 * with that unique id will be returned.
 *
 * Optional:
 * @param {Object} where       - the find criteria (passed directly to the ORM)
 * @param {Integer} limit      - the maximum number of records to send back (useful for pagination)
 * @param {Integer} skip       - the number of records to skip (useful for pagination)
 * @param {String} sort        - the order of returned records, e.g. `name ASC` or `age DESC`
 * @param {String} callback - default jsonp callback param (i.e. the name of the js function returned)
 */

module.exports = function findRecords(req, res) {
  var parseBlueprintOptions = req.options.parseBlueprintOptions || req._sails.config.blueprints.parseBlueprintOptions;

  // Set the blueprint action for parseBlueprintOptions.
  req.options.blueprintAction = 'find';

  var queryOptions = parseBlueprintOptions(req);
  var Model = req._sails.models[queryOptions.using];
  // console.log(queryOptions.meta);
  // if (queryOptions.meta) {
  //   console.log(queryOptions.meta);
  //   queryOptions.meta.enableExperimentalDeepTargets = true;
  // }
  // console.log(queryOptions.criteria)

  let countQuery = Model.count()
    .where(actionUtil.parseCriteria(req));
  countQuery.exec(function f(err, count) {
    if (err) {
      return res.serverError(err);
    }
    if (!queryOptions.criteria.limit || queryOptions.criteria.limit < 0) {
      queryOptions.criteria.limit = MAX_RECORDS;
    }
    if (req.apiInfo && req.apiInfo.downloadReport) {
      delete queryOptions.criteria.skip;
      delete queryOptions.criteria.limit;
    }
    if (queryOptions.criteria.where) {
      queryOptions.criteria.where.isDelete = false;
    }
    Model
      .find(queryOptions.criteria, queryOptions.populates).meta(queryOptions.meta).meta({ enableExperimentalDeepTargets: true })
      .exec(function found(err, matchingRecords) {
        if (err) {
          // If this is a usage error coming back from Waterline,
          // (e.g. a bad criteria), then respond w/ a 400 status code.
          // Otherwise, it's something unexpected, so use 500.
          switch (err.name) {
            case 'UsageError':
              return res.badRequest(formatUsageError(err, req));
            default:
              return res.serverError(err);
          }
        } //-•
        let countDataRet = matchingRecords.length;
        // if (countDataRet > MAX_RECORDS) {
        //   return res.serverError({ code: 502, message: 'Số lượng kết quả trả về quá lớn' });
        // }
        //if report excel
        if (req.apiInfo && req.apiInfo.downloadReport) {
          switch (req.apiInfo.downloadReport) {
            // case 'userReport':
            //   return sails.helpers.report.reportUser(matchingRecords).then(bin => {
            //     res.setHeader('Content-Type', 'application/vnd.openxmlformats');
            //     res.setHeader("Content-Disposition", "attachment; filename=" + "Report.xlsx");
            //     res.end(bin, 'binary');
            //   });
          }
        }

        if (req._sails.hooks.pubsub && req.isSocket) {
          Model.subscribe(req, _.pluck(matchingRecords, Model.primaryKey));
          // Only `._watch()` for new instances of the model if
          // `autoWatch` is enabled.
          if (req.options.autoWatch) {
            Model._watch(req);
          }
          // Also subscribe to instances of all associated models
          _.each(matchingRecords, function (record) {
            actionUtil.subscribeDeep(req, record);
          });
        } //>-

        let retData = {
          data: matchingRecords,
          count
        }
        if (queryOptions.using === 'notice') {
          let updateId = [];
          matchingRecords.map(v => {
            if (!v.read) {
              updateId.push(v.id);
            }
          });
          if (updateId.length) {
            Model.update({ id: updateId }, { read: true }).exec(function f(err, record) {
              if (err) {
                return res.serverError(err);
              }
              let where = actionUtil.parseCriteria(req);
              where.read = false;
              Model.count().where(where).exec(function f(err, count) {
                if (err) {
                  return res.serverError(err);
                }
                retData.remainNotice = count;
                return res.ok(retData);
              })
            });
          } else {
            let where = actionUtil.parseCriteria(req);
            where.read = false;
            Model.count().where(where).exec(function f(err, count) {
              if (err) {
                return res.serverError(err);
              }
              retData.remainNotice = count;
              return res.ok(retData);
            })
          }
        } else {
          return res.ok(retData);
        }
      }); //</ .find().exec() >
  });
};
