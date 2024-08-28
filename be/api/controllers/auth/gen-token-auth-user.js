const md5 = require("md5");

module.exports = {
  friendlyName: "Gen token auth user",

  description: "Gen token auth user",

  inputs: {
    expiredAt: {
      type: "number",
    },
  },

  exits: {},

  fn: async function (inputs, exits) {
    let req = this.req;
    let res = this.res;
    let characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let randomString = "";

    for (let i = 0; i < 10; i++) {
      let randomIndex = Math.floor(Math.random() * characters.length);
      randomString += characters.charAt(randomIndex);
    }

    try {
      let user = req.user;
      if (user) {
        let tokenAuth = {
          user: user.id,
          token: "basic " + md5(user.name + moment().valueOf() + randomString),
        };
        await AuthToken.create(tokenAuth).fetch();
        return res.ok({
          tokenAuth: tokenAuth,
          message: tokenAuth.token,
        });
      }
    } catch (error) {
      return res.serverError(error);
    }
  },
};
