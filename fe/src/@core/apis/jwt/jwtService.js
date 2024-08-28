// ** Axios import
import axios from 'axios'

// ** Config import
import { jwtConfig } from './jwtConfig'
import { authService } from './authService'
import auth from 'src/configs/auth'

const axiosClient = axios.create({
  headers: {
    'Content-Type': 'application/json'
  },
  responseType: 'json'
})

axiosClient.interceptors.request.use(
  async config => {
    const jwtToken = localStorage.getItem(jwtConfig.storageTokenKeyName)
    const lang = localStorage.getItem('i18nextLng') || 'vi'

    if (jwtToken && config.headers) {
      config.headers.Authorization = `${jwtToken}`
    }

    config.headers['accept-language'] = lang;

    return config
  },
  async error => {
    return Promise.reject(error.response.data.errors[0].message)
  }
)
axiosClient.interceptors.response.use(
  async response => {
    return response
  },
  async error => {
    if (error.response) {
      const { code } = error
      const config = error.config

      // if (error.response.status === 401) {
      //   return authService
      //     .refreshToken()
      //     .then(rs => {
      //       console.log(rs.data)
      //       if (rs.data?.isSuccess) {
      //         const { accessToken } = rs.data.data

      //         const payload = {
      //           accessToken
      //         }
      //         config.headers = {
      //           ...config.headers,
      //           Authorization: `${jwtConfig.tokenType} ${accessToken}`
      //         }
      //         authService.updateStorageWhenRefreshToken(payload)

      //         return axiosClient(config)
      //       } else {
      //         console.log('loi2')
      //         authService.removeLocalStorageWhenLogout()
      //         window.location.href = jwtConfig.logoutEndpoint
      //       }
      //     })
      //     .catch(err => {
      //       console.log(err)
      //       authService.removeLocalStorageWhenLogout()
      //       window.location.href = jwtConfig.logoutEndpoint
      //     })
      // }

      return Promise.reject(error.response?.data)
    }

    return Promise.reject(error)
  }
)

export default axiosClient
