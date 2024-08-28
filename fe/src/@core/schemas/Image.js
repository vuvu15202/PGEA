import { useState } from 'react'

const Image = props => {
  const [state, setState] = useState({
    schema: props.schema,
    width: props.schema.imageWidth,
    height: props.schema.imageHeight
  })

  const uploadFile = async file => {
    let formData = new FormData()
    if (!file.type.toLowerCase().startsWith('image')) {
      return window.alert('File not allow!')
    }
    formData.append('images', file)
    let queryInput = {}
    let url = ''
    if (state.width && state.height) {
      queryInput.width = state.width
      queryInput.height = state.height
      queryInput.isToJPG = 1
      url = `/api/file/upload-image?${qs.stringify(queryInput)}`
    } else {
      queryInput.isToJPG = 1
      url = `/api/file/upload-image`
    }

    // let rs = await request.upload(url, formData);
    console.log('call api upload')

    if (props.onChange) {
      props.onChange(rs.created[0].url)
    }
  }

  return (
    <div>
      {/* hiển thị ảnh thumbnail */}
      {props.value ? (
        <img src={props.value} className='file-picker-thumbnail' alt={'Hình ảnh'} />
      ) :
      null}
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

export default Image
