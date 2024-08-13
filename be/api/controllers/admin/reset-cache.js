module.exports = {


    friendlyName: 'Reset cache',
  
  
    description: '',
  
  
    inputs: {
  
    },
  
  
    exits: {
  
    },
  
  
    fn: async function (inputs,exits)  {
      try {
        console.log("Reset cache");
        let promises = [];
        for (var index in sails.models) {
          let model = sails.models[index];
          if (model.enableCache && model.setCache) {
            await model.setCache();
          }
        }
        return exits.success({
          message: sails.__('Cache update done!')
        });
      } catch (err) {
        return res.serverError(err);
      }
    }
  
  
  };
  