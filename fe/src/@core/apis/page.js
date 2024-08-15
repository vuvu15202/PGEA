import _ from 'lodash'
import queryString from 'qs'

import { getApiByName } from '../utils/page'
import axiosClient from './jwt/jwtService'
import { API_URL } from '../constants/env'

const callReport = async (url, reportName, data = {}, headers = {}, method = 'GET') => {
  url = `${API_URL}${url}`

  let option = {
    responseType: 'blob', // important
    body: data // data can be `string` or {object}!
  }
  option.headers = Object.assign({}, option.headers, headers, {})
  if (method === 'GET') delete option.body
  try {
    let response = await axiosClient?.[method](url, { headers: { 'Api-Version': 'pageid' }, ...option })
    url = window.URL.createObjectURL(new Blob([response.data]))
    const link = document.createElement('a')
    link.href = url //Custom-File-Name
    link.setAttribute('download', `${reportName || 'report'}`.replace('{time}', moment().valueOf()))
    document.body.appendChild(link)
    link.click()

    return response
  } catch (error) {
    return error.response || error
  }
}

export const pageApi = {
  callPageApi: (page, name, data) => {
    const api = getApiByName(page.apis, name)
    let input = _.clone(data)
    let url = api.url

    const method = api.method?.toLowerCase()
    let authorization = window.localStorage.getItem('session')
    if (authorization) authorization = authorization.replaceAll('"', '')

    switch (api.method) {
      case 'GET':
        for (let i in data) {
          if (data[i] === undefined) delete data[i]
        }
        input = Object.assign(
          {},
          {
            page: page.id,
            api: api.name
          },
          data
        )

        url += `?${queryString.stringify({
          page: input.page,
          api: input.api,
          queryInput: input.queryInput,
          select: input.select,
          ...input.input
        })}`

        return axiosClient.get(`${API_URL}${url}`, { headers: { 'Api-Version': 'pageid' }, ...input })
      case 'PATCH':
        if (api.type === 'update') {
          url += `/${data.id}?${queryString.stringify({ page: page.id, api: api.name })}`
          delete input.id
        }

        return axiosClient.patch(`${API_URL}${url}`, { ...input }, { headers: { 'Api-Version': 'pageid' } })
      case 'DELETE':
        if (api.type === 'update') {
          url += `/${data.id}?${queryString.stringify({ page: page.id, api: api.name })}`
          delete input.id
        }

        return axiosClient.delete(`${API_URL}${url}`, { headers: { 'Api-Version': 'pageid' }, ...input })
      default:
        url += `?${queryString.stringify({ page: page.id, api: api.name })}`
        break
    }

    return axiosClient[method](
      `${API_URL}${url}`,
      { ...input },
      { headers: { 'Api-Version': 'pageid', ...(authorization ? { Authorization: authorization } : {}) } }
    )
  },
  report: async (page, name, data, reportName) => {
    let api = getApiByName(page.apis, name)
    let input = _.clone(data)
    let url = api.url

    switch (api.method) {
      case 'GET':
        for (let i in data) {
          if (data[i] === undefined) delete data[i]
        }
        input = Object.assign(
          {},
          {
            page: page.id,
            api: api.name,
            report: 1
          },
          data
        )
        url += `?${queryString.stringify(input)}`

        let rss = await callReport(url, reportName)
        if (rss.status !== 200) {
          window.alert(rss.data.message || 'Internal server error')
        }
        break
      default:
        break
    }

    // console.log('report url', url);
    return url
  }
}
