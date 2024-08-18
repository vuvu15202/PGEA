const passport = require("passport");

module.exports = async function (req, res, next) {
  let apiVersion = req.headers["api-version"] || req.query["api-version"] || "";

  let token = req.headers.authorization;
  let current = moment().valueOf();
  let authToken = await AuthToken.findOne({
    token: token,
    isDelete: false,
    expiredAt: { ">": current },
  });

  if (authToken) {
    let ret = await Auth.login(null, null, null, authToken.auth);
    if (ret.status) {
      try {
        let { auth, user } = ret.obj;
        User.removeUneccessaryValue(user);
        Auth.removeUneccessaryValue(auth);
        UserType.removeUneccessaryValue(user.userType);
        req.auth = auth;
        req.user = user;
        return next();
      } catch (error) {
        return res.serverError(error);
      }

    }
  }

  passport.authenticate(
    "jwt",
    {
      session: false,
    },
    async (err, status, payload) => {
      req.user = (payload || {}).user || {};
      req.auth = (payload || {}).auth || {};
      if (apiVersion === "public") {
        return next();
      }
      if (err) {
        return res.serverError({ err, payload, status });
      }

      if (!status) {
        return res.unauthorized({
          message: payload.message,
        });
      } else {
        return next();
      }
    }
  )(req, res);
};
