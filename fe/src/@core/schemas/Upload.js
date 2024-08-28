import { Input } from '@mui/material'
import { useState } from 'react'
import { authApi } from '../apis/auth'

const Upload = props => {
  const [state, setState] = useState({
    width: props.width,
    height: props.height
  })

  const uploadFile = async file => {
    try {
      let formData = new FormData()
      formData.append('files', file)
      const { data } = await authApi.upload(formData)
      if (props.onChange) {
        props.onChange(data.created[0].id)
      }
    } catch (err) {
      window.alert(err.message)
    }
  }

  return (
    <div>
      <input
        type='file'
        disabled={props.disabled}
        onChange={evt => {
          uploadFile(evt.target.files[0])
        }}
      />
    </div>
  )
}

export default Upload
