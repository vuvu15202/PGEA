import { useCallback, useEffect, useState } from 'react'
import { checkHideExpression } from '../utils/page'
import Base from './Base'

const FormSchema = props => {
  const [formRef, setFormRef] = useState({})

  const checkError = useCallback(() => {
    for (let i = 0; i < props.schema.length; i++) {
      let tmpSchema = JSON.parse(JSON.stringify(props.schema[i]))
      if (props.schema[i].hideExpression && checkHideExpression(props.schema[i].hideExpression, props.data)) {
        //Bị ẩn không check error
        continue
      }
      if (
        tmpSchema.required ||
        (tmpSchema.requiredExpression && helper.checkHideExpression(tmpSchema.requiredExpression, props.data))
      ) {
        tmpSchema.required = true
      }
      if (isInvalid(tmpSchema, props.data[tmpSchema.field])) {
        return { stt: i + 1, message: `Missing parameter for field '${tmpSchema.name}'` }
      }
      if (isInvalidRegex(tmpSchema, props.data[tmpSchema.field])) {
        return {
          stt: i + 1,
          message:
            `${tmpSchema.name} ${tmpSchema.errorOnRegexFail}` || `Data for field '${tmpSchema.name}' is invalid format!`
        }
      }
      if (props.schema[i].type === 'number') {
        if (tmpSchema.min && +tmpSchema.min > (+props.data[tmpSchema.field] || 0)) {
          return { stt: i + 1, message: `Data for field '${tmpSchema.name}' must not lower than ${tmpSchema.min}` }
        }
        if (tmpSchema.max && +tmpSchema.max < (+props.data[tmpSchema.field] || 0)) {
          return { stt: i + 1, message: `Data for field '${tmpSchema.name}' must not greater than ${tmpSchema.max}` }
        }
      }
      if (formRef[tmpSchema.field]) {
        let error = formRef[tmpSchema.field].checkError()
        if (error) {
          return { stt: i + 1, message: error }
        }
      }
    }

    return { stt: 0 }
  }, [formRef])

  useEffect(() => {
    if (props.setRef) {
      props.setRef({ checkError })
    }
  }, [props.setRef, checkError])

  const isInvalid = (schema, value) => {
    if (value === 0) {
      return false
    }
    if (schema.required && !value) return true
    if (Array.isArray(value)) {
      if (schema.required && !value.length) return true
    }

    return false
  }

  const isInvalidRegex = (schema, value) => {
    if (schema.regex && schema.type === 'string' && value !== null && value !== undefined) {
      let str = schema.regex
      let index = str.lastIndexOf(' ')
      if (index === -1) {
        index = str.length
      }

      let left = str.substr(0, index),
        right = str.substr(index, str.length)
      let reg = new RegExp(left, right)
      if (Array.isArray(value)) {
        for (let i = 0; i < value.length; i++) {
          const ele = value[i]
          if (!reg.test(ele)) {
            return true
          }
        }

        return false
      }

      return !reg.test(value)
    }

    return false
  }

  if (!props.schema) return <p>Chưa định nghĩa schema</p>
  props.schema.map(s => {
    if (props.data[s.field] === undefined && s.default) props.data[s.field] = s.default

    return null
  })

  return (
    <div
      autoComplete='off'
      onSubmit={evt => {
        evt.preventDefault()
        const error = checkError()

        if (error) return console.log(error)

        if (props.onSubmit) {
          props.onSubmit()
        }
      }}
    >
      {props.schema.map((comp, index) => {
        if (comp.hideExpression && checkHideExpression(comp.hideExpression, props.data)) {
          let dt = Object.assign({}, props.data)
          if (dt[comp.field] !== undefined) {
            delete dt[comp.field]
          }

          return null
        }
        if (comp.disabledExpression && checkHideExpression(comp.disabledExpression, props.data)) {
          comp.disabled = true
        }
        if (comp.requiredExpression && checkHideExpression(comp.requiredExpression, props.data)) {
          comp.required = true
        }

        return (
          <Base
            ref={ref => {
              formRef[comp.field] = ref
              setFormRef(prev => ({ ...prev, [comp.field]: ref }))
            }}
            key={index}
            schema={comp}
            mode={props.mode}
            onChange={e => {
              let dt = Object.assign({}, props.data)
              dt[comp.field] = e
              if (props.onChange) {
                props.onChange(dt)
              }
            }}
            submitted={props.submitted || false}
            value={props.data[comp.field]}
            data={props.data}
          />
        )
      })}
      {props.children}
    </div>
  )
}

export default FormSchema
