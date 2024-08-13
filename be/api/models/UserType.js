/**
 * UserType.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
    TYPE: {
  
    },
  
    attributes: {
      name: { type: 'string' },
      description: { type: 'string', columnType: 'text' },
      ruleIgnoreRole: { type: 'json', defaultsTo: [1, 2], description: 'khi người dùng ở type này thì sẽ không thể lấy được những role trong list để phân quyền cho người dùng' },
      ruleOnlyViewCreatedBy: { type: 'boolean', defaultsTo: false, description: 'Chỉ cho phép nhìn thấy người dùng được tạo bởi chính mình' },
      ruleViewUserType: { type: 'json', defaultsTo: [], description: 'khi người dùng ở type hiện tại có thể thấy những type người dùng nào để phân type người dùng' },
      defaultRole: { type: 'json', defaultsTo: [], description: 'Role mặc định khi người dùng được cấp chức danh. Sẽ ghi đè nếu được cấp chức danh mới theo chức danh được chuyển đến' },
      defaultGrantUserType: { type: 'number', description: 'nhóm quyền cấp cho tài khoản do chính mình tạo mặc định' }
  },
    
    
    beforeCreate: (data, cb) => {
      return cb();
    },
    beforeUpdate: (data, cb) => {
      return cb();
    }
  
  
  };
  
  