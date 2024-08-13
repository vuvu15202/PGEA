/**
 * Capt.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
const moment = require('moment');
module.exports = {
 
  attributes: {
    text: {
      type: 'string', maxLength: 10,
    },
    expiredAt: {
      type: 'number'
    }
  },
  beforeCreate: async (instance, cb) => {
    let captExp = Conf.getDataFromKey("TTL_CAPTCHA") || 30;
    instance.expiredAt = moment().add((captExp), 'minutes').valueOf();
    return cb();
  },
  checkCaptcha: async (id, text) => {
    let captInfo = await Capt.findOne({
      id,
      expiredAt: {
        '>=': moment().valueOf()
      },
      isDelete: false
    })
    if (!captInfo) return false;
    if (captInfo.text !== text) return false;
    //delete capt
    await Capt.destroy({
      id
    });
    return true;
  }
};