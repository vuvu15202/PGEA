const { MenuItem } = require('@mui/material')
const { default: CustomTextField } = require('../components/mui/text-field')

const Enum = props => {
  return (
    <CustomTextField
      select
      defaultValue={props.value}
      disabled={props.disabled}
      fullWidth
      onChange={e => {
        let val = e.target.value
        if (val === '') val = null
        if (props.onChange) {
          props.onChange(val)
        }
      }}
    >
      {props.schema.items.map((item, index) => (
        <MenuItem key={index} value={item.value}>
          {item.key}
        </MenuItem>
      ))}
    </CustomTextField>
  )
}

export default Enum
