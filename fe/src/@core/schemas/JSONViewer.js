import { useState } from 'react'
import JSONInput from 'react-json-editor-ajrm'

const JSONWidget = props => {
  console.log('PROPS: ', props)

  const [placeholder, setPlaceholder] = useState(
    props.value ? (typeof props.value === 'object' ? props.value : JSON.stringify(props.value) || {}) : {}
  )

  console.log('PLACEHOLDER: ', placeholder)

  return (
    <JSONInput
      theme={'dark_vscode_tribute'}
      width={'100%'}
      height={props?.height || '250px'}
      placeholder={placeholder || {}}
      viewOnly={props?.disabled}
      onChange={e => {
        if (e.error) return
        if (props?.onChange) {
          try {
            props.onChange(JSON.parse(e.jsObject))
          } catch (error) {
            props.onChange(e.jsObject)
          }
        }
      }}
    />
  )
}

export default JSONWidget
