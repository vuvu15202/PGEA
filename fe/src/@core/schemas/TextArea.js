import CustomTextField from '../components/mui/text-field'

const TextArea = props => {
  return (
    <CustomTextField
      fullWidth
      rows={props.schema.numberOfLine || 5}
      multiline
      placeholder={props.schema.placeholder || ''}
      disabled={props.disabled}
      defaultValue={props.value || ''}
      onChange={e => {
        if (props.onChange) {
          props.onChange(e.target.value)
        }
      }}
    />
  )
}

export default TextArea
