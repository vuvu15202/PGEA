// ** React Imports
import { useEffect, useState } from 'react'

// ** Next Imports
import Link from 'next/link'

// ** MUI Components
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled, useTheme } from '@mui/material/styles'
import InputAdornment from '@mui/material/InputAdornment'
import MuiFormControlLabel from '@mui/material/FormControlLabel'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Imports
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Hooks
import { useAuth } from 'src/hooks/useAuth'
import useBgColor from 'src/@core/hooks/useBgColor'
import { useSettings } from 'src/@core/hooks/useSettings'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrationsV2 from 'src/views/pages/auth/FooterIllustrationsV2'
import { authApi } from 'src/@core/apis/auth'
import toast from 'react-hot-toast'
import authConfig from 'src/configs/auth'
import { useRouter } from 'next/router'

// ** Styled Components
const LoginIllustration = styled('img')(({ theme }) => ({
  zIndex: 2,
  maxHeight: 680,
  marginTop: theme.spacing(12),
  marginBottom: theme.spacing(12),
  [theme.breakpoints.down(1540)]: {
    maxHeight: 550
  },
  [theme.breakpoints.down('lg')]: {
    maxHeight: 500
  }
}))

const RightWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.up('md')]: {
    maxWidth: 450
  },
  [theme.breakpoints.up('lg')]: {
    maxWidth: 600
  },
  [theme.breakpoints.up('xl')]: {
    maxWidth: 750
  }
}))

const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: `${theme.palette.primary.main} !important`
}))

const FormControlLabel = styled(MuiFormControlLabel)(({ theme }) => ({
  '& .MuiFormControlLabel-label': {
    color: theme.palette.text.secondary
  }
}))

const schema = yup.object().shape({
  account: yup.string().required(),
  password: yup.string().required(),
  capchaText: yup.number().required()
})

const defaultValues = {
  password: '',
  account: '',
  capchaText: ''
}

