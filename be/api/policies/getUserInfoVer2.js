module.exports = async function (req, res, next) {
  let apiVersion = req.headers["api-version"] || req.query["api-version"] || "";

  let token;
  if (req.headers && req.headers.authorization && req.headers.authorization != "") {
    const parts = req.headers.authorization.split(" ");
    if (parts.length === 2) {
      const scheme = parts[0];
      const credentials = parts[1];
      if (/^Basic$/i.test(scheme)) {
        let basicToken = req.headers.authorization;
        let current = moment().valueOf();
        let authToken = await AuthUser.findOne({
          token: basicToken,
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
        } else {
          return res.unauthorized({
            message: "wrong token",
          });
        }
      } else if (/^Bearer$/i.test(scheme)) {
        token = credentials;
        await jwt
          .verifyTokenAsync(token)
          .then((decodedToken) => {
            req.user = (decodedToken || {}).user;
            req.auth = (decodedToken || {}).auth;
            return next();
          })
          .catch((err) => {
            return res.serverError({ err });
          });
      } else {
        return res.unauthorized({ message: "auth.policy.wrongFormat" });
      }
    } else {
      if (apiVersion === "public") {
        return next();
      }
      return res.unauthorized({
        message: "auth.policy.noAuthorizationHeaderFound",
      });
    }
  } 
};
