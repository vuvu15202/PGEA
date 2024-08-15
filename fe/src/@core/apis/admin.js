import { API_URL } from '../constants/env'
import axiosClient from './jwt/jwtService'

export const adminApi = {
  getMeta: () => axiosClient.get(`${API_URL}/api/admin/get-meta`)
}
