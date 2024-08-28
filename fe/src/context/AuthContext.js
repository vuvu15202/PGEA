// ** React Imports
import { createContext, useEffect, useState } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Axios
import axios from 'axios'

// ** Config
import authConfig from 'src/configs/auth'
import { authApi } from 'src/@core/apis/auth'
import toast from 'react-hot-toast'

// ** Defaults
const defaultProvider = {
  user: null,
  meta: null,
  loading: true,
  setUser: () => null,
  setMeta: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve()
}
const AuthContext = createContext(defaultProvider)

const AuthProvider = ({ children }) => {
  // ** States
  const [user, setUser] = useState(defaultProvider.user)
  const [meta, setMeta] = useState(defaultProvider.meta)
  const [loading, setLoading] = useState(defaultProvider.loading)

  // ** Hooks
  const router = useRouter()
  useEffect(() => {
    const initAuth = async () => {
      const promises = [getFeConfigs()]
      const token = window.localStorage.getItem(authConfig.storageTokenKeyName)
      if (token) promises.push(refreshToken())

      return await Promise.allSettled(promises)
    }

    initAuth().finally(() => {
      setLoading(false)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getFeConfigs = async () => {
    try {
      const { data, status } = await authApi.getFeConfigs()
      if (status === 200) {
        const { confs } = data
        window.localStorage.setItem(authConfig.feConfigs, JSON.stringify(confs))
      }
    } catch (err) {
      throw Error(err)
    }
  }

  const refreshToken = async () => {
    try {
      const { data, status } = await authApi.refreshToken()
      if (status === 200) {
        setUser({ ...data.user })
        window.localStorage.setItem(authConfig.auth, JSON.stringify(data.auth))
        window.localStorage.setItem(authConfig.userData, JSON.stringify(data.user))
        window.localStorage.setItem(authConfig.storageTokenKeyName, data.token)
      }
    } catch (err) {
      throw Error(err)
    }
  }

  const handleLogin = (params, errorCallback) => {
    authApi
      .login(params)
      .then(({ data, status }) => {
        if (status === 200) {
          setUser({ ...data.user })
          window.localStorage.setItem(authConfig.auth, JSON.stringify(data.auth))
          window.localStorage.setItem(authConfig.userData, JSON.stringify(data.user))
          window.localStorage.setItem(authConfig.storageTokenKeyName, data.token)
          router.replace('/dashboard')
        } else throw new Error(data?.message)
      })
      .catch(err => {
        if (errorCallback) errorCallback(err?.message)
      })
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem(authConfig.userData)
    window.localStorage.removeItem(authConfig.storageTokenKeyName)
    window.localStorage.removeItem(authConfig.feConfigs)
    window.localStorage.removeItem(authConfig.auth)
    router.push('/login')
  }

  const values = {
    user,
    meta,
    loading,
    setUser,
    setMeta,
    setLoading,
    login: handleLogin,
    logout: handleLogout
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
