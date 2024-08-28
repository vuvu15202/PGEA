const jwt = require('jwt-simple');
const moment = require('moment');
module.exports = {
  generate: async (payload, timeOutInMinutes) => {
    if (timeOutInMinutes) {
      payload.exp = moment().valueOf() + timeOutInMinutes * 60 * 1000;
    }
    let encodedToken = jwt.encode(
      payload,
      sails.config.globals.JWT_TOKEN_SECRET
    );
    return "bearer " + encodedToken;
  },

  verifyTokenAsync: async (token) => {
      return new Promise((resolve, reject) => {
        try {
          const decoded = jwt.decode(
            token,
            sails.config.globals.JWT_TOKEN_SECRET
          );
          resolve(decoded);
        } catch (error) {
          reject(error);
        }
      });
  },
};
