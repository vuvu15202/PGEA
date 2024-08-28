import { useEffect, useState } from 'react'
import NumberFormat from 'react-number-format'

import CustomTextField from '../components/mui/text-field'
import { convertNumberToText } from '../utils/page'

const Text = props => {
  const [type, setType] = useState(props.schema.type === 'number' ? 'number': 'text')
  const [value, setValue] = useState('')

  useEffect(() => {
    if (props.schema.hideValue) setType('password')
    let propsValue = type === 'number' ? props.value : props.value || ''
    if (propsValue === null || propsValue === undefined) {
      propsValue = ''
    }

    setValue(propsValue)
  }, [props.schema.hideValue, props.value, type])

  if (!props) return <div>No data</div>

  // if (type === 'number') {
  //   return (
  //     <>
  //       <NumberFormat
  //         value={value || 0}
  //         customInput={CustomTextField}
  //         thousandSeparator={true}
  //         disabled={props.disabled || false}
  //         invalid={!!props.invalid || false}
  //         color={props.invalid ? 'error' : 'secondary'}
  //         onValueChange={values => {
  //           if (props.onChange) {
  //             props.onChange(values.value)
  //           }
  //         }}
  //         placeholder={props.schema.placeholder || 'Input number'}
  //       />
  //       {(props.schema || { enableReadNumber: false }).enableReadNumber ? (
  //         <div className=''>{convertNumberToText(value)}</div>
  //       ) : null}
  //     </>
  //   )
  // }

  return (
    <CustomTextField
      fullWidth
      type={type}
      color={props.invalid ? 'error' : 'primary'}
      disabled={props.disabled}
      placeholder={props.schema.placeholder || ''}
      min={type === 'number' && props.schema.min ? Number(props.schema.min) : undefined}
      max={type === 'number' && props.schema.max ? Number(props.schema.max) : undefined}
      value={value}
      onChange={evt => {
        if (props.onChange) {
          props.onChange(evt.target.value)
        }
      }}
    />
  )
}

export default Text
