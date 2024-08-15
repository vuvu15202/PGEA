import { useEffect, useRef, useState } from 'react'

import Widgets from './../schemas/Widgets'
import { FormGroup, Grid } from '@mui/material'

const Base = props => {
  const [firstLoad, setFirstLoad] = useState(true)
  const formRef = useRef(null)

  const checkError = () => {
    if (formRef.current) {
      return formRef.current.checkError()
    }

    return undefined
  }

  const isInvalid = () => {
    if (
      (firstLoad === false || props.mode === 'edit') &&
      props.schema.required &&
      (props.value === null ||
        props.value === undefined ||
        props.value === '' ||
        (Array.isArray(props.value) && !props.value.length))
    ) {
      if (props.schema.widget === 'ImageSelectAble') {
        return ' phải chọn ít nhất 1 ảnh'
      }

      return ' không được để trống'
    }

    if (props.schema.type === 'number' && (firstLoad === false || props.mode === 'edit')) {
      if (props.schema.min && +props.schema.min > (+props.data[props.schema.field] || 0)) {
        return ` không được nhỏ hơn ${(+props.schema.min || 0).toLocaleString()}`
      }
      if (props.schema.max && +props.schema.max < (+props.data[props.schema.field] || 0)) {
        return ` không được lớn hơn ${(+props.schema.max || 0).toLocaleString()}`
      }
    }

    if (
      (firstLoad === false || props.mode === 'edit') &&
      props.schema.regex &&
      props.value !== null &&
      props.value !== undefined
    ) {
      let str = props.schema.regex
      let index = str.lastIndexOf(' ')
      if (index === -1) {
        index = str.length
      }

      let left = str.substr(0, index),
        right = str.substr(index, str.length)
      let reg = new RegExp(left, right)
      if (Array.isArray(props.value)) {
        for (let i = 0; i < props.value.length; i++) {
          const e = props.value[i]
          if (!reg.test(e)) {
            return props.schema.errorOnRegexFail || ' không đúng định dạng'
          }
        }
      } else {
        if (!reg.test(props.value)) {
          return props.schema.errorOnRegexFail || ' không đúng định dạng'
        }
      }
    }

    if ((firstLoad === false || props.mode === 'edit') && formRef.current && formRef.current.isInvalid) {
      formRef.current.isInvalid()
    }
  }

  const error = () => {
    let rs = isInvalid()
    if (rs) {
      return (
        <p className='text-danger'>
          <b>
            {props.schema.name} {rs}!
          </b>
        </p>
      )
    }
  }

  useEffect(() => {
    if (props.submitted && firstLoad === true) {
      setFirstLoad(false)
    }
  }, [props.submitted])

  let Widget = Widgets[props.schema.widget]
  if (props.schema.widget === 'Text' && props.schema.isArrayInput) {
    Widget = Widgets.ArrayInput
  }
  if (!Widget) {
    return <p>Không tồn tại widget {props.schema.widget}</p>
  }

  let value = props.value
  if ((value === undefined || value === null) && props.schema.default) {
    value = props.schema.default
    if (props.schema.widget === 'JSONViewer') {
      try {
        value = JSON.parse(props.schema.default)
      } catch (err) {}
    }
    if (props.onChange) {
      props.onChange(value)
    }
  }

  if (props.schema.type === 'custom_form_json' || props.schema.type === 'json') {
    return (
      <FormGroup row>
        <Grid>
          <Widget
            ref={formRef}
            onChange={props.onChange}
            submitted={props.submitted || false}
            data={props.data || {}}
            value={value}
            schema={props.schema}
            invalid={isInvalid() && !firstLoad}
            disabled={!!props.schema.disabled || false}
          />
        </Grid>
      </FormGroup>
    )
  }

  return (
    <FormGroup row sx={{ mt: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <label>
            <b>
              {props.schema.name} {props.schema.required ? '(*)' : ''}
            </b>
          </label>
        </Grid>
        <Grid item xs={9}>
          <Widget
            onChange={props.onChange}
            submitted={props.submitted || false}
            data={props.data || {}}
            value={value}
            schema={props.schema}
            invalid={isInvalid() && !firstLoad}
            disabled={!!props.schema.disabled || false}
          />
          {error()}
        </Grid>
      </Grid>
    </FormGroup>
  )
}

export default Base
