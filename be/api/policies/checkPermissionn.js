const intersectionWith = require('lodash.intersectionwith');
var arrQuery = require('array-query');
const _ = require("lodash");
const { forEach } = require('async');
const { json } = require('express');



module.exports = async function (req, res, next) {
    let {
        query,
        params,
        options,
        method
    } = req;

    let apiVersion = req.headers['api-version'] || req.query['api-version'] || '';

    if(apiVersion === 'pageid'){
        return next();
    }

    let apis = API.getCache();
    if(!apis || !apis.length){
        return res.serverError({
            message: sails.__('500'),
            error: ''
        });
    }

    let api = arrQuery('actionPath').is(options.action)//lọc trong apis xem có api cần tìm hay không
    .and('apiVersion').is(apiVersion)
    .and('method').is(method)
    .on(apis);
        
    if(api.length === 1){
        req.apiDescription = api[0].description;
        req.enableCaptcha = !!api[0].enableCaptcha;
        api = api[0];
        if(apiVersion !== 'public' && ( !req.user.roleId || !Array.isArray(req.user.roleId) || intersectionWith((req.user.roleId || []),api.requireRoleIds).length == 0)){
            return res.forbidden({
                message: sails.__('403'),
                error: 'PERMISSION_DENIED'
            });
        }
        if (api.boolExpression) {
            let checkBoolResult = common.checkBoolExpression(api.boolExpression, req.body || {}, req.user || {})
            // return next(new Error(mess.message));
            if (!checkBoolResult) {
              return res.forbidden({
                message: sails.__('Data does not match, please check again!')
              });
            }
          }
          
        if(!options.model){
            if(req.method.toUpperCase() === 'GET'){
                if(api.selectedFields && Array.isArray(api.selectedFields) && api.ignoreFields.length > 0){
                    req.query.select = api.selectedFields.toString();
                }
                if(!query.limit){
                    req.query.limit = 10000;
                }
                if(api.ignoreFields && Array.isArray(api.ignoreFields) && api.ignoreFields.length > 0){
                    req.query.omit = api.ignoreFields.toString();
                }
                let where = {};
                if(query.where){
                    try{
                        where = JSON.parse(query.where);
                    }catch(e){
                        return res.badrequest({
                            message: sails.__('400'),
                            error: String(e)
                        })
                    }
                }
                if(api.userIdField){
                    where[api.userIdField] = req.user.id;
                }
                
                if(api.conditions && typeof api.conditions === 'object'){
                    for (let attrName in api.conditions) {//điều kiện mặc định của api dc thêm vào where 
                        where[attrName] = api.conditions[attrName];
                    }
                }

                if (req.user) {
                    if(api.whereByUserField && typeof api.whereByUserField === 'object'){
                        for(let item in api.whereByUserField){
                            where[item] = req.user[api.whereByUserField[item]]
                        }
                    }
                }
                if(Object.keys(where).length){
                    req.query.where = JSON.stringify(where);
                }
                if(!req.query.sort){
                    req.query.sort = JSON.stringify([{createAt: "DESC"}]);
                }
            }
            return next();
        }else{
            switch(options.action.split('/')[1]){
                case 'find':
                    if(api.selectedFields && Array.isArray(api.selectedFields) && api.selectedFields.length > 0){
                        req.query.select = api.selectedFields.toString();
                    }
                    if(!query.limit){
                        req.query.limit = 10000;
                    }
                    if(api.ignoreFields && Array.isArray(api.ignoreFields) && api.ignoreFields.length > 0){
                        req.query.omit = api.ignoreFields.toString();
                    }
                    let where = {};
                    if(query.where){
                        try{
                            where = JSON.parse(query.where);
                        }catch(e){
                            return res.badrequest({
                                message: sails.__('400'),
                                error: String(e)
                            })
                        }
                    }
                    if(api.userIdField){
                        where[api.userIdField] = req.user.id;
                    }
                    
                    if(api.conditions && typeof api.conditions === 'object'){
                        for (let attrName in api.conditions) {//điều kiện mặc định của api dc thêm vào where 
                            where[attrName] = api.conditions[attrName];
                        }
                    }
    
                    if (req.user) {
                        if(api.whereByUserField && typeof api.whereByUserField === 'object'){
                            for(let item in api.whereByUserField){
                                where[item] = req.user[api.whereByUserField[item]]
                            }
                        }
                    }
    
                    if(Object.keys(where).length){
                        req.query.where = JSON.stringify(where);
                    }
                    if(!req.query.sort){
                        req.query.sort = JSON.stringify([{createdAt: "DESC"}]);
                    }
                    return next();
                case 'create':
                    if(api.ignoreFields && Array.isArray(api.ignoreFields)){
                        for(let item in api.ignoreFields){
                            delete req.body[api.ignoreFields[item]]
                        }
                    }
                    if(req.user && api.userIdField){
                        req.body[api.userIdField] = req.user.id;
                    }

                    if(api.fieldAllowValue && typeof api.fieldAllowValue === 'object' && Object.keys(api.fieldAllowValue).length > 0){
                        for(let key in api.fieldAllowValue){
                            const e = api.fieldAllowValue[key];
                            if(req.body[key] !== undefined && e.length){
                                const value = req.body[key];
                                if(Array.isArray(value) && !_.intersectionWith(value, e).length === e.length){
                                    return res.forbidden({
                                        message: sails.__('403'),
                                        error: 'PERMISSION_DENIED'
                                    });
                                }
                                if(!e.includes(value)){
                                    return res.forbidden({
                                        message: sails.__('403'),
                                        error: 'PERMISSION_DENIED'
                                    });
                                }
                            }
                        }
                    }
                    return next();
                case 'update':
                    var model = sails.models[options.model];
                    if(api.ignoreFields && Array.isArray(api.ignoreFields)){
                        for(let item in api.ignoreFields){
                            delete req.body[api.ignoreFields[item]]
                        }
                    }
                    if(req.user && api.userIdField){
                        params[api.userIdField] = req.user.id;
                    }
                    if(api.conditions && typeof api.conditions === 'object'){
                        for(let item in api.conditions){
                            params[item] = api.conditions[item];
                        }
                    }

                    if (req.user) {
                        if(api.whereByUserField && typeof api.whereByUserField === 'object'){
                            for(let item in api.whereByUserField){
                                params[item] = req.user[api.whereByUserField[item]]
                            }
                        }
                    }

                    if(api.fieldAllowValue && typeof fieldAllowValue === 'object' && Object.keys.length > 0){
                        for(let key in api.fieldAllowValue){
                            const e = api.fieldAllowValue[key];
                            if(req.body[key] !== undefined && e.length){
                                const value = req.body[key];
                                if(Array.isArray(value) && !_.intersectionWith(value, e).length === e.length){
                                    return res.forbidden({
                                        message: sails.__('403'),
                                        error: 'PERMISSION_DENIED'
                                    });
                                }
                                if(!e.includes(value)){
                                    return res.forbidden({
                                        message: sails.__('403'),
                                        error: 'PERMISSION_DENIED'
                                    });
                                }
                            }
                        }
                    }

                    try{
                        let ret = model.findOne(params);
                        if(!ret){
                            return res.forbidden({
                                message: sails.__('403'),
                                error: 'PERMISSION_DENIED'
                            })
                        }
                    }catch(e){
                        return res.serverError({
                            message: sails.__('500'),
                            error: String(e)
                        });
                    }
                    
                    return next();
                case 'destroy':
                    var model = sails.models[options.model];
                    if(req.user && api.userIdField){
                        params[api.userIdField] = req.user.id;
                    }
                    if(api.conditions && typeof api.conditions === 'object'){
                        for(let item in api.conditions){
                            params[item] = api.conditions[item];
                        }
                    }
                    if (req.user) {
                        if(api.whereByUserField && typeof api.whereByUserField === 'object'){
                            for(let item in api.whereByUserField){
                                params[item] = req.user[api.whereByUserField[item]]
                            }
                        }
                    }

                    try{
                        let result = await model.findOne(params);
                        if(result){
                            let ret = await model.updateOne(params).set({
                                isDelete: true,
                                deleteAt: Date.now(),
                                deleteBy: req.user.id
                            });

                            return res.ok(ret);
                        }else{
                            return res.forbidden({
                                message: sails.__('403'),
                                error: 'PERMISSION_DENIED'
                            });
                        }
                    }catch(e){
                        return res.serverError({
                            message: sails.__('500'),
                            error: String(e)
                        });
                    }
                default:
                    return res.notFound({
                        message: sails.__('404'),
                        error: sails.__('API not found!')
                    });

            }
        }



    }else{
        return res.notFound({
            message: sails.__('404'),
            error: sails.__('API not found!')
        })
    }
};