import { Icon } from '@iconify/react'
import { Button, Dialog, DialogContent, Grid } from '@mui/material'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { adminApi } from 'src/@core/apis/admin'
import { pageApi } from 'src/@core/apis/page'
import FormSchema from 'src/@core/schemas/FormSchema'
import { checkHideExpression, getFieldReferValue, getPage, parseQueryData, replaceAll } from 'src/@core/utils/page'
import { useAuth } from 'src/hooks/useAuth'
import { usePopup } from 'src/hooks/usePopup'
import List from 'src/pages/list'
import { decode } from 'jsonwebtoken'

const FormCtrl = props => {
  const { user, meta, setMeta } = useAuth()
  const { setMessage } = usePopup()
  const router = useRouter()
  const { t } = useTranslation()

  const [formRef, setFormRef] = useState(null)
  const [query, setQuery] = useState(props.query)
  const [data, setData] = useState(null)
  const [pageInfo, setPageInfo] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [submitted, setSubmitted] = useState(false)
  const [mode, setMode] = useState(null)
  const [isShowModal, setIsShowModal] = useState(false)
  const [modalQuery, setModalQuery] = useState(null)
  const [CurrentModal, setCurrentModal] = useState(null)

  useEffect(() => {
    if (meta?.pages?.length && router.query) {
      loadData()
    }
  }, [meta?.pages?.length, router.query])

  const loadData = async params => {
    if (!params) params = props

    const userData = user || decode(meta.confs.PUBLIC_USER_TOKEN.replace('bearer ', '')).user

    let pageInfo = getPage(userData, meta, params.query.page || router.query.page)

    if (!pageInfo) {
      setLoading(false)
      setError(t('message.notFound', { value: t('common.page') }))

      return
    }

    if (error) setError(null)
    setPageInfo(pageInfo)
    setMode(params.query.mode)

    if (params.query.mode === 'edit') {
      if (!params.query.id) return setError('Không có thông tin để tải dữ liệu')

      const { data: rs } = await pageApi.callPageApi(
        pageInfo,
        pageInfo.read,
        Object.assign(params.query, { queryInput: JSON.stringify({ id: params.query.id }) })
      )

      if (!rs.data[0]) {
        return toast('Nội dung truy cập không khả dụng!')
      }
      let data = rs.data[0]
      let embed = parseQueryData(params.query.embed)
      if (embed) {
        Object.assign(data, embed)
      }
      setData(data)
    } else {
      let data = {}
      pageInfo.schema.map(i => {
        data[i.field] = null
      })

      let embed = parseQueryData(props.query.embed)
      if (embed) {
        Object.assign(data, embed)
      }

      setData(data)
    }
  }

  const onButtonClick = async (btnInfo, currentData) => {
    if (!btnInfo) {
      for (let i = 0; i < pageInfo.buttons.length; i++) {
        if (pageInfo.buttons[i].mode === query.mode) {
          btnInfo = pageInfo.buttons[i]
          break
        }
      }
    }

    const thatData = data

    if (btnInfo) {
      try {
        if (btnInfo.type === 'submit' && btnInfo.action === 'api') {
          setSubmitted(() => true)

          const error = checkError(pageInfo.schema, thatData)
          if (error.stt > 0)
            throw Error(error.message || `Invalid data, Check field ${pageInfo.schema[error].name} please!`)
        }

        let data = Object.assign({}, currentData)
        if (btnInfo.confirm) {
          let confirmText = btnInfo.confirm
          for (let f in data) {
            confirmText = replaceAll(confirmText, '#' + f + '#', data[f])
          }

          let rs = window.confirm(confirmText)
          if (!rs) return
        }
        if (query.embed && btnInfo.embedUrl) {
          let embed = parseQueryData(query.embed)
          if (embed) {
            data = Object.assign({}, data, JSON.parse(query.embed))
          }
        }

        for (let index = 0; index < pageInfo.schema.length; index++) {
          const schema = pageInfo.schema[index]
          if (schema.type === 'string' && !data[schema.field]) {
            data[schema.field] = ''
          }
          if (schema.type === 'boolean' && data[schema.field] === null) {
            data[schema.field] = undefined
          }
          if (schema.type === 'number' && (data[schema.field] === null || data[schema.field] === undefined)) {
            data[schema.field] = undefined
            if (schema.widget === 'SingleModel') {
              data[schema.field] = +schema.default || 0
            }
            if (schema.widget === 'ArrayModel') {
              data[schema.field] = []
            }
          }
        }
        let submitData = Object.assign({}, data)

        if (btnInfo.apiData) {
          try {
            let tmpApiData = JSON.parse(btnInfo.apiData)
            for (const key in tmpApiData) {
              if (tmpApiData.hasOwnProperty(key)) {
                const e = tmpApiData[key]
                submitData[key] = getFieldReferValue(e, data)
              }
            }
          } catch (error) {
            console.error(error)

            return toast.error('Đã có lỗi xảy ra, xin vui lòng liên hệ đội phát triển để kiểm tra lại')
          }
        }

        switch (btnInfo.action) {
          case 'api':
            setLoading(true)
            let { data: response } = await pageApi.callPageApi(pageInfo, btnInfo.api, submitData)
            if (response.open_url) {
              window.open(response.open_url, response.target || '_self', 'noreferrer')
              setLoading(false)
              if (response.target !== '_blank') {
                return
              }
            } else {
              setLoading(false)
              setMessage(response.message || 'Success')
              if (props.fetchData) props.fetchData()
            }

            if (btnInfo.backOnDone) {
              if (btnInfo.backOnDoneHref) {
                window.location.href = btnInfo.backOnDoneHref

                return
              }

              props.openType !== 'modal' ? router.back() : props.closeModal()

              return
            }

            if (pageInfo?.id === 2) {
              await getMeta()
            }

            await loadData()
            props?.closeModal && props.closeModal()
            break
          case 'report':
            setLoading(true)
            await pageApi.report(pageInfo, btnInfo.api, submitData, btnInfo.reportName || 'report')
            setLoading(false)
            break
          case 'formModal':
            let raw = btnInfo.modalQuery
            for (let i in submitData) {
              raw = replaceAll(raw, '#' + i + '#', submitData[i])
            }
            let query = JSON.parse(raw)
            if (!query.modalType) query.modalType = 'form'
            let _currentModal_form = FormCtrl
            switch (query.modalType) {
              case 'form':
              default:
                _currentModal_form = FormCtrl
                break
            }
            setIsShowModal(true)
            setModalQuery(query)
            setCurrentModal(() => _currentModal_form)
            break
          case 'listModal':
            let raw1 = btnInfo.modalQuery
            for (let i in data) {
              raw1 = replaceAll(raw1, '#' + i + '#', data[i])
            }
            let query1 = JSON.parse(raw1)
            const _currentModal = List
            setIsShowModal(true)
            setModalQuery(query1)
            setCurrentModal(() => _currentModal)
            break

          default:
            break
        }
      } catch (err) {
        toast.error(err?.message)
      }
    } else {
      toast('Không có nút bấm')
    }
  }

  const getMeta = async () => {
    try {
      const { data, status } = await adminApi.getMeta()

      if (status === 200) {
        data.pages.map(page => {
          if (!Array.isArray(page.buttons)) page.buttons = []
          for (var i in page.schema) {
            page.schema[i].pageId = page.id
          }

          return null
        })
        setMeta(data)
        window.localStorage.setItem('meta', JSON.stringify(data))
      }
    } catch (err) {
      toast.error(err?.message || 'Failed to get meta')
    }
  }

  const checkError = (schema = [], data) => {
    for (let i = 0; i < schema.length; i++) {
      let tmpSchema = JSON.parse(JSON.stringify(schema[i]))
      if (schema[i].hideExpression && checkHideExpression(schema[i].hideExpression, data)) {
        //Bị ẩn không check error
        continue
      }
      if (
        tmpSchema.required ||
        (tmpSchema.requiredExpression && checkHideExpression(tmpSchema.requiredExpression, data))
      ) {
        tmpSchema.required = true
      }
      if (isInvalid(tmpSchema, data[tmpSchema.field])) {
        return { stt: i + 1, message: `Missing parameter for field '${tmpSchema.name}'` }
      }
      if (isInvalidRegex(tmpSchema, data[tmpSchema.field])) {
        return {
          stt: i + 1,
          message:
            `${tmpSchema.name} ${tmpSchema.errorOnRegexFail}` || `Data for field '${tmpSchema.name}' is invalid format!`
        }
      }
      if (schema[i].type === 'number') {
        if (tmpSchema.min && +tmpSchema.min > (+data[tmpSchema.field] || 0)) {
          return { stt: i + 1, message: `Data for field '${tmpSchema.name}' must not lower than ${tmpSchema.min}` }
        }
        if (tmpSchema.max && +tmpSchema.max < (+data[tmpSchema.field] || 0)) {
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
  }

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

  const setRef = useCallback(ref => {
    setFormRef(ref)
  }, [])

  if (!data && loading) return <div>Loading...</div>
  if (error) return <p className='text-danger'>{error}</p>
  if (!pageInfo) return null

  return (
    <Grid>
      <Grid></Grid>
      <Grid>
        <div>
          <div className='pull-left'>
            <h3 className='mb-0'>{query.name ? query.name : pageInfo.name}</h3>
          </div>
          <div className='pull-right'>
            {pageInfo.buttons.map((item, index) => {
              if (item.showOnTop && mode === item.mode && checkHideExpression(item.hideExpression, data, user)) {
                let url = ''
                let btnClass = `btn-white-space btn-${item.outline ? 'outline-' : ''}${item.color}`
                switch (item.action) {
                  case 'url':
                    url = item.url.replace('$', data)
                    for (let i in data) {
                      url = replaceAll(url, '#' + i + '#', data[i])
                    }
                    for (let i in query) {
                      url = replaceAll(url, '@' + i + '@', query[i])
                    }

                    return (
                      <a key={index} href={url} className={`btn ${btnClass} mr-1`} target={item.target || '_self'}>
                        <i className={item.icon} /> {item.title}
                      </a>
                    )
                  case 'api':
                  case 'formModal':
                  case 'report':
                    return (
                      <Button
                        key={index}
                        className={`mr-1 btn-white-space`}
                        outline={item.outline || false}
                        onClick={() => {
                          console.log('click report')
                        }}
                      >
                        <i className={item.icon} /> {item.title}
                      </Button>
                    )
                  default:
                    return null
                }
              }

              return null
            })}
          </div>
        </div>
        <div>
          <FormSchema
            setRef={setRef}
            schema={pageInfo.schema}
            mode={mode}
            data={data}
            onChange={e => {
              setData(e)
              setSubmitted(false)
            }}
            submitted={submitted}
            onSubmit={e => console.log(e)}
          >
            <div style={{ display: 'flex', gap: 4, justifyContent: 'center', marginTop: '1rem' }}>
              {pageInfo.buttons.map((item, index) => {
                if (!item.showOnTop && mode === item.mode && !checkHideExpression(item.hideExpression, data, user)) {
                  let url = ''
                  var i = 0
                  let btnClass = `btn-white-space btn-${item.outline ? 'outline-' : ''}${item.color}`
                  switch (item.action) {
                    case 'url':
                      url = item.url.replace('$', data)
                      for (i in data) {
                        url = replaceAll(url, '#' + i + '#', data[i])
                      }
                      for (i in query) {
                        url = replaceAll(url, '@' + i + '@', props.query[i])
                      }

                      return (
                        <a key={index} href={url} className={`btn ${btnClass} mr-1`} target={item.target || '_self'}>
                          <i className={item.icon} /> {item.title}
                        </a>
                      )
                    case 'api':
                    case 'formModal':
                    case 'report':
                      return (
                        <Button
                          key={index}
                          variant={item.outline ? 'outlined' : 'contained'}
                          className='mr-1 btn-white-space'
                          color={item?.color || 'primary'}
                          onClick={() => {
                            onButtonClick(item, data)
                          }}
                        >
                          <Icon className={item.icon} /> {item.title}
                        </Button>
                      )
                    default:
                      return null
                  }
                }

                return null
              })}
            </div>
          </FormSchema>
        </div>
      </Grid>
    </Grid>
  )
}

export default FormCtrl
