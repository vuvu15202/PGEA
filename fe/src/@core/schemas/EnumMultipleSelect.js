import { Button, Checkbox, FormGroup } from '@mui/material'
import { useState } from 'react'

const EnumMultipleSelect = props => {
  const [state, setState] = useState({
    schema: props.schema,
    value: props.value || []
  })

  return (
    <FormGroup row sx={{ flexWrap: 'wrap' }}>
      {props.schema.items.map(item => {
        let checked = false
        for (let i = 0; i < state.value.length; i++) {
          if (state.value[i] == item.value) {
            checked = true
            break
          }
        }

        return (
          <Button
            variant='contained'
            sx={{
              marginRight: props.schema.marginRight ? '5px' : 0,
              width: `${props.schema.EnumButtonWidth || 25}%`,
              marginBottom: '5px'
            }}
            key={item.key}
            color={checked ? 'primary' : 'secondary'}
            onClick={() => {
              checked = !checked
              let newValues = state.value
              if (checked) {
                newValues.push(item.value)
              } else {
                newValues = newValues.filter(v => v != item.value)
              }
              setState(prev => ({ ...prev, value: newValues }))

              if (props.onChange) {
                props.onChange(newValues)
              }
            }}
          >
            <Checkbox disabled checked={checked} />
            {item.key}
          </Button>
        )
      })}
    </FormGroup>
  )
}

export default EnumMultipleSelect
