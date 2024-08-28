module.exports = {


  friendlyName: 'Refresh conf',


  description: 'Tải lại dữ liệu cấu hình hệ thống từ csdl',


  inputs: {

  },


  exits: {
    
  },


  fn: async function (inputs, exits) {
    try {
      await cache.refreshCache();
      return exits.success({ message: sails.__('Cache sync successful!') });
    } catch (err) {
      return this.res.serverError(err);
    }
  }


};
