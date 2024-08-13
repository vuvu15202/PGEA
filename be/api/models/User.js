/**
 * User.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
const _ = require('@sailshq/lodash')

function getAgeFromBirthday(birthday) {
  if (birthday) {
    var totalMonths = moment().diff(birthday, 'months');
    var years = parseInt(totalMonths / 12);
    // var months = totalMonths % 12;
    // if (months !== 0) {
    //   return parseFloat(years + '.' + months);
    // }
    return years < 0 ? 0 : years;
  }
  return 0;
}

module.exports = {
  fetchRecordsOnCreate: true,
  fetchRecordsOnUpdate: true,
  attributes: {
    name: {
      type: 'string',
      columnType: 'text'
    },
    phone: {
      type: 'string',
      custom: function (value) {
        //validate phone here
        return true;
      },
    },
    userType: {
      model: 'userType',
      required: true,
      description: 'Sử dụng cho việc phân role người dùng'
    },
    email: {
      type: 'string',
      isEmail: true,
    },
    roleId: {
      type: 'json',
      description: 'Danh sách những role phân thêm cho người dùng',
      custom: function (value) {
        return Array.isArray(value);
      },
      defaultsTo: []
    },
    locale: {
      type: 'string',
      defaultsTo: 'vi'
    },
    gender: {
      type: 'string',
      isIn: ['male', 'female', 'other'],
      defaultsTo: 'other'
    },
    description: {
      type: 'string',
      columnType: 'text'
    },
    locked: {
      type: 'boolean',
      defaultsTo: false
    },
    firstLoginAt: {
      type: 'number',
      columnType: 'bigint'
    },
    fcmToken: {
      type: 'json',
      custom: function (value) {
        return Array.isArray(value);
      },
      defaultsTo: []
    },
    avatar: {
      type: 'string'
    },
    dob: {
      type: 'string',
      custom: function (value) {
        return value === '' || value.isValidDate();
      }
    },
    money: {
      type: 'number',
      columnType: 'double',
      defaultsTo: 0,
      min: 0
    }
  },
  // enableCache: true,
  customToJSON: function () {
    // this.modelName='user';
    let defaultRole = (this.userType || {}).defaultRole;

    if (defaultRole) { //call when populate
      this.roleId = this.roleId.concatUnique(defaultRole);
    }
    if (this.dob) {
      this.age = getAgeFromBirthday(moment(this.dob))
    } else {
      this.age = 0;
    }

    return this;
  },
  beforeCreate: async function (user, cb) {
    if (!user.roleId) {
      user.roleId = [];
    } else {
      user.roleId.sort();
    }

    return cb();
  },
  beforeUpdate: async function (updateData, cb) {
    if (updateData.roleId) {
      updateData.roleId.sort();
    }
    return cb();
  },
  addingOmitValue: ['fcmToken'], //view more for logic in model.js
  bootstrap: async () => {
    return true;
  },
  afterCreate: async function (user, cb) {
    return cb()
  },
  afterUpdate: async function (user, cb) {
    return cb()
  }
};