const blueprints = ["create", "update", "find", "destroy"];
const { detect } = require("async");
const _ = require("lodash");
const qs = require("qs");
const { query } = require("winston");
module.exports = async function (req, res, next) {
  let { params, options } = req;

  let { limit, skip, page, api, queryInput } = req.query;

  let apiVersion = req.headers["api-version"] || req.query["api-version"] || "";

  if (apiVersion !== "pageid") {
    return next();
  } 

  if (queryInput) {
    queryInput = JSON.parse(queryInput);
  } else {
    queryInput = {};
  }

  let input = JSON.parse(JSON.stringify(queryInput));

  if (req.method === "PUT" || req.method === "POST" || req.method === "PATCH") {
    input = req.body;
  }

  if (!api || !page) {
    return res.notFound({
      code: 1,
      message: sails.__("Page not found!"),
      error: "Page not found!",
    });
  }

  let pageInfo = await Page.getPage(page);

  if (!pageInfo) {
    return res.notFound({
      code: 1,
      message: sails.__("Page information not found!"),
      error: "Page information not found!",
    });
  }

  if (
    !pageInfo.roles &&
    !pageInfo.roles.length > 0 &&
    !_.intersection(pageInfo.roles, req.user.roleId).length > 0
  ) {
    return res.unauthorized({
      code: 1,
      message: sails.__("403"),
      error: "PERMISSION_DENIED",
    });
  }

  if (!pageInfo.apis) {
    return res.notFound({
      code: 1,
      message: sails.__("Page not found!"),
      error: "Page not found!",
    });
  }

  let apiInfo = null;
  pageInfo.apis.map((a) => {
    if (a.name == api) {
      apiInfo = a;
    }
  });

  if (!apiInfo) {
    return res.notFound({
      message: sails.__("API not found!"),
      error: "API not found!",
    });
  }
  
  req.apiInfo = apiInfo;

  if (
    !apiInfo.roles &&
    !pageInfo.roles.length &&
    !_.intersection(req.user.roleId, apiInfo.roles) > 0
  ) {
    return res.unauthorized({
      message: sails.__("Insufficient permissions to access the API!"),
      error: "Insufficient permissions to access the API",
    });
  }

  //bool
  if (
    apiInfo.boolExpression &&
    !common.checkBoolExpression(
      apiInfo.boolExpression,
      req.body || {},
      req.user || {}
    )
  ) {
    // log.info()
    return res.forbidden({
      message: sails.__("Data does not match, please check again!"),
    });
  }

  let action = options.action.split("/")[1];
  let prepareData = {},
    criterias = {};
  if (input.id) {
    prepareData.id = input.id;
  }
  if (apiInfo.requestFields) {
    let requestFields = apiInfo.requestFields.split(",");
    for (var i = 0; i < requestFields.length; i++) {
      let field = requestFields[i];
      prepareData[field] = input[field]; // tạo thêm thuọc tính cho prepareData với tên là ... và gán giá trị
    }
  } else {
    prepareData = input;
  }

  if (apiInfo.restrictFields) {
    let restrictFields = apiInfo.restrictFields.split(",");
    for (let item in restrictFields) {
      delete prepareData[item];
    }
  }

  if (apiInfo.options && apiInfo.options.length) {
    apiInfo.options.map((option) => {
      try {
        option.value = JSON.parse(option.value);
      } catch (e) {
        option.value = option.value || "";
      }
      if (typeof option.value === "object") {
        // criterias[crit.key] = crit.value;
        let tmp = JSON.stringify(option.value);
        for (const key in req.user) {
            if (req.user.hasOwnProperty(key)) {
                const ele = req.user[key];
                if (Array.isArray(ele)) {
                    let a = '[';
                    ele.map((v, i) => {
                        if (i) {
                            a += ','
                        }
                        if (typeof v === 'string') {
                            a += `"${v}"`;
                        } else {
                            a += v;
                        }
                    })
                    a += ']';
                    tmp = tmp.replaceAll('"@' + key + '@"', a)
                } else {
                    tmp = tmp.replaceAll('"@' + key + '@"', ele)
                }
            }
        }
        // option.value = JSON.parse(tmp);
        // console.log({tmp:JSON.parse(tmp)})
        prepareData[option.key] = JSON.parse(tmp);

      } else {
        if (
          typeof option.value == "string" &&
          option.value.substr(0, 2) == "--"
        ) {
          let v = option.value.substr(2);
          if (v === "true") {
            prepareData[option.key] = 1;
          } else if (v === "false") {
            prepareData[option.key] = 0;
          } else {
            if (req.user[v] != undefined) {
              prepareData[option.key] = req.user[v];
            } else if (v === "false") {
              return res.serverError({
                code: 1,
                message: sails.__("Invalid fixed parameter!"),
              });
            }
          }
        } else {
          prepareData[option.key] = option.value;
        }
      }
    });
  }
  //criterias
  if (apiInfo.criterias || Array.isArray(apiInfo.criterias)) {
    apiInfo.criterias.map((criteria) => {
      if (
        typeof criteria.value == "string" &&
        criteria.value.substr(0, 2) == "--"
      ) {
        let v = criteria.value.substr(2);
        if (v === "true") {
          criterias[criteria.key] = 1;
        } else if (v === "false") {
          criterias[criteria.key] = 0;
        } else {
          if (req.user[v] != undefined) {
            criterias[criteria.key] = req.user[v];
          } else if (v === "false") {
            return res.serverError({
              code: 1,
              message: sails.__("Invalid fixed parameter!"),
            });
          }
        }
      } else {
        criterias[criteria.key] = criteria.value;
      }
    });
  }

  req.enableCaptcha = !!apiInfo.enableCaptcha;
  
  if (!_.includes(blueprints, action)) {
    let keys = Object.keys(prepareData);
    if (req.method.toUpperCase() == "GET" && keys.length > 0) {
      action = "find";
    } else { 
      return next();
    }
  }

  switch (action) {
    case "find":
      prepareData = Object.assign(prepareData, criterias);
      for (const key in queryInput) {
        if (Array.isArray(queryInput[key]) && Array.isArray(prepareData[key])) {
          prepareData[key] = _.intersectionWith(
            prepareData[key],
            queryInput[key]
          );
        }
        if (
          !Array.isArray(queryInput[key]) &&
          Array.isArray(prepareData[key])
        ) {
          prepareData[key] = _.intersectionWith(prepareData[key], [
            queryInput[key],
          ]);
        }
      }
      req.query.where = JSON.stringify(prepareData);
      req.query.limit == limit || 10000;
      req.query.skip = skip || 0;
      if (apiInfo.responseFields) {
        req.query.select = apiInfo.responseFields;
      }
      // if(apiInfo.ignoreRoles){
            //     var ignoreRoles = apiInfo.ignoreRoles;
            //     var select =  req.query.select == undefined ? [] : req.query.select.split(',');
            //     var omit = [];
            //     ignoreRoles.forEach(function(item, index) {
            //       if(item.roles && item.roles.length >0 && _.intersectionWith(req.user.roleId, item.roles).length > 0){
            //         select = select.filter(item => item !== item.field);
            //         omit.push(item.field);
            //       }
            //     });
            //     if(select.length > 0){
            //         req.query.select = select.join(',');
            //     }else{
            //         delete req.query.select;
            //     }
            //     if(omit.length > 0){
            //         req.query.omit = omit.join(',');
            //     }else{
            //         delete req.query.omit;
            //     }
            // }
      req.query = Object.assign(req.query, prepareData);
      if (api.fixedQuery) {
        req.query = Object.assign(req.query, JSON.stringify(api.fixedQuery));
      }
      console.log(req.query.where)
      return next();
    case "create":
      try {
        delete prepareData.id;
        req.body = prepareData;
        req.query = {};
        req.params = {};
      } catch (e) {
        return res.serverError({
          message: sails.__("Data not created!"),
          error: "",
        });
      }
      return next();
    case "update":
      if (criterias.id == undefined) {
        criterias.id = params.id;
      }
      if (criterias.id != params.id) {
        return res.forbidden({
          message: sails.__("403"),
          error: "PERMISSION_DENIED",
        });
      }
      try {
        delete prepareData.deletedAt;
        delete prepareData.deletedBy;
        delete prepareData.isDelete;
        delete prepareData.id;

        var model = sails.models[options.model];
        let ret = await model.findOne(criterias);
        if (!ret) {
          return res.forbidden({
            message: sails.__("403"),
            error: "PERMISSION_DENIED",
          });
        }
        req.params = criterias;
        req.body = prepareData;
      } catch (e) {
        return res.serverError({
          code: 1,
          message: sails.__("Data not updated!"),
          error: String(err),
        });
      }
      return next();
    case "delete":
      if (criterias.id == undefined) {
        criterias.id = params.id;
      }
      if (criterias.id !== params.id) {
        return res.forbidden({
          message: sails.__("403"),
          error: "PERMISSION_DENIED",
        });
      }
      try {
        var model = sails.models[options.model];
        let obj = await model.findOne(criterias);
        if (obj) {
          let ret = model.updateOne(criterias).set({
            deletedAt: Date.now(),
            deletedBy: req.user.id,
            isDelete: true,
            id: criterias.id,
          });
          return res.ok(ret);
        } else {
          return res.forbidden({
            message: sails.__("403"),
            error: "PERMISSION_DENIED",
          });
        }
      } catch (e) {
        return res.serverError({
          message: sails.__("500"),
          error: String(e),
        });
      }
    default:
      req.body = prepareData;
      req.queryInput = prepareData;
      return next();
  }
};
