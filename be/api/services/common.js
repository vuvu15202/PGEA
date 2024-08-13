let common = {};
const bcrypt = require("bcryptjs");
const uuidv1 = require('uuid/v1');
const path = require('path');
const moment = require('moment');
var removeDiacritics = require('diacritics').remove;
var ASCIIFolder = require("fold-to-ascii");
const _ = require('@sailshq/lodash')
const rgTestDate = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/
//function custom by Thanh

common.checkHash = function (text,hash) {
  return bcrypt.compareSync(text,hash);
};

common.checkPasswordStrength = function (text) {
   var strongRegex = constant.PASSWORD_REGEX;
   return strongRegex.test(text);
};

common.hash = function (text) {
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(text, salt);
  return hash;
};

common.queryStringToObject = (queryString) => {
  let obj = {};
  if (queryString) {
    if (queryString.startsWith('?')) {
      queryString = queryString.slice(1);
    }
    queryString.split('&').map((item) => {
      const [k, v] = item.split('=');
      v ? obj[k] = v : null
    });
  }
  return obj;
};

common.removeDiacritics = function (input) {
  if (input) {
    return removeDiacritics(ASCIIFolder.fold(input + ''));
  }
  return input;
}
common.hookPrototype = function () {
  console.log('Hook prototype!');

  function escapeRegExp(str) {
    return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
  }
  String.prototype.replaceAll = function (find, replacement) {
    let ret = this;
    ret = ret.replace(new RegExp(escapeRegExp(find), 'g'), replacement);
    return ret;
  }
  String.prototype.formatCurrency = function () {
    let ret = this;
    return ret.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  Number.prototype.formatCurrency = function () {
    let ret = this + '';
    return ret.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  Array.prototype.concatUnique = function (arr = []) {
    if (Array.isArray(arr)) {
      let currentArr = this;
      return [...new Set([...currentArr, ...arr])];
    }
    throw new Error('INPUT_INVALID');
  }

  String.prototype.hideInfo = function (opts = {
    symbol: '*',
    front: false,
    middle: true,
    back: false
  }) {
    opts = Object.assign({}, {
      symbol: '*',
      front: false,
      middle: true,
      back: false
    }, opts);
    let {
      symbol,
      front,
      middle,
      back
    } = opts;
    let ret = this;
    ret = ret.split('');
    let length = ret.length;
    let mid = Math.floor(length / 2);
    let lengthPerPart = Math.floor(length / 3);
    let midOffset = Math.floor(lengthPerPart / 2);
    for (let i = 0; i < length; i++) {
      if (front) {
        if (i < mid - midOffset) {
          ret[i] = symbol;
        }
      }
      if (middle) {
        if (i >= mid - midOffset && i <= mid + midOffset) {
          ret[i] = symbol;
        }
      }
      if (back) {
        if (middle) {
          if (i > mid + midOffset) {
            ret[i] = symbol;
          }
        }
      }

    }
    return ret.join('');
  }

  String.prototype.isValidDate = function () {
    var dateString = this;
    return moment(dateString, "YYYY-MM-DD", true).isValid();
  }
  console.log('DONE Hook prototype')
}
common.randomOTP = function (length) {
  // let add = 1;
  // let max = 12 - add; // 12 is the min safe number Math.random() can generate without it starting to pad the end with zeros.
  //
  // if (length > max) {
  //   return generate(max) + generate(length - max);
  // }
  //
  // max = Math.pow(10, length + add);
  // var min = max / 10; // Math.pow(10, n) basically
  // var number = Math.floor(Math.random() * (max - min + 1)) + min;
  //
  // return ('' + number).substring(add);
  return '123456';
};


common.sqlWithLimitOffset = function (sql, limit, skip) {
  if (limit) {
    sql += ` limit ${+limit} `;
  }
  if (skip) {
    if (!limit) {
      sql += ` limit 100`;
    }
    sql += ` offset ${+skip} `;
  }
  return sql;
};

common.parseWhere = function (where) {
  if (!where) {
    return {};
  }
  where = JSON.parse(where);
  if (Array.isArray(where)) {
    throw 'UNSUPPORTED_WHERE_TYPE';
  }
  return where;
}

common.parseSort = function (sort) {
  if (!sort) {
    return [];
  }
  sort = JSON.parse(sort);
  if (!Array.isArray(sort)) {
    throw 'UNSUPPORTED_SORT_TYPE';
  }
  for (let i = 0; i < sort.length; i++) {
    const element = sort[i];
    if (Array.isArray(element)) {
      throw 'UNSUPPORTED_SORT_TYPE';
    }
    if (typeof element !== 'object') {
      throw 'UNSUPPORTED_SORT_TYPE';
    }
  }
  return sort;
}




common.parseSelect = function (select) {
  if (!select) {
    return undefined;
  }
  select = select.split(',');
  if (!Array.isArray(select)) {
    throw 'UNSUPPORTED_SELECT_TYPE';
  }
  return select;
}


common.sqlWithSort = function (sql, inputsSort = '[]', valuesToEscape = []) {
  let sort = common.parseSort(inputsSort);
  let order = '';
  for (let i = 0; i < sort.length; i++) {
    const e = sort[i];
    if (e && typeof e === 'object' && !Array.isArray(e)) {
      let keys = Object.keys(e);
      for (let j = 0; j < keys.length; j++) {
        const key = keys[j];
        let value = e[key];
        if (order) {
          order += ',' + '`' + key + '`' + ` ${(value + '').toUpperCase() === 'ASC' ? 'asc' : 'desc'}`;
        } else {
          order += ` order by ` + '`' + key + '`' + ` ${(value + '').toUpperCase() === 'ASC' ? 'asc' : 'desc'}`;
        }
      }
    }
  }
  return {
    sql: sql + order,
    valuesToEscape
  };
}


common.sqlWitWhere = function (sql, inputsWhere = '{}', valuesToEscape = []) {
  let where = common.parseWhere(inputsWhere);

  let condition = '';
  let tmpEscapeValue = [];
  let indexEscapeStart = valuesToEscape.length + 1;
  for (const key in where) {
    if (where.hasOwnProperty(key)) {
      let con = where[key];
      let sqlCondition = ''
      if (con || con === 0 || con === false) {
        switch (typeof con) {
          case 'object':
            let existed = false;
            if (con['contains'] !== undefined) {
              existed = true;
              sqlCondition += '`' + key + '`' + ` like $${indexEscapeStart++}`;
              tmpEscapeValue.push('%' + con.contains + '%');
            }
            if (con['between'] !== undefined) {
              if (existed) {
                sqlCondition += ' and ';
              } else {
                existed = true;
              }
              sqlCondition += '`' + key + '`' + ` between $${indexEscapeStart++} and $${indexEscapeStart++}`
              tmpEscapeValue.push(Number(con['between'][0]));
              tmpEscapeValue.push(Number(con['between'][1]));
            }

            if (con['!='] !== undefined) {
              if (existed) {
                sqlCondition += ' and ';
              } else {
                existed = true;
              }
              sqlCondition += '`' + key + '`' + ` != $${indexEscapeStart++}`
              tmpEscapeValue.push(con['!=']);
            }

            if (con['>'] !== undefined && !Number.isNaN(Number(con['>']))) {
              if (existed) {
                sqlCondition += ' and ';
              } else {
                existed = true;
              }
              sqlCondition += '`' + key + '`' + ` > $${indexEscapeStart++}`
              tmpEscapeValue.push(Number(con['>']));
            }
            if (con['<'] !== undefined && !Number.isNaN(Number(con['<']))) {
              if (existed) {
                sqlCondition += ' and ';
              } else {
                existed = true;
              }
              sqlCondition += '`' + key + '`' + ` < $${indexEscapeStart++}`
              tmpEscapeValue.push(Number(con['<']));
              // sqlCondition += key + ` < ${Number(con['<'])}`
            }
            if (con['<='] !== undefined && !Number.isNaN(Number(con['<=']))) {
              if (existed) {
                sqlCondition += ' and ';
              } else {
                existed = true;
              }
              sqlCondition += '`' + key + '`' + ` <= $${indexEscapeStart++}`
              tmpEscapeValue.push(Number(con['<=']));
              // sqlCondition += key + ` <= ${Number(con['<='])}`
            }
            if (con['>='] !== undefined && !Number.isNaN(Number(con['>=']))) {
              if (existed) {
                sqlCondition += ' and ';
              } else {
                existed = true;
              }
              sqlCondition += '`' + key + '`' + ` >= $${indexEscapeStart++}`
              tmpEscapeValue.push(Number(con['>=']));
              // sqlCondition += key + ` >= ${Number(con['>='])}`
            }
            if (_.isArray(con)) {
              if (existed) {
                sqlCondition += ' and ';
              } else {
                existed = true;
              }

              if (con.length) {
                // sqlCondition += `${key} in $${indexEscapeStart++}`
                // tmpEscapeValue.push('('+con.join(',')+')');
                sqlCondition += '`' + key + '`' + ` in (${con.map(v => {
                  tmpEscapeValue.push(v);
                  v = '$' + indexEscapeStart;
                  indexEscapeStart++;
                  return v;
                }).join(',')})`
              } else {
                sqlCondition += ` 1=0 `
              }
            }
            break;
          case 'boolean':
          case 'number':
          case 'string':
            // sqlCondition = key + ` = ${con}`;
            sqlCondition += '`' + key + '`' + ` = $${indexEscapeStart++}`
            tmpEscapeValue.push(con);

            break;
        }
        if (sqlCondition) {
          if (condition) {
            condition += ' and ' + sqlCondition + '\n'
          } else {
            condition += ' where ' + sqlCondition + '\n'
          }
        }
      }
    }
  }
  valuesToEscape = valuesToEscape.concat(tmpEscapeValue);;
  return {
    sql: sql + condition,
    valuesToEscape
  };
}


common.getRandInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

common.getRandInArray = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)]
}

