import { useEffect, useState } from 'react'
import { useAuth } from 'src/hooks/useAuth'
import { getPageSync } from '../utils/page'
import FormSchema from './FormSchema'

const FormViewer = props => {
  const { meta, user } = useAuth()
  const [state, setState] = useState(null)

  useEffect(() => {
    const pageInfo = getPageSync(user, meta, props.schema.page)
    if (pageInfo)
      setState({
        value: props.value || {},
        data: props.data || {},
        pageInfo,
        key: props.schema.field,
        submitted: props.submitted
      })
  }, [meta, props.schema.page, user])

  return state ? (
    <FormSchema
      setRef={ref => {
        // console.log(ref)
      }}
      schema={state.pageInfo.schema}
      mode={'create'}
      data={state.value || {}}
      onChange={value => {
        if (props.onChange) {
          props.onChange(value)
        }
      }}
      submitted={props.submitted || false}
    ></FormSchema>
  ) : (
    <div>No have state FormViewer</div>
  )
}

export default FormViewer
