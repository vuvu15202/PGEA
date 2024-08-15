import { Card, Grid } from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { authApi } from 'src/@core/apis/auth'
import FormCtrl from 'src/@core/components/form-ctrl'
import { useAuth } from 'src/hooks/useAuth'
import ChangePassword from 'src/views/profile/ChangePassword'
import ProfileEdit from 'src/views/profile/ProfileEdit'

const Profile = () => {
  const router = useRouter()
  const auth = useAuth()
  const [userProfile, setUserProfile] = useState('')
  const [userType, setUserType] = useState({ user: {} })

  useEffect(() => {
    const fetchUserDataLogin = async () => {
      const response = await authApi.refreshToken()
      if (response.status === 200) {
        setUserType(response.data)
      }
      console.log(response.data)
    }

    fetchUserDataLogin()
  }, [])

  return (
    <Grid container sx={{ padding: 0 }}>
      <Grid item xs={6} sx={{ pr: 5 }}>
        <Card sx={{ p: 4 }}>
          {/* {userType.user && <ProfileEdit userProfile={userType.user} />} */}
          <FormCtrl query={{ page: router.query.page, mode: 'edit', id: auth.user.id }} />
        </Card>
      </Grid>
      <Grid item xs={6}>
        <Card>{userType && <ChangePassword userProfile={userType} />}</Card>
      </Grid>
    </Grid>
  )
}

export default Profile
