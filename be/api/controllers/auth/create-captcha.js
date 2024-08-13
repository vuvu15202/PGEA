const svgCaptcha = require('svg-captcha');

module.exports = {
  friendlyName: 'Generate a new captcha',
  description: 'Creates a new captcha and returns the captcha data along with its ID',

  inputs: {},

  exits: {
    success: {
      statusCode: 200,
      description: 'Captcha generated successfully.',
    },
    serverError: {
      description: 'An unexpected error occurred.',
      responseType: 'serverError',
    }
  },

  fn: async function (inputs, exits) {
    try {
      let res = this.res;
      let req = this.req;
      let origin = req.headers.origin;

      // Uncomment this block if you need domain restriction in production
      // if (process.env.NODE_ENV === 'production' && origin !== sails.config.custom.baseAdminPageUrl && origin !== sails.config.custom.baseUserPageUrl) {
      //   return res.forbidden({Conf.getDataFromKey(Conf.getDataFromKey(
      //     message: sails.__('DOMAIN NOT ALLOWED!')
      //   });
      // }

      let captchaOptions = {
        background: '#cc9966',
        noise: 10,
        ignoreChars: '',
        charPreset: '0123456789'
      };

      let captcha = svgCaptcha.create(captchaOptions);

      // Save captcha text in the database
      let captInfo = await Capt.create({
        text: captcha.text
      }).fetch();

      return exits.success({
        message: sails.__('200'),
        data: captcha.data,
        id: captInfo.id
      });

    } catch (err) {
      return exits.serverError(err);
    }
  }
};
