module.exports = async function (req, res, next) {
  const getApiVersion = (req) =>
    req.headers["api-version"] || req.query["api-version"] || "";

  const extractToken = (req) => {
    if (!req.headers || !req.headers.authorization) return null;
    const parts = req.headers.authorization.split(" ");
    return parts.length === 2 ? { scheme: parts[0], token: parts[1] } : null;
  };

  const handleBasicAuth = async (req, res, next, basicToken) => {
    try {
      const current = moment().valueOf();
      const userToken = await AuthToken.findOne({
        token: basicToken,
        isDelete: false,
      });

      if (!userToken) {
        return res.unauthorized({ message: "wrong token" });
      }

      const user = await User.findOne({ id: userToken.user }).populate("userType");
      if (!user) {
        return res.unauthorized({ message: "user not found" });
      }

      User.removeUneccessaryValue(user);
      user.roleId = user.roleId.concatUnique(user.userType.defaultRole);
      req.user = user;
      req.isBasic = true;
      return next();
    } catch (error) {
      return res.serverError(error);
    }
  };

  const handleBearerAuth = (req, res, next, token) => {
    jwt
      .verifyTokenAsync(token)
      .then((decodedToken) => {
        req.user = decodedToken.user;
        req.auth = decodedToken.auth;
        return next();
      })
      .catch((err) => res.serverError({ err }));
  };

  const apiVersion = getApiVersion(req);
  const tokenData = extractToken(req);

  if (!tokenData) {
    if (apiVersion === "public") {
      return next();
    }
    return res.unauthorized({
      message: "auth.policy.noAuthorizationHeaderFound",
    });
  }

  const { scheme, token } = tokenData;

  if (/^Basic$/i.test(scheme)) {
    return handleBasicAuth(req, res, next, req.headers.authorization);
  }

  if (/^Bearer$/i.test(scheme)) {
    return handleBearerAuth(req, res, next, token);
  }

  return res.unauthorized({ message: "auth.policy.wrongFormat" });
};
