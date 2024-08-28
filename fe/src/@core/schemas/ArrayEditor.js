import { Button, Grid, MenuItem } from '@mui/material'
import { useState } from 'react'
import CustomTextField from '../components/mui/text-field'
import { useTranslation } from 'react-i18next'

const dataTypes = ['string', 'number']

const ArrayEditor = props => {
  const { t } = useTranslation()

  const [type, setType] = useState(props?.value?.length > 0 ? typeof props.value[0].value : 'string')
  const [data, setData] = useState(props.value || [])

  const fixData = (data, type) => {
    let newData
    if (type === 'number') {
      if (data) {
        newData = data.map(d => {
          return { ...d, value: Number(d.value) || 0 }
        })
      }
    } else {
      if (data) {
        newData = data.map(d => {
          return { ...d, value: d.value + '' }
        })
      }
    }

    setData(() => newData)

    return newData
  }

  const addItem = () => {
    const value = type === 'number' ? 0 : ''
    setData(prev => [...prev, { key: '', value }])
  }

  const removeItem = index => {
    const newData = data.filter((_, i) => i !== index)
    setData(newData)
    if (props.onChange) {
      props.onChange(fixData(newData, type))
    }
  }

  const onItemDataChange = (index, name, val) => {
    const item = data[index]
    item[name] = val
    setData(prev => prev.filter((itemPrev, i) => (i === index ? item : itemPrev)))
    if (props.onChange) {
      props.onChange(fixData(data, type))
    }
  }

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <CustomTextField
            select
            fullWidth
            value={type}
            onChange={e => {
              setType(() => e.target.value)
              if (props.onChange) {
                props.onChange(fixData(data, e.target.value))
              }
            }}
          >
            {dataTypes.map(type => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </CustomTextField>
        </Grid>
        <Grid item xs={4}>
          <Button variant='contained' color='primary' onClick={addItem}>
            {t('common.add')}
          </Button>
        </Grid>
      </Grid>
      {data?.map((item, index) => (
        <Grid sx={{ mt: 2 }} container spacing={2} key={index}>
          <Grid item xs={4}>
            <CustomTextField
              fullWidth
              value={item.key}
              placeholder={'Khóa'}
              onChange={e => {
                onItemDataChange(index, 'key', e.target.value)
              }}
            />
          </Grid>
          <Grid item xs={4}>
            <CustomTextField
              fullWidth
              value={item.value}
              placeholder={'Giá trị'}
              onChange={e => {
                onItemDataChange(index, 'value', e.target.value)
              }}
            />
          </Grid>
          <Grid item xs={4}>
            <Button variant='contained' color='error' onClick={() => removeItem(index)}>
              {t('common.remove')}
            </Button>
          </Grid>
        </Grid>
      ))}
    </div>
  )
}

export default ArrayEditor
