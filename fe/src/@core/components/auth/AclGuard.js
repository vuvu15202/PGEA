// ** React Imports
import { useEffect } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Context Imports
import { AbilityContext } from 'src/layouts/components/acl/Can'

// ** Config Import
import { buildAbilityFor } from 'src/configs/acl'

// ** Component Import
import NotAuthorized from 'src/pages/401'
import Spinner from 'src/@core/components/spinner'
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Hooks
import { useAuth } from 'src/hooks/useAuth'

// ** Util Import
import getHomeRoute from 'src/layouts/components/acl/getHomeRoute'
import { parse } from 'qs'
import FormCtrl from '../form-ctrl'
import { Container } from '@mui/system'
import { Button, Card } from '@mui/material'
import { Icon } from '@iconify/react'
import { useTranslation } from 'react-i18next'
import authConfig from 'src/configs/auth'
import { authApi } from 'src/@core/apis/auth'
import toast from 'react-hot-toast'

const AclGuard = props => {
  // ** Props
  const { aclAbilities, children, guestGuard = false, authGuard = true } = props

  // ** Hooks
  const { t } = useTranslation()
  const auth = useAuth()
  const router = useRouter()

  // ** Vars
  let ability
  useEffect(() => {
    if (auth.user && auth.user.role && !guestGuard && router.route === '/') {
      const homeRoute = getHomeRoute(auth.user.role)
      router.replace(homeRoute)
    }
  }, [auth.user, guestGuard, router])

  // User is logged in, build ability for the user based on his role
  if (auth.user && !ability) {
    ability = buildAbilityFor(auth.user.role, aclAbilities.subject)
    if (router.route === '/') {
      return <Spinner />
    }
  }

  // If guest guard or no guard is true or any error page
  if (guestGuard || router.route === '/404' || router.route === '/500' || !authGuard) {
    // If user is logged in and his ability is built
    if (auth.user && ability) {
      return <AbilityContext.Provider value={ability}>{children}</AbilityContext.Provider>
    } else {
      // If user is not logged in (render pages like login, register etc..)
      return <>{children}</>
    }
  }

  // Check the access of current user and render pages
  if (ability && auth.user && ability.can(aclAbilities.action, aclAbilities.subject)) {
    if (router.route === '/') {
      return <Spinner />
    }

    return <AbilityContext.Provider value={ability}>{children}</AbilityContext.Provider>
  }

  const refreshToken = async headers => {
    try {
      const { data, status } = await authApi.refreshToken(headers)
      if (status === 200) {
        window.localStorage.setItem(authConfig.auth, JSON.stringify(data.auth))
        window.localStorage.setItem(authConfig.session, JSON.stringify(data.token))
      }
    } catch (err) {
      console.log(err?.message)
    }
  }

  if (auth.meta) {
    if (!window.localStorage.getItem('userData') && window.localStorage.getItem(authConfig.feConfigs)) {
      const confs = JSON.parse(window.localStorage.getItem(authConfig.feConfigs))

      refreshToken({
        Authorization: confs.PUBLIC_USER_TOKEN
      })
    }

    const { FORGOT_PASSWORD_LINK, REGISTER_LINK } = auth.meta.confs
    const path = `/${router.asPath.replaceAll('/', '')}`
    if (FORGOT_PASSWORD_LINK.includes(path) || REGISTER_LINK.includes(path))
      return (
        <Container>
          <Card sx={{ p: 4, mt: '4rem' }}>
            <Button
              onClick={() => {
                router.push('/login')
              }}
            >
              <Icon icon={'tabler:arrow-left'} fontSize={'2rem'} />
              <span style={{ marginLeft: '1rem' }}>{t('common.backToLogin')}</span>
            </Button>
            <FormCtrl query={router.query} />
          </Card>
        </Container>
      )
    else if (path.includes('page=32') || path.includes('page=31'))
      return (
        <Container>
          <Card sx={{ p: 4, mt: '4rem' }}>
            <FormCtrl query={router.query} />
          </Card>
        </Container>
      )
  }

  // Render Not Authorized component if the current user has limited access
  return (
    <BlankLayout>
      <div></div>
      {/* <NotAuthorized /> */}
    </BlankLayout>
  )
}

export default AclGuard
