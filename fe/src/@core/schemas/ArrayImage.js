import { useState } from 'react'
import * as _ from 'lodash'
import Image from './Image'
import { Button } from '@mui/material'
import { Icon } from '@iconify/react'

const ArrayImage = props => {
  const [state, setState] = useState({
    schema: props.schema,
    width: props.schema.imageWidth,
    height: props.schema.imageHeight
  })

  const addImage = () => {
    if (props.onAddClick) {
      return props.onAddClick()
    }
    let data = _.clone(props.value) || []
    data.push('')
    if (props.onChange) {
      props.onChange(data)
    }
  }

  const removeImage = () => {
    let data = _.clone(props.value) || []
    data.splice(index, 1)
    if (props.onChange) {
      props.onChange(data)
    }
  }

  return (
    <div>
      {(props.value || []).map((item, index) => (
        <div className='single-image-container' key={index}>
          <Image
            value={item}
            alt={'anh'}
            key={index}
            schema={this.props.schema}
            onChange={e => {
              let data = _.clone(this.props.value) || []
              data[index] = e
              if (this.props.onChange) {
                this.props.onChange(data)
              }
            }}
          />
          <Button
            color='error'
            onClick={() => {
              removeImage(index)
            }}
          >
            <Icon icon={'tabler:trash'} />
          </Button>
        </div>
      ))}
      <Button
        color='primary'
        onClick={() => {
          addImage()
        }}
      >
        <Icon icon={'tabler:plus'} />
      </Button>
    </div>
  )
}

export default ArrayImage
