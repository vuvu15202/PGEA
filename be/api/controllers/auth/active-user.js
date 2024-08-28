module.exports = {
  friendlyName: "Active user",

  description: "",

  inputs: {
    account: {
      type: "string",
      required: true,
    },
    token: {
      type: "string",
      required: true,
    },
  },

  exits: {},

  fn: async function (inputs, exits) {
    let req = this.req;
    let res = this.res;

    try {
      let current = moment().valueOf();
      let activeAccountInfo = await AuthPermission.findOne({
        token: inputs.token,
        isDelete: false,
        expiredAt: { ">": current },
        isUse: false,
      });

      if (!activeAccountInfo || inputs.account !== activeAccountInfo.key) {
        return res.notFound({
          message: sails.__(
            "The link to change your password is unavailable, expired, or already in use!"
          ),
        });
      }

      await Auth.updateOne({
        id: activeAccountInfo.auth,
      }).set({
        activated: true,
      });

      await AuthPermission.destroy(activeAccountInfo);

      return res.ok({
        message: sails.__(
          `Account activation successful!`
        ),
      });
    } catch (error) {
      return res.serverError(error);
    }
  },
};
