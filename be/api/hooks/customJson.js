// api/hooks/customJson/index.js
const _ = require('lodash');
const blueprints = ['create', 'update', 'find', 'destroy'];

module.exports = function customJson(sails) {
    return {
      initialize: function (cb) {
        sails.on('router:before', function () {
          sails.hooks.http.app.use(function (req, res, next) {
            // Store the original res.json method
            const originalJson = res.json.bind(res);
  
            // Override res.json
            res.json = function (data) {
              // // Perform custom actions before sending the response
  
              let {
                params,
                options
              } = req;
        
              let {
                  limit,
                  skip,
                  page,
                  api,
                  queryInput
              } = req.query;
              let apiVersion = req.headers['api-version'] || req.query['api-version'] || '';
          
              let modifiedData;
              let action = options.action.split('/')[1];
              var user = req.user;

              if(options.model && _.includes(blueprints, action) && user){
                let apiInfo = req.apiInfo;
                if(apiVersion == 'pageid'){
                  switch(action){
                    case 'find':
                      let propertiesToRemove = [];
                      if(apiInfo.ignoreRoles){
                        apiInfo.ignoreRoles.forEach(function(item, index) {
                          if(_.intersectionWith(user.roleId, item.roles).length > 0){
                            propertiesToRemove.push(item.field);
                          }
                        });
                      }
                      if(propertiesToRemove.length > 0){
                        const updatedData = data.data.map(record => dynamicRemoveProperties(record, propertiesToRemove));
                        // modifiedData = {
                        //   data: updatedData
                        // };
                        data.data = updatedData;
                      }else{
                        // modifiedData = {
                        //   data
                        // };
                      }
                    break;
                  }
                }else{
                  // modifiedData = {
                  //   data
                  // };
                }
              }else{
                // modifiedData = {
                //     data,
                //     // customKey: 'iam vutruong vu',
                // };
              }
              // Call the original res.json method with the modified data
              return originalJson(data);
            };
  
            next();
          });
        });
  
        return cb();
      },
    };
  };
  // Hàm để loại bỏ các thuộc tính không mong muốn
function dynamicRemoveProperties(obj, propertiesToRemove) {
  return Object.keys(obj).reduce((newObj, key) => {
    if (!propertiesToRemove.includes(key)) {
      newObj[key] = obj[key];
    }
    return newObj;
  }, {});
}