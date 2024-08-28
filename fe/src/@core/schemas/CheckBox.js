import { Switch } from '@mui/material'

const Checkbox = props => {
  const onSwitchChange = e => {
    if (props.onChange) {
      props.onChange(e.target.checked)
    }
  }

  return (
    <div>
      <Switch
        color='primary'
        checked={props?.value || false}
        disabled={props?.disabled || false}
        onChange={onSwitchChange}
      />
    </div>
  )
}

export default Checkbox
