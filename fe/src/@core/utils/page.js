import _ from 'lodash'

export const getPage = (user, meta, id) => {
  if (!meta) return 'no page'

  const { pages } = meta

  for (let i = 0; i < pages.length; i++) {
    if (pages[i].id == id) {
      if (!Array.isArray(pages[i].buttons)) pages[i].buttons = []
      if (pages[i].buttons) {
        let tmpButtons = []
        pages[i].buttons.map(i => {
          if (!(i.roles && i.roles.length > 0 && _.intersection(i.roles, user.roleId).length === 0)) {
            tmpButtons.push(i)
          }

          return i
        })
        pages[i].buttons = tmpButtons
      }
      if (pages[i].grid) {
        let tmpGrid = []
        pages[i].grid.map(i => {
          if (!(i.roles && i.roles.length > 0 && _.intersection(i.roles, user.roleId).length === 0)) {
            tmpGrid.push(i)
          }

          return
        })
        pages[i].grid = tmpGrid
      }

      if (pages[i].schema) {
        let tmpSchema = []
        pages[i].schema.map(i => {
          if (!(i.roles && i.roles.length > 0 && _.intersection(i.roles, user.roleId).length === 0)) {
            tmpSchema.push(i)
          }

          return
        })
        pages[i].schema = tmpSchema
      }

      return pages[i]
    }
  }
}

export const getPageSync = (userInfo, meta, id) => {
  if (!meta) {
    window.location.href = '/login'
  }

  let pages = meta.pages
  for (var i = 0; i < pages.length; i++) {
    if (pages[i].id == id) {
      if (!Array.isArray(pages[i].buttons)) pages[i].buttons = []
      if (pages[i].buttons) {
        let tmpButtons = []
        pages[i].buttons.map(i => {
          if (!(i.roles && i.roles.length > 0 && _.intersection(i.roles, userInfo.roleId).length === 0)) {
            tmpButtons.push(i)
          }

          return i
        })
        pages[i].buttons = tmpButtons
      }
      if (pages[i].grid) {
        let tmpGrid = []
        pages[i].grid.map(i => {
          if (!(i.roles && i.roles.length > 0 && _.intersection(i.roles, userInfo.roleId).length === 0)) {
            tmpGrid.push(i)
          }

          return
        })
        pages[i].grid = tmpGrid
      }

      if (pages[i].schema) {
        let tmpSchema = []
        pages[i].schema.map(i => {
          if (!(i.roles && i.roles.length > 0 && _.intersection(i.roles, userInfo.roleId).length === 0)) {
            tmpSchema.push(i)
          }

          return
        })
        pages[i].schema = tmpSchema
      }

      return pages[i]
    }
  }
}

export const getFieldReferValue = (fieldName, rowData, userData) => {
  if (typeof fieldName !== 'string') {
    return fieldName
  }
  let ret = fieldName
  let tmp = fieldName.split('.')
  if (tmp.length === 1) {
    return ret
  }
  try {
    switch (tmp[0]) {
      case 'this':
        ret = JSON.parse(JSON.stringify(rowData))
        break
      case 'user':
        if (userData) {
          ret = JSON.parse(JSON.stringify(userData))
        } else {
          ret = local.get('user')
        }
        break
      case 'special':
        switch (tmp[1]) {
          case 'undefined':
            return undefined
        }
      default:
        return ret
    }
    for (let i = 1; i < tmp.length; i++) {
      const key = tmp[i]
      if (ret[key] !== undefined) {
        ret = ret[key]
      } else {
        return fieldName
      }
    }

    return ret
  } catch (error) {
    console.error({
      error
    })

    return fieldName
  }
}

export const checkObject = (key, obj, rowData, userData) => {
  if (!key) {
    for (const k in obj) {
      if (obj.hasOwnProperty(k)) {
        const e = obj[k]
        if (Array.isArray(e)) {
          if (!checkArray(k, e, rowData, userData)) {
            return false
          }
        } else {
          if (!checkObject(k, e, rowData, userData)) {
            return false
          }
        }
      }
    }

    return true
  } else {
    let compareValue = getFieldReferValue(key, rowData, userData)
    if (Array.isArray(obj)) {
      for (let i = 0; i < obj.length; i++) {
        const e = obj[i]
        if (checkObject(key, e, rowData, userData)) {
          return true
        }
      }

      return false
    } else
      for (const k in obj) {
        let data = obj[k]
        if (Array.isArray(data)) {
          data = data.map(v => getFieldReferValue(v, rowData, userData))
        } else {
          data = getFieldReferValue(data, rowData, userData)
        }

        switch (k) {
          case 'in':
            if (!Array.isArray(data)) return false
            if (Array.isArray(compareValue) && _.intersection(compareValue, data).length !== compareValue.length) {
              return false
            } else if (!data.includes(compareValue)) {
              return false
            }
            break
          case 'nin':
            if (!Array.isArray(data)) return false
            if (Array.isArray(compareValue) && _.intersection(compareValue, data).length === compareValue.length) {
              return false
            } else if (data.includes(compareValue)) {
              return false
            }
            break
          case '=':
            if (compareValue !== data) {
              return false
            }
            break
          case '==':
            if (compareValue != data) {
              return false
            }
            break
          case '>':
            if (isNaN(+compareValue) || isNaN(+data) || +compareValue <= +data) {
              return false
            }
            break
          case '<':
            if (isNaN(+compareValue) || isNaN(+data) || +compareValue >= +data) {
              return false
            }
            break
          case '>=':
            if (isNaN(+compareValue) || isNaN(+data) || +compareValue < +data) {
              return false
            }
            break
          case '<=':
            if (isNaN(+compareValue) || isNaN(+data) || +compareValue > +data) {
              return false
            }
            break
          case '!=':
            if (compareValue === data) {
              return false
            }
            break
          case '!==':
            if (compareValue == data) {
              return false
            }
            break
          case 'contains':
            if (typeof compareValue !== 'string' || typeof data !== 'string') {
              return false
            }
            if (!compareValue.includes(data)) {
              return false
            }
            break
          case 'startsWith':
            if (typeof compareValue !== 'string' || typeof data !== 'string') {
              return false
            }
            if (!compareValue.startsWith(data)) {
              return false
            }
            break
          case 'endsWith':
            if (typeof compareValue !== 'string' || typeof data !== 'string') {
              return false
            }
            if (!compareValue.endsWith(data)) {
              return false
            }
            break
        }
      }

    return true
  }
}

