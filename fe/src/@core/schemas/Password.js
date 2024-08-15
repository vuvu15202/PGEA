const { default: CustomTextField } = require('../components/mui/text-field')

const Password = props => {
  return (
    <CustomTextField
      fullWidth
      type='password'
      disabled={props.disabled}
      invalid={!!props.invalid || false}
      placeholder={props.schema.placeholder || ''}
      autoComplete='off'
      value={props.value || ''}
      onChange={evt => {
        if (props.onChange) {
          props.onChange(evt.target.value)
        }
      }}
    />
  )
}

export default Password