common.generateRandomAlphaNum = (len) => {
  var rdmString = "";
  for (; rdmString.length < len; rdmString += Math.random().toString(36).substr(2));
  return rdmString.substr(0, len);
}

common.getUniqueString = function () {
  return uuidv1();
};



//Nhóm Function check việc trường/nút bấm được phép hiện ra hay không
//Output: boolean   (true => Trường/nút bấm bị ẩn)

function getFieldReferValue(fieldName, rowData, userData) {
  // console.log({fieldName,rowData, userData})
  if (typeof fieldName !== 'string') {
    return fieldName;
  }
  let ret = fieldName;
  let tmp = fieldName.split('.');
  if (tmp.length === 1) {
    return ret;
  }
  try {
    switch (tmp[0]) {
      case 'this':
        ret = JSON.parse(JSON.stringify(rowData));
        break;
      case 'user':
        ret = JSON.parse(JSON.stringify(userData));
        break;
      case 'special':
        switch (tmp[1]) {
          case 'undefined':
            return undefined;
        }
      default:
        return ret;
    }
    for (let i = 1; i < tmp.length; i++) {
      const key = tmp[i];
      if (ret[key] !== undefined) {
        ret = ret[key];
      } else {
        return fieldName;
      }
    }
    return ret;
  } catch (error) {
    // console.log({userData})
    log.error({
      error
    })
    return fieldName;
  }

}


