import { yupResolver } from '@hookform/resolvers/yup'
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  Typography,
  useTheme
} from '@mui/material'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { authApi } from 'src/@core/apis/auth'
import axiosClient from 'src/@core/apis/jwt/jwtService'
import CustomTextField from 'src/@core/components/mui/text-field'
import { API_URL } from 'src/@core/constants/env'
import { useSettings } from 'src/@core/hooks/useSettings'
import { useAuth } from 'src/hooks/useAuth'
import * as yup from 'yup'
import Icon from 'src/@core/components/icon'

const schema = yup.object().shape({
  password: yup.string().required(),
  capchaText: yup.string().required()
})

const defaultValues = {
  password: '',
  newPassword: '',
  retypeNewpassword: '',
  capchaText: '',
  type: 'up'
}

const ChangePassword = ({ userProfile }) => {
  const [accountUser, setAccountUser] = useState('')
  const [loadingForCreate, setLoadingForCreate] = useState(false)
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    if (userProfile && userProfile.user.userType && userProfile.user.userType.name) {
      setAccountUser(userProfile.user.userType.name)
    } else {
      setAccountUser('')
    }
  }, [userProfile])

  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [capcha, setCapcha] = useState({ id: null, data: null })

  // ** Hooks
  const { settings } = useSettings()

  // ** Vars

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  useEffect(() => {
    getCapcha()
  }, [])

  const getCapcha = async () => {
    try {
      const {
        data: { message, id, data },
        status
      } = await authApi.getCapcha()
      if (status === 200) {
        setCapcha({ id, data })
      } else toast.error(message)
    } catch (err) {
      toast.error(err?.message)
    }
  }

  const onSubmit = async data => {
    setLoadingForCreate(true)

    const captchaString = `${capcha.id}|${data.capchaText}`

    const body = {
      account: accountUser,
      capcha: captchaString,
      confirmPassword: data.retypeNewPassword,
      newPassword: data.newPassword,
      oldPassword: data.password,
      type: userProfile.auth.type
    }

    try {
      const response = await axiosClient.post(`${API_URL}/api/auth/change-password`, body, {
        params: {
          page: 16,
          api: 'change-password'
        },
        headers: {
          'Api-Version': 'pageid'
        }
      })
      if (response.status === 200) {
        setNotification('Chỉnh sửa thành công.')
      } else {
        setNotification('Đã xảy ra lỗi khi chỉnh sửa.')
      }
    } catch (err) {
      setNotification('Đã xảy ra lỗi khi chỉnh sửa.')
    } finally {
      setLoadingForCreate(false)
    }
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <Card>
        <CardHeader title='Thay đổi mật khẩu' />
        <Divider sx={{ my: 0.5 }} />
        <CardContent>
          <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
            <Grid container>
              <Grid item xs={4}>
                <Typography variant='body1' sx={{ fontWeight: 'bold', mt: 3 }}>
                  Tài khoản:
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <CustomTextField
                  autoFocus
                  margin='dense'
                  id='account'
                  type='text'
                  fullWidth
                  variant='standard'
                  value={accountUser}
                  onChange={e => setAccountUser(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  disabled
                />
              </Grid>
            </Grid>
            <Grid container sx={{ mt: 2 }}>
              <Grid item xs={4}>
                <Typography variant='body1' sx={{ fontWeight: 'bold', mt: 3 }}>
                  Mật khẩu cũ:
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Controller
                  name='password'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      onBlur={onBlur}
                      placeholder='*********'
                      onChange={onChange}
                      id='auth-login-v2-password'
                      error={Boolean(errors.password)}
                      {...(errors.password && { helperText: errors.password.message })}
                      type={showOldPassword ? 'text' : 'password'}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position='end'>
                            <IconButton
                              edge='end'
                              onMouseDown={e => e.preventDefault()}
                              onClick={() => setShowOldPassword(!showOldPassword)}
                            >
                              <Icon fontSize='1.25rem' icon={showOldPassword ? 'tabler:eye' : 'tabler:eye-off'} />
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                    />
                  )}
                />
              </Grid>
            </Grid>
            <Grid container sx={{ mt: 2 }}>
              <Grid item xs={4}>
                <Typography variant='body1' sx={{ fontWeight: 'bold', mt: 3 }}>
                  Mật khẩu mới:
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Controller
                  name='newPassword'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      onBlur={onBlur}
                      placeholder='*********'
                      onChange={onChange}
                      id='auth-login-v2-password'
                      error={Boolean(errors.password)}
                      {...(errors.password && { helperText: errors.password.message })}
                      type={showNewPassword ? 'text' : 'password'}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position='end'>
                            <IconButton
                              edge='end'
                              onMouseDown={e => e.preventDefault()}
                              onClick={() => setShowNewPassword(!showNewPassword)}
                            >
                              <Icon fontSize='1.25rem' icon={showNewPassword ? 'tabler:eye' : 'tabler:eye-off'} />
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                    />
                  )}
                />
              </Grid>
            </Grid>
            <Grid container sx={{ mt: 2 }}>
              <Grid item xs={4}>
                <Typography variant='body1' sx={{ fontWeight: 'bold', mt: 3 }}>
                  Nhập lại mật khẩu mới:
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Controller
                  name='retypeNewPassword'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      onBlur={onBlur}
                      placeholder='*********'
                      onChange={onChange}
                      id='auth-login-v2-password'
                      error={Boolean(errors.password)}
                      {...(errors.password && { helperText: errors.password.message })}
                      type={showConfirmPassword ? 'text' : 'password'}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position='end'>
                            <IconButton
                              edge='end'
                              onMouseDown={e => e.preventDefault()}
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                              <Icon fontSize='1.25rem' icon={showConfirmPassword ? 'tabler:eye' : 'tabler:eye-off'} />
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                    />
                  )}
                />
              </Grid>
            </Grid>

            {capcha.id && (
              <Grid container sx={{ mt: 2 }}>
                <Grid item xs={4}>
                  <Typography variant='body1' sx={{ fontWeight: 'bold', mt: 3 }}>
                    Nhập Captcha:
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <div
                    sx={{ height: '50px' }}
                    dangerouslySetInnerHTML={{
                      __html: capcha.data
                    }}
                  ></div>
                </Grid>
                <Grid item xs={4}>
                  <Controller
                    name='capchaText'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <CustomTextField
                        fullWidth
                        value={value}
                        placeholder='xxxx'
                        onBlur={onBlur}
                        onChange={onChange}
                        error={Boolean(errors.capchaText)}
                        {...(errors.capchaText && { helperText: errors.capchaText.message })}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position='end'>
                              <IconButton edge='end' onClick={() => getCapcha()}>
                                <Icon fontSize='1.25rem' icon={'tabler:refresh'} />
                              </IconButton>
                            </InputAdornment>
                          )
                        }}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            )}
            <Grid container sx={{ mt: 8}} justifyContent='center'>
              <Button type='submit' variant='contained'>
                Change Password
              </Button>
            </Grid>
          </form>
        </CardContent>
      </Card>
      {notification && (
        <div
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            backgroundColor: '#4CAF50',
            color: 'white',
            padding: '15px',
            borderRadius: '5px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            zIndex: '9999',
            animation: 'slideIn 0.5s forwards, slideOut 0.5s 4.5s forwards'
          }}
        >
          {notification}
        </div>
      )}
    </Paper>
  )
}

export default ChangePassword
