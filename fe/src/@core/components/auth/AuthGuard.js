// ** React Imports
import { useEffect } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Hooks Import
import { useAuth } from 'src/hooks/useAuth'
import { adminApi } from 'src/@core/apis/admin'
import toast from 'react-hot-toast'

const AuthGuard = props => {
  const { children, fallback } = props
  const auth = useAuth()
  const router = useRouter()

  useEffect(
    () => {
      getMeta()
      if (!router.isReady) {
        return
      }
      if (auth.user === null && !window.localStorage.getItem('userData')) {
        if (router.asPath !== '/') {
          router.replace({
            pathname: '/login',
            query: { returnUrl: router.asPath }
          })
        } else {
          router.push('/login')
        }
      }
      if (router.asPath === '/') router.push('/dashboard')
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.route]
  )

  const getMeta = () => {
    auth.setLoading(true)
    adminApi
      .getMeta()
      .then(({ data, status }) => {
        if (status === 200) {
          data.pages.map(page => {
            if (!Array.isArray(page.buttons)) page.buttons = []
            for (var i in page.schema) {
              page.schema[i].pageId = page.id
            }

            return null
          })
          window.localStorage.setItem('meta', JSON.stringify(data))
          auth.setMeta(data)
          auth.setLoading(false)
        }
      })
      .catch(err => {
        toast.error(err?.message || 'Failed to get meta')
      })
  }

  if (auth.loading || (auth.user === null && auth.meta === null)) {
    return fallback
  }

  return <>{children}</>
}

export default AuthGuard
