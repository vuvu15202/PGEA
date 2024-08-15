import { useEffect, useState } from 'react'
import { authApi } from '../apis/auth'
import { IconButton, InputAdornment } from '@mui/material'
import { Box } from '@mui/system'
import CustomTextField from '../components/mui/text-field'
import { Icon } from '@iconify/react'

const Captcha = props => {
  const [state, setState] = useState({
    captchaText: '',
    captchaId: '',
    captcha: null
  })

  useEffect(() => {
    loadCaptcha()
  }, [])

  const loadCaptcha = async () => {
    const { data } = await authApi.getCapcha()

    setState(prev => ({ ...prev, captchaId: data.id, captcha: data.data }))
  }

  const onChange = e => {
    const value = e.target.value

    if (state.captchaId && value && props.onChange) {
      console.log(`${state.captchaId}|${value}`);

      props.onChange(`${state.captchaId}|${value}`)
    }
  }

  if (!state.captcha) return <div>Loading...</div>

  return (
    <div>
      <Box sx={{ mt: 4 }}>
        <div
          sx={{ height: '50px' }}
          dangerouslySetInnerHTML={{
            __html: state.captcha
          }}
        ></div>
        <CustomTextField
          fullWidth
          label='Capcha'
          onChange={onChange}
          placeholder='xxxx'
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton edge='end' onClick={() => loadCaptcha()}>
                  <Icon fontSize='1.25rem' icon={'tabler:refresh'} />
                </IconButton>
              </InputAdornment>
            )
          }}
        />
      </Box>
    </div>
  )
}

export default Captcha