export const checkArray = (key, arr = [], rowData, userData) => {
  for (let i = 0; i < arr.length; i++) {
    const element = arr[i]
    if (Array.isArray(element) && checkArray(key, element, rowData, userData)) {
      return true
    } else if (checkObject(key, element, rowData, userData)) {
      return true
    }
  }

  return false
}

export const getApiByName = (apis = [], name) => apis.find(api => api.name === name)

export const parseQueryData = embed => {
  if (embed) {
    let tmp = embed
    if (typeof tmp === 'string') {
      try {
        tmp = JSON.parse(tmp)
      } catch (error) {
        tmp = undefined
      }
    } else if (typeof tmp !== 'object') {
      tmp = undefined
    }

    return tmp
  }

  return undefined
}

export const replaceAll = (str, search, replacement) => {
  if (!str) str = ''

  return str.replace(new RegExp(search, 'g'), replacement)
}

export const checkHideExpression = (hideExpression, rowData = {}, user) => {
  if (!hideExpression) return false

  try {
    hideExpression = JSON.parse(hideExpression)

    if (Array.isArray(hideExpression)) {
      return checkArray(null, hideExpression, JSON.parse(JSON.stringify(rowData)), user)
    } else {
      return checkObject(null, hideExpression, JSON.parse(JSON.stringify(rowData)), user)
    }
  } catch (error) {
    let str = hideExpression + ''
    for (let i in rowData) {
      str = replaceAll(str, 'this.' + i, rowData[i])
    }

    for (let j in user) {
      str = replaceAll(str, 'user.' + j, user[j])
    }

    return !!str
  }
}

export const DOCSO = (function () {
  var t = ['không', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín'],
    r = function (r, n) {
      var o = '',
        a = Math.floor(r / 10),
        e = r % 10

      return (
        a > 1
          ? ((o = ' ' + t[a] + ' mươi'), 1 == e && (o += ' mốt'))
          : 1 == a
          ? ((o = ' mười'), 1 == e && (o += ' một'))
          : n && e > 0 && (o = ' lẻ'),
        5 == e && a >= 1
          ? (o += ' lăm')
          : 4 == e && a >= 1
          ? (o += ' tư')
          : (e > 1 || (1 == e && 0 == a)) && (o += ' ' + t[e]),
        o
      )
    },
    n = function (n, o) {
      var a = '',
        e = Math.floor(n / 100),
        n = n % 100

      return o || e > 0 ? ((a = ' ' + t[e] + ' trăm'), (a += r(n, !0))) : (a = r(n, !1)), a
    },
    o = function (t, r) {
      var o = '',
        a = Math.floor(t / 1e6),
        t = t % 1e6
      if (a > 0) {
        o = n(a, r) + ' triệu'
        r = !0
      }

      var e = Math.floor(t / 1e3),
        t = t % 1e3

      return e > 0 && ((o += n(e, r) + ' nghìn'), (r = !0)), t > 0 && (o += n(t, r)), o
    }

  return {
    doc: function (r) {
      if (0 == r) return t[0]
      let [left, rigth] = (r + '').split('.')
      r = +left

      var n = '',
        a = '',
        isNega = false
      if (r < 0) {
        r *= -1
        isNega = true
      }

      do {
        var ty = r % 1e9
        r = Math.floor(r / 1e9)
        n = r > 0 ? o(ty, !0) + a + n : o(ty, !1) + a + n
        a = ' tỷ'
      } while (r > 0)
      let ret = isNega ? 'Âm ' + n.trim() : n.trim()
      if (rigth) {
        ret +=
          ' phẩy ' +
          rigth
            .split('')
            .map(v => {
              return t[+v]
            })
            .join(' ')
      }

      return ret
    }
  }
})()

export const convertNumberToText = DOCSO.doc
