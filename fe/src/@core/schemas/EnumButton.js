import { Button } from '@mui/material'
import { useEffect, useState } from 'react'

const EnumButton = props => {
  const [state, setState] = useState({
    schema: props.schema,
    value: props.value
  })

  return (
    <>
      {props.schema.items.map(item => (
        <Button
          type='button'
          variant='contained'
          sx={{
            marginRight: props.schema.marginRight ? '5px' : 0,
            whiteSpace: 'normal',
            marginBottom: '5px',
            width: `${props.schema.EnumButtonWidth || 25}%`
          }}
          key={item.key}
          disabled={props.disabled}
          color={item.value == state.value ? 'primary' : 'secondary'}
          onClick={() => {
            let val = item.value
            setState(prev => ({ ...prev, value: val }))
            if (props.onChange) {
              props.onChange(val)
            }
          }}
        >
          {item.key}
        </Button>
      ))}
    </>
  )
}

export default EnumButton
