import useMediaQuery from '@mui/material/useMediaQuery'

// ** Layout Imports
// !Do not remove this Layout import
import Layout from 'src/@core/layouts/Layout'

// ** Navigation Imports
import VerticalNavItems from 'src/navigation/vertical'
import HorizontalNavItems from 'src/navigation/horizontal'

// ** Component Import
// Uncomment the below line (according to the layout type) when using server-side menu
// import ServerSideVerticalNavItems from './components/vertical/ServerSideNavItems'
// import ServerSideHorizontalNavItems from './components/horizontal/ServerSideNavItems'

import VerticalAppBarContent from './components/vertical/AppBarContent'
import HorizontalAppBarContent from './components/horizontal/AppBarContent'

// ** Hook Import
import { useSettings } from 'src/@core/hooks/useSettings'
import { useEffect, useState } from 'react'
import { useAuth } from 'src/hooks/useAuth'
import { isHasPermission } from 'src/@core/utils/user'

const UserLayout = ({ children, contentHeightFixed }) => {
  // ** Hooks
  const { user, meta, setMeta } = useAuth()
  const { settings, saveSettings } = useSettings()
  const [menus, setMenus] = useState([])

  useEffect(() => {
    try {
      const metaString = window.localStorage.getItem('meta')
      const meta = JSON.parse(metaString)

      const items = meta.menus
        .filter(menu => menu.isParent && isHasPermission(user.roleId, menu.roles))
        .map(menu => {
          const children = meta.menus
            .filter(c_menu => c_menu.parent === menu.id)
            .map(c_menu => ({ title: c_menu.name, path: c_menu.url?.replace('?', '/?'), icon: c_menu.icon }))

          return {
            title: menu.name,
            path: menu.url,
            icon: menu.icon,
            ...(children?.length && children?.length > 0 ? { children } : {})
          }
        })

      setMenus(items)
      setMeta(meta)
    } catch (e) {
      console.log(e)
    }
  }, [user.roleId, setMeta])

  // ** Vars for server side navigation
  // const { menuItems: verticalMenuItems } = ServerSideVerticalNavItems()
  // const { menuItems: horizontalMenuItems } = ServerSideHorizontalNavItems()
  /**
   *  The below variable will hide the current layout menu at given screen size.
   *  The menu will be accessible from the Hamburger icon only (Vertical Overlay Menu).
   *  You can change the screen size from which you want to hide the current layout menu.
   *  Please refer useMediaQuery() hook: https://mui.com/material-ui/react-use-media-query/,
   *  to know more about what values can be passed to this hook.
   *  ! Do not change this value unless you know what you are doing. It can break the template.
   */
  const hidden = useMediaQuery(theme => theme.breakpoints.down('lg'))
  if (hidden && settings.layout === 'horizontal') {
    settings.layout = 'vertical'
  }

  return (
    <Layout
      hidden={hidden}
      settings={settings}
      saveSettings={saveSettings}
      contentHeightFixed={contentHeightFixed}
      meta={meta}
      verticalLayoutProps={{
        navMenu: {
          navItems: menus

          // Uncomment the below line when using server-side menu in vertical layout and comment the above line
          // navItems: verticalMenuItems
        },
        appBar: {
          content: props => (
            <VerticalAppBarContent
              hidden={hidden}
              settings={settings}
              saveSettings={saveSettings}
              toggleNavVisibility={props.toggleNavVisibility}
            />
          )
        }
      }}
      {...(settings.layout === 'horizontal' && {
        horizontalLayoutProps: {
          navMenu: {
            navItems: menus

            // Uncomment the below line when using server-side menu in horizontal layout and comment the above line
            // navItems: horizontalMenuItems
          },
          appBar: {
            content: () => <HorizontalAppBarContent settings={settings} saveSettings={saveSettings} />
          }
        }
      })}
    >
      {children}
    </Layout>
  )
}

export default UserLayout
