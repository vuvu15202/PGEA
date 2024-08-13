module.exports = async function (req, res, next) {
  //For public api
  let apiVersion = req.headers['api-version'] || req.query['api-version'] || '';
  if (apiVersion === 'public') {
    return next();
  }

  if (!req.auth || !req.auth.id) {
    req.responseMessageLog = { message: sails.__('401') };
    return res.unauthorized(req.responseMessage);
  }

  return next();
};
  