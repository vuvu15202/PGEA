const passport = require('passport');

module.exports = {

  friendlyName: 'Google auth',

  description: 'Authenticate using Google OAuth',

  inputs: {},

  exits: {
    success: {
      description: 'Successfully authenticated.'
    },
    redirect: {
      description: 'Redirecting to Google for authentication.',
      responseType: 'redirect'
    }
  },

  fn: async function (inputs, exits) {
    return passport.authenticate('google', { scope: ['profile', 'email'] })(this.req, this.res);
  }
};