const LoginPage = () => {
  const [rememberMe, setRememberMe] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [capcha, setCapcha] = useState({ id: null, data: null })
  const [feConfigs, setFeConfigs] = useState(null)

  // ** Hooks
  const auth = useAuth()
  const router = useRouter()
  const theme = useTheme()
  const bgColors = useBgColor()
  const { settings } = useSettings()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))

  // ** Vars
  const { skin } = settings

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
    const metaJson = window.localStorage.getItem('meta')
    if (metaJson) {
      const meta = JSON.parse(metaJson)
      setFeConfigs(meta.confs)
    }
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

  const onSubmit = data => {
    const { account, password, capchaText } = data
    auth.login({ account, password, captcha: `${capcha.id}|${capchaText}` }, message => {
      getCapcha()
      toast.error(message)
    })
  }
  const imageSource = skin === 'bordered' ? 'auth-v2-login-illustration-bordered' : 'auth-v2-login-illustration'

  return (
    <Box className='content-right' sx={{ backgroundColor: 'background.paper' }}>
      {!hidden ? (
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            position: 'relative',
            alignItems: 'center',
            borderRadius: '20px',
            justifyContent: 'center',
            backgroundColor: 'customColors.bodyBg',
            margin: theme => theme.spacing(8, 0, 8, 8)
          }}
        >
          <LoginIllustration alt='login-illustration' src={`/images/pages/${imageSource}-${theme.palette.mode}.png`} />
          <FooterIllustrationsV2 />
        </Box>
      ) : null}
      <RightWrapper>
        <Box
          sx={{
            p: [6, 12],
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Box sx={{ width: '100%', maxWidth: 400 }}>
            <svg version='1.1' viewBox='0 0 1968 1968' width='40' height='40' xmlns='http://www.w3.org/2000/svg'>
              <path
                transform='translate(982,277)'
                d='m0 0h23l26 4 20 5 26 10 25 12 22 12 13 8 16 9 15 9 22 13 26 15 14 8 22 13 21 12 29 17 22 13 13 8 48 28 25 14 22 12 17 10 52 30 24 14 24 15 12 9 18 14 12 11 8 7 11 12 11 15 8 14 7 15 5 16 3 14 1 14 1 38v505l-1 33-2 26-4 21-5 15-8 19-10 15-9 12-6 7-12 12-11 9-10 8-15 11-21 13-29 17-24 14-25 14-23 13-27 14-18 10-23 13-54 32-29 17-34 21-25 15-28 17-32 19-19 11-25 14-30 16-25 11-17 5-25 5-12 1h-40l-21-2-20-6-21-9-29-15-26-15-27-16-23-14-16-9-26-14-22-12-15-9-16-10-18-12-16-12-10-9-11-11-9-13-10-17-15-29-7-17-2-6-1-7-1-99-64 16-22 5-28 4-15 1h-46l-17-2-15-6-9-7-13-12-15-16-9-10-7-10-5-13-2-16-1-19-1-465v-73l1-37 3-18 6-21 6-16 8-15 12-16 7-8 9-10 10-9 9-8 12-9 15-11 21-13 28-17 17-10 15-9 18-10 17-10 20-11 53-31 23-13 17-10 20-11 22-13 23-13 56-32 29-17 20-12 19-12 25-14 16-8 19-8 25-8 32-7zm6 148-13 4-19 10-24 14-18 11-29 17-25 14-18 10-24 14-15 9-28 16-27 15-20 11-19 11-95 57-27 16-46 27-26 15-20 12-4 4-2 28-2 75-3 143v283l20-4 37-12 26-8 35-12 4-4 1-5 1-206 1-122 2-18 4-13 12-27 12-23 8-11 8-10 13-13 18-13 20-13 22-14 25-15 25-14 23-13 26-16 16-10 21-12 23-12 15-7 25-10 19-6 24-5 6-1 22-1 17 3 24 6 33 11 27 12 20 10 24 14 20 12 17 10 21 12 23 12 20 11 10 6 21 13 22 14 14 10 10 9 3 1 2 4 8 9 12 19 15 29 9 21 4 15 2 22v144l-2 18-3 11-8 20-11 20-12 17-9 11-14 14-13 10-18 11-16 8-26 10-32 10-47 14-54 17-51 15-55 16-66 19-49 15-36 10-2-9-1-14-1-33v-94l4-3 46-12 78-26 35-10 42-13 28-9 27-8 46-14 44-15 12-6 4-5 1-6 1-25v-103l-5-10-7-9-13-10-15-10-28-17-17-10-21-12-26-14-23-12-22-12-29-14-13-5-14-3-11 2-16 7-19 10-16 10-27 16-15 9-26 15-28 17-45 30-12 9-3 3-1 5-1 34-2 174v236l1 90 1 32 3 14 5 5 16 12 19 12 22 13 14 8 24 14 27 16 19 12 18 10 19 10 23 11 16 3h7l21-7 33-16 25-15 22-13 24-14 25-14 24-14 26-15 18-11 24-14 19-11 28-17 17-10 28-16 36-20 13-8 17-10 15-9 19-11 21-12 19-12 11-9 9-10 4-11 2-10v-37l-1-25v-295l-2-83-1-77-2-39-5-8-8-6-15-9-53-31-91-52-26-15-45-27-21-13-24-14-49-28-27-16-26-15-21-12-18-10-24-14-25-14-15-7-3-1z'
                fill='#2FA77C'
              />
              <path
                transform='translate(594,1215)'
                d='m0 0h10l3 3 3 12 2 11-1 10v20l1 10v16l-1 5-2 23v17l-1 9-3 8-7 6-12 2-16-3-7-2-7-10-2-15-2-11-2-7-1-9v-19l1-8v-9l3-17 4-12h2l2-5 7-10 9-6h2v-2l5-3h3v-2z'
                fill='#1C8964'
              />
              <path
                transform='translate(385,1031)'
                d='m0 0 4 2 1 3 9 1 3 4h2v-6l3-2 3 1-2 3 1 7 3 7-2 5-3 2 1 5v3l4 1 3 1-1 2-3 1 1 3-4 8 9-1h1v6 4l1 4v15l6-1 3-3 1 4h-2l-1 7h5 3v4l-2 2v8l1 2-5 1-1 9-5 6-1 4 1 7-1 3-6 3-4-1-3-2-3 5h-3l2 9-3-1-5-10 3-3h3l-1-8-1-7 1-3-1-11 3-9 3-7 1-7-10-2-4-2v2l-2-1v-8l4-5 1-7 4-4 3 3v2h5l-2-5-7-3-2-7-5 2-5-1-5-5-2-6 7-2 5-4 2-1-4-2-1-3 8-2 4-4h-8l-7 1-3-1-1-5 1-9z'
                fill='#1C8964'
              />
              <path
                transform='translate(544,1244)'
                d='m0 0h2l-2 8h-2l-2 5-5 7-5 3v5l-5 1-1 4-2 11-3 5h-2v8l2 2h2l1 5-4 4h-2v-7l-6-8-1-6 2-9-3-1-1 3h-2l1 3-1 2h2l-1 4-4 4-4 1-5-2-4 4-1-2-4 3-1 3-5 1-1-6 1-5-1-4h2l2-4 3 1-1-6-2 2-3-1-7 3-1-5-3-3-5-2-1-5 1-4-4-5 1-3 7-4 1-5 5 4 6 3 1 3h-4l-2 2-1 3h6v2l6-3 9 2 1-4 3 1 1 2 8-1 6 1 4-2h5v-2h2v-3l7-4 8-6z'
                fill='#1C8964'
              />
              <path
                transform='translate(526,1325)'
                d='m0 0 3 1 1 8 3 1 1 4-1-10 2-3 3 8v4l3 1-1 7-1 5 4 5 4 6 5 3v2l8 2 22 1v1l-18 2h-8l-10-4-16-8-5-5-1-3 1-6-1-6-6 4-3-1 2-8v-3h4l-1-5h5z'
                fill='#1C8964'
              />
              <path
                transform='translate(427,1348)'
                d='m0 0 4 2 5 5 3-1 2 2 5 1 2-4h5v-2l4 1 1-2 3 7h-7l2 1v6l-1 1-7-1-2-1v2l-9 1-10 3-7-1 2-2-6-1-7-2 4-3h7l4 1 1-2 4-2 1-3-4-2-1-3z'
                fill='#1C8964'
              />
              <path
                transform='translate(439,1324)'
                d='m0 0 4 4 2 4 4-1h7l3 3v2h5l2 4h-7l-4 3h-2v2h-4v2l-4-1-1-8 1-2-2-1v-2l-7-1v-6z'
                fill='#1C8964'
              />
              <path transform='translate(421,1196)' d='m0 0h6l2 4v7l3 4v6h-3v6l-4-1-2-2v-12l1-4-3-5z' fill='#1C8964' />
              <path transform='translate(496,1298)' d='m0 0 5 2h6l3 2-2 6-5 2-5 1-2-1-3-7 1-3z' fill='#1C8964' />
              <path
                transform='translate(386,1019)'
                d='m0 0h9v2l-2 2-1 4 3-2 2-3 5 5-2 7-9-2-3-1v-2h2l-1-2-4-1v-4z'
                fill='#1C8964'
              />
              <path transform='translate(483,1348)' d='m0 0h5l7 2-4 4-4 1 1 4-6 2 1-5-2-7z' fill='#1C8964' />
              <path transform='translate(390,1132)' d='m0 0 1 2h3l-1 4 1 4-1 2-4 1-8-5 2-2 5-2z' fill='#1C8964' />
              <path transform='translate(430,1201)' d='m0 0h6l2 4 4 2 2 2-1 3-5 1-6-8v-2h-2z' fill='#1C8964' />
              <path transform='translate(396,1099)' d='m0 0h6l2 3v7l-9-5z' fill='#2FA77C' />
              <path transform='translate(462,1319)' d='m0 0 5 2-2 2 2 1v3l-7 2-3-5 2-2 1-2z' fill='#1C8A64' />
              <path transform='translate(412,1177)' d='m0 0 5 2v6l-6 2-1 2-3-3 4-4z' fill='#1C8964' />
              <path transform='translate(431,1321)' d='m0 0h3l1 4-2 6-3-1-2-3 1-4h2z' fill='#1C8964' />
              <path transform='translate(484,1321)' d='m0 0 4 1-2 5-3 1-2-4z' fill='#1C8964' />
              <path transform='translate(420,1323)' d='m0 0h2l2 2 1 2-1 2h-7l-1-3h3z' fill='#1C8964' />
              <path transform='translate(389,1109)' d='m0 0 3 1 1 4-3 2-4-1 1-5z' fill='#1C8964' />
              <path transform='translate(364,1066)' d='m0 0 1 2 3 1v2l-7 1v-3-2z' fill='#1C8964' />
            </svg>
            <Box sx={{ my: 6 }}>
              <Typography variant='h3' sx={{ mb: 1.5 }}>
                {`Welcome to ${themeConfig.templateName}!`}
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>
                Please sign-in to your account and start the adventure
              </Typography>
            </Box>
            <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
              <Box sx={{ mb: 4 }}>
                <Controller
                  name='account'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <CustomTextField
                      fullWidth
                      autoFocus
                      label='Account'
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      placeholder='admin@vuexy.com'
                      error={Boolean(errors.account)}
                      {...(errors.account && { helperText: errors.account.message })}
                    />
                  )}
                />
              </Box>
              <Box sx={{ mb: 1.5 }}>
                <Controller
                  name='password'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      onBlur={onBlur}
                      label='Password'
                      placeholder='*********'
                      onChange={onChange}
                      id='auth-login-v2-password'
                      error={Boolean(errors.password)}
                      {...(errors.password && { helperText: errors.password.message })}
                      type={showPassword ? 'text' : 'password'}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position='end'>
                            <IconButton
                              edge='end'
                              onMouseDown={e => e.preventDefault()}
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              <Icon fontSize='1.25rem' icon={showPassword ? 'tabler:eye' : 'tabler:eye-off'} />
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                    />
                  )}
                />
              </Box>
              {capcha.id && (
                <Box sx={{ mt: 4 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <div
                      sx={{ height: '50px', mr: 2 }}
                      dangerouslySetInnerHTML={{
                        __html: capcha.data
                      }}
                    ></div>
                    <Controller
                      name='capchaText'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange, onBlur } }) => (
                        <CustomTextField
                          fullWidth
                          value={value}
                          placeholder='Captcha'
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
                  </Box>
                </Box>
              )}

              <Box
                sx={{
                  mb: 1.75,
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <FormControlLabel
                  label='Remember Me'
                  control={<Checkbox checked={rememberMe} onChange={e => setRememberMe(e.target.checked)} />}
                />
                <a
                  style={{
                    textDecoration: 'none',
                    color: `${theme.palette.primary.main} !important`
                  }}
                  href={feConfigs?.FORGOT_PASSWORD_LINK?.replace('#', '') || '#'}
                >
                  Forgot Password?
                </a>
              </Box>
              <Button fullWidth type='submit' variant='contained' sx={{ mb: 4 }}>
                Login
              </Button>
              <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
                <Typography sx={{ color: 'text.secondary', mr: 2 }}>New on our platform?</Typography>
                <a
                  style={{
                    textDecoration: 'none',
                    color: `${theme.palette.primary.main} !important`
                  }}
                  href={feConfigs?.REGISTER_LINK?.replace('#', '') || '#'}
                >
                  Create an account
                </a>
              </Box>
            </form>
          </Box>
        </Box>
      </RightWrapper>
    </Box>
  )
}
LoginPage.getLayout = page => <BlankLayout>{page}</BlankLayout>
LoginPage.guestGuard = true

export default LoginPage
