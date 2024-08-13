/**
 * Api.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  description: "API need authen permission",
  fetchRecordsOnCreate: true,
  fetchRecordsOnUpdate: true,
  API_METHOD: {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    PATCH: "PATCH",
    DELETE: "DELETE",
  },
  API_TEMPLATE: {
    actionPath: "",
    description: "",
    requireRoleIds: [],
    apiVersion: "",
    method: "",
    userIdField: "",
    ignoreFields: [],
    conditions: {},
    selectedFields: [],
    enableCaptcha: false,
  },
  attributes: {
    actionPath: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
      columnType: "text",
    },
    requireRoleIds: {
      type: "json",
      defaultsTo: [],
    },
    apiVersion: {
      type: "string",
      maxLength: 255,
      defaultsTo: "public",
    },
    method: {
      type: "string",
      maxLength: 10,
      isIn: ["GET", "PUT", "PATCH", "POST", "DELETE"],
      required: true,
    },
    userIdField: {
      type: "string",
      allowNull: true,
      description:
        "field chứa user id để xác định việc người dùng chỉ được phép truy cập bản ghi của mình. không có trường này tức là allow all",
    },
    whereByUserField: {
      type: "json",
      defaultsTo: {},
      description:
        "field mapping giữa trường trong bản ghi với trường trong dữ liệu người dùng",
    },
    ignoreFields: {
      type: "json",
      defaultsTo: [],
      description: "những field không được phép cập nhật",
    },
    conditions: {
      type: "json",
      defaultsTo: {},
      description: "Sử dụng cho where condition khi dùng blueprint",
    },
    selectedFields: {
      type: "json",
      defaultsTo: [],
      description: "những field sẽ trả về khi dùng blueprint",
    },
    enableCaptcha: {
      type: "boolean",
      defaultsTo: false,
    },
    fieldAllowValue: {
      type: "json",
      defaultsTo: {},
      description:
        "Định nghĩa những trường dữ liệu client được phép tạo hay cập nhật trong enum giá trị định nghĩa. Ví dụ. {status:[1,2,3]} nghĩa là người dùng chỉ được phép cập nhật trường status trong list các số 1 2 3",
    },
    boolExpression: {
      type: "string",
      columnType: "text",
      description:
        "Định nghĩa thông tin dành cho việc check quyền gọi api theo dữ liệu gửi lên kèm với thông tin người dùng. Áp dụng cho api update và create",
    },
  },
  beforeCreate: function (api, cb) {
    api.actionPath = api.actionPath.toLowerCase();
    api.method = api.method.toUpperCase();
    return cb();
  },
  beforeUpdate: function (api, cb) {
    if (api.actionPath) {
      api.actionPath = api.actionPath.toLowerCase();
    }
    if (api.method) {
      api.method = api.method.toUpperCase();
    }
    return cb();
  },
  enableCache: true,
  customToJSON: function () {
    this.modelName = "api";
    return this;
  },
  bootstrap: async () => {
    return true;
  },
};