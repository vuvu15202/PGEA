import { API_URL } from '../constants/env'
import axiosClient from './jwt/jwtService'

export const authApi = {
  login: payload => {
    return axiosClient.post(`${API_URL}/api/auth/sign-in/account`, payload, {
      headers: {
        'Api-Version': 'public'
      }
    })
  },
  upload: payload => {
    return axiosClient.post(`${API_URL}/api/file/upload-file`, payload, {
      headers: {
        'api-version': 'admin'
      }
    })
  },
  getCapcha: () => {
    return axiosClient.get(`${API_URL}/api/auth/create-captcha`)
  },
  getFeConfigs: () => axiosClient.get(`${API_URL}/api/admin/get-fe-conf`),
  refreshToken: (headers = {}) =>
    axiosClient.post(
      `${API_URL}/api/auth/sign-in/refresh-token?page=16&api=refresh-token`,
      {},
      { headers: { ...headers } }
    )
}