function checkArray(key, arr, rowData, userData) {
  for (let i = 0; i < arr.length; i++) {
    const element = arr[i];
    if (Array.isArray(element) && checkArray(key, element, rowData, userData)) {
      return true;
    } else
      if (checkObject(key, element, rowData, userData)) {
        return true;
      }
  }
  return false;
}

function checkObject(key, obj, rowData, userData) {
  if (!key) {
    for (const k in obj) {
      if (obj.hasOwnProperty(k)) {
        const e = obj[k];
        if (Array.isArray(e)) {
          if (!checkArray(k, e, rowData, userData)) {
            return false;
          }
        } else {
          if (!checkObject(k, e, rowData, userData)) {
            return false;
          }
        }
      }
    }
    return true;
  } else {
    let compareValue = getFieldReferValue(key, rowData, userData)
    if (Array.isArray(obj)) {
      for (let i = 0; i < obj.length; i++) {
        const e = obj[i];
        if (checkObject(key, e, rowData, userData)) {
          return true;
        }
      }
      return false;
    } else
      for (const k in obj) {
        let data = obj[k];
        if (Array.isArray(data)) {
          data = data.map(v => getFieldReferValue(v, rowData, userData))
        } else {
          data = getFieldReferValue(data, rowData, userData);
        }
        switch (k) {
          case 'in':
            if (!Array.isArray(data)) return false;
            if (Array.isArray(compareValue) && _.intersection(compareValue, data).length !== compareValue.length) {
              return false;
            } else if (!data.includes(compareValue)) {
              return false;
            }
            break;
          case 'nin':
            if (!Array.isArray(data)) return false;
            if (Array.isArray(compareValue) && _.intersection(compareValue, data).length === compareValue.length) {
              return false;
            } else if (data.includes(compareValue)) {
              return false;
            }
            break;
          case '=':
            if (compareValue !== data) {
              return false;
            }
            break;
          case '>':
            if (isNaN(+compareValue) || isNaN(+data) || (+compareValue) <= (+data)) {
              return false;
            }
            break;
          case '<':
            if (isNaN(+compareValue) || isNaN(+data) || (+compareValue) >= (+data)) {
              return false;
            }
            break;
          case '>=':
            if (isNaN(+compareValue) || isNaN(+data) || (+compareValue) < (+data)) {
              return false;
            }
            break;
          case '<=':
            if (isNaN(+compareValue) || isNaN(+data) || (+compareValue) > (+data)) {
              return false;
            }
            break;
          case '!=':
            if (compareValue === data) {
              return false;
            }
            break;
          case 'contains':
            if (typeof compareValue !== 'string' || typeof data !== 'string') {
              return false
            }
            if (!compareValue.includes(data)) {
              return false;
            }
            break;
          case 'startsWith':
            if (typeof compareValue !== 'string' || typeof data !== 'string') {
              return false
            }
            if (!compareValue.startsWith(data)) {
              return false;
            }
            break;
          case 'endsWith':
            if (typeof compareValue !== 'string' || typeof data !== 'string') {
              return false
            }
            if (!compareValue.endsWith(data)) {
              return false;
            }
            break;
        }
      }
    return true;
  }
}
common.getFieldReferValue = getFieldReferValue;

common.checkBoolExpression = (boolExpression, rowData = {}, userData = {}) => {
  if (!boolExpression) return false;
  // console.log({
  //   boolExpression,
  //   rowData,
  //   userData
  // });
  //[]=or  {} = and
  // let example = [
  //     {
  //         "this.id": [
  //             { "in": [10, "user.userType.id"] },
  //             { ">": 10 },
  //             { "<": "user.id", ">=": 1, "<=": 1 },
  //         ]
  //     },
  //     { "user.id": { "=": "this.id" } },
  // ]
  try {
    let user = JSON.parse(JSON.stringify(userData))
    boolExpression = JSON.parse(boolExpression);
    rowData = JSON.parse(JSON.stringify(rowData));
    if (Array.isArray(boolExpression)) {
      return checkArray(null, boolExpression, rowData, user)
    } else {
      return checkObject(null, boolExpression, rowData, user)
    }

  } catch (error) {
    log.error({
      error,
      boolExpression
    })

    return false;
  }

}



module.exports = common;