// ** Libs
import { useRouter } from 'next/router'
import React, { forwardRef, useCallback, useEffect, useState } from 'react'
import _ from 'lodash'
import {
  Box,
  Button,
  Card,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  Fade,
  FormControlLabel,
  FormGroup,
  Grid,
  Input,
  LinearProgress,
  Link,
  MenuItem,
  Switch,
  Typography
} from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import toast from 'react-hot-toast'
import moment from 'moment'

// ** Utils
import { checkHideExpression, getFieldReferValue, getPage, parseQueryData, replaceAll } from 'src/@core/utils/page'
import { useAuth } from 'src/hooks/useAuth'

// ** Components
import PageHeader from 'src/@core/components/page-header'
import Icon from 'src/@core/components/icon'

// ** APIs
import { pageApi } from 'src/@core/apis/page'
import FormCtrl from 'src/@core/components/form-ctrl'
import { DEFAULT_PAGE_SIZE, PAGINATION_OPTIONS } from 'src/@core/constants/table'
import { timestampTpDDMMYYYY } from 'src/@core/utils/format'
import Widgets from 'src/@core/schemas/Widgets'
import { t } from 'i18next'
import CustomTextField from 'src/@core/components/mui/text-field'
import { DataGridPro } from '@mui/x-data-grid-pro'

const Transition = forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />
})

const List = props => {
  // ** Hooks
  const router = useRouter()
  const { user, meta } = useAuth()

  // ** States
  const [queryList, setQueryList] = useState(props.query || router.query)
  const [keyTable, setKeyTable] = useState(0)
  const [tbl, setTbl] = useState(null)
  const [columns, setColumns] = useState([])
  const [pageData, setPageData] = useState([])
  const [pageInfo, setPageInfo] = useState(null)
  const [mode, setMode] = useState(null)
  const [loading, setLoading] = useState(false)
  const [modelSelect, setModelSelect] = useState(null)
  const [arraySelect, setArraySelect] = useState(null)
  const [count, setCount] = useState(null)
  const [nPage, setNPage] = useState(null)
  const [currentFilter, setCurrentFilter] = useState(null)
  const [hideButton, setHideButton] = useState(false)
  const [lastFilterChange, setLastFilterChange] = useState(0)
  const [limitSize, setLimitSize] = useState(DEFAULT_PAGE_SIZE)

  const [isShowModal, setIsShowModal] = useState(false)
  const [CurrentModal, setCurrentModal] = useState(null)
  const [modalQuery, setModalQuery] = useState(null)

  useEffect(() => {
    if (router.query && !props.query) setQueryList(router.query)
  }, [router.query, props.query])

  const calculateFilter = useCallback(
    filter => {
      let obj = {}
      filter.map(f => {
        for (var i = 0; i < pageInfo.grid.length; i++) {
          let gridInfo = pageInfo.grid[i]
          if (gridInfo.field === f.id) {
            if (gridInfo.modelSelect) {
              if (_.isArray(f.value) && f.value.length > 0) {
                obj[f.id] = f.value
              }
            } else if (gridInfo.arraySelect) {
              // console.log({ arraySelect: f.id })
              if (_.isArray(f.value) && f.value.length > 0) {
                let tmp = { or: [] }
                for (let i = 0; i < f.value.length; i++) {
                  const element = f.value[i]
                  tmp.or.push({ [f.id]: { contains: `[${element}]` } })
                  tmp.or.push({ [f.id]: { contains: `,${element}]` } })
                  tmp.or.push({ [f.id]: { contains: `[${element},` } })
                  tmp.or.push({ [f.id]: { contains: `,${element},` } })
                }
                obj.and.push(tmp)
              } else {
                obj[f.id] = { contains: f.value }
              }
            } else {
              switch (gridInfo.type) {
                case 'string':
                  if (gridInfo.stringID) {
                    obj[f.id] = f.value
                  } else {
                    obj[f.id] = { contains: f.value }
                  }
                  break
                case 'stringID':
                  obj[f.id] = f.value
                  break
                case 'integer':
                case 'number':
                case 'boolean':
                  if (gridInfo.filterRange) {
                    if (_.isArray(f.value)) {
                      if (f.value[0]) {
                        if (!obj[f.id]) obj[f.id] = {}
                        obj[f.id]['>='] = Number(f.value[0])
                      }
                      if (f.value[1]) {
                        if (!obj[f.id]) obj[f.id] = {}
                        obj[f.id]['<='] = Number(f.value[1])
                      }
                    }
                  } else {
                    obj[f.id] = Number(f.value)
                  }
                  break
                case 'date':
                  if (gridInfo.filterRange) {
                    if (_.isArray(f.value)) {
                      if (f.value[0]) {
                        if (!obj[f.id]) obj[f.id] = {}
                        obj[f.id]['>='] = f.value[0]
                      }
                      if (f.value[1]) {
                        if (!obj[f.id]) obj[f.id] = {}
                        obj[f.id]['<='] = f.value[1]
                      }
                    }
                  } else {
                    if (f.value) {
                      obj[f.id] = {
                        '>=': moment(f.value).startOf('day').valueOf(),
                        '<=': moment(f.value).endOf('day').valueOf()
                      }
                    }
                  }
                  break
                default:
                  obj[f.id] = { contains: f.value }
                  break
              }
            }
          }
        }

        return 0
      })

      return obj
    },
    [pageInfo?.grid]
  )

  const onClickButton = async (button, data = {}) => {
    try {
      switch (button.action) {
        case 'api':
        case 'report':
          if (button.confirm) {
            let confirmText = button.confirm
            for (let i in data) {
              confirmText = replaceAll(confirmText, `#${i}#`, data[i])
            }

            const rs = window.confirm(confirmText)
            if (!rs) return
          }

          if (queryList.embed && button.embedUrl) {
            let a = parseQueryData(queryList.embed)
            if (a) {
              data = Object.assign(data, a)
            }
          }

          let submitData = { ...data }

          if (button.apiData) {
            try {
              let tmpApiData = JSON.parse(button.apiData)
              for (const key in tmpApiData) {
                if (tmpApiData.hasOwnProperty(key)) {
                  const e = tmpApiData[key]
                  submitData[key] = getFieldReferValue(e, data)
                }
              }
            } catch (e) {
              toast.error(e?.message)
            }
          }

          if (button.action === 'api') {
            let { data } = await pageApi.callPageApi(pageInfo, button.api, submitData)

            if (data.open_url) {
              window.open(data.open_url, data.target || '_self', 'noreferrer')
              if (data.target !== '_blank') {
                return
              }
            } else {
              toast.success(data.message || 'Thành công')
            }

            await fetchData(pageInfo, tbl)
          } else {
            await pageApi.report(pageInfo, button.api, submitData, button.reportName || 'report')
          }

          break
        case 'formModal':
          let raw = button.modalQuery
          if (queryList.embed && button.embedUrl) {
            let a = parseQueryData(queryList.embed)
            if (a) {
              data = Object.assign(data || {}, a)
            }
          }
          for (let i in data) {
            raw = replaceAll(raw, '#' + i + '#', data[i])
          }
          let query_form = JSON.parse(raw)
          if (!query_form.modalType) query_form.modalType = 'form'
          let CurrentModal = FormCtrl
          switch (query_form.modalType) {
            case 'form':
            default:
              CurrentModal = FormCtrl
              break
          }

          setIsShowModal(true)
          setModalQuery(query_form)
          setCurrentModal(() => CurrentModal)
          break
        case 'listModal':
          let raw1 = button.modalQuery
          const query = queryList
          if (query.embed && button.embedUrl) {
            let a = parseQueryData(query.embed)
            if (a) {
              data = Object.assign(data || {}, a)
            }
          }
          for (let i in data) {
            raw1 = replaceAll(raw1, '#' + i + '#', data[i])
          }
          let query1 = JSON.parse(raw1)

          setCurrentModal(() => List)
          setIsShowModal(true)
          setModalQuery(query1)
          break
        default:
          break
      }
    } catch (err) {
      toast.error(err?.message)
    }
  }

  const onSwitch = async (button, row, checked) => {
    if (!button) return

    try {
      await pageApi.callPageApi(pageInfo, button.api, {
        id: row.id,
        [button.column]: checked
      })
    } catch (err) {
      toast.error(err?.message)
    }
  }

  const renderButton = (button, row = {}, index) => {
    if (!button) return null

    let disabled = ''

    if (button.hideExpression && checkHideExpression(button.hideExpression, row?.row || row || {}, user)) {
      disabled = 'disabled'
      if (button.column) {
        return null
      }
    }

    if (button.showOnFormOnly) {
      return null
    }

    switch (button.type) {
      case 'switch':
        return (
          <FormGroup row key={index}>
            <FormControlLabel
              control={
                <Switch
                  color='primary'
                  defaultChecked={row.value}
                  onChange={e => onSwitch(button, row?.row || row || {}, e.target.checked)}
                />
              }
            />
          </FormGroup>
        )
      default:
        switch (button.action) {
          case 'url':
            let url = button.url.replace('$', row.value || row.id)
            for (let i in row.original) {
              replaceAll(url, '#' + i + '#', row.original[i])
            }
            for (let i in queryList) {
              url = replaceAll(url, '@' + i + '@', queryList[i])
            }

            if (url?.startsWith('#')) {
              url = url.substring(1, url.length)
            }

            return (
              <Button
                variant={button?.outline ? 'outlined' : 'contained'}
                color={button.color === 'danger' ? 'error' : button.color}
                sx={{ mr: 2 }}
                key={index}
                onClick={() => router.push(url)}
              >
                <Icon icon={button.icon || 'tabler:check'} />
                {hideButton ? '' : button.title}
              </Button>
            )
          case 'api':
          case 'formModal':
          case 'listModal':
            return (
              <Button
                key={index}
                sx={{ mr: 2 }}
                disabled={!!disabled}
                color={button.color === 'danger' ? 'error' : button.color}
                variant={button.outline ? 'outlined' : 'contained'}
                onClick={() => {
                  onClickButton(button, row)
                }}
              >
                <Icon icon={button.icon || 'tabler:check'} />
                {hideButton ? '' : button.title}
              </Button>
            )
          case 'report':
            return (
              <Button
                key={index}
                sx={{ mr: 2 }}
                disabled={!!disabled}
                color={button.color === 'danger' ? 'error' : button.color}
                variant={button.outline ? 'outlined' : 'contained'}
                onClick={() => {
                  onReportClick(button, null)
                }}
              >
                <Icon icon={button.icon || 'tabler:check'} />
                {hideButton ? '' : button.title}
              </Button>
            )
          case 'disable':
            return (
              <Button
                key={index}
                sx={{ mr: 2 }}
                disabled={!!disabled}
                color={button.color === 'danger' ? 'error' : button.color}
                variant={button.outline ? 'outlined' : 'contained'}
              >
                <Icon icon={button.icon || 'tabler:check'} />
                {hideButton ? '' : button.title}
              </Button>
            )
          default:
            return null
        }
    }
  }

  const createColumnsData = (pageInfo, arraySelect) => {
    if (!pageInfo) return
    let columns = []

    pageInfo = removeDuplicate(pageInfo)

    for (let i = 0; i < pageInfo.grid.length; i++) {
      let gridInfo = pageInfo.grid[i]

      let item = {
        flex: 0.1,
        headerName: gridInfo.name,
        field: gridInfo.field,
        filterable: !!gridInfo?.filterable,
        renderCell: row => {
          return (
            <span
              style={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: 'block',
                ...(gridInfo.color ? { color: gridInfo.color } : {})
              }}
            >
              {row.value}
            </span>
          )
        }
      }
      if (gridInfo.enumable) {
        if (gridInfo.items && gridInfo.items.length > 0) {
          if (gridInfo.bindButton) {
            item.renderCell = row => {
              let buttons = []
              for (let j = 0; j < pageInfo.buttons.length; j++) {
                let btn = pageInfo.buttons[j]
                if (btn.column === gridInfo.field) {
                  for (let k = 0; k < gridInfo.items.length; k++) {
                    if (gridInfo.items[k].value == row.value + '') {
                      btn.title = gridInfo.items[k].key
                      break
                    }
                  }

                  let a = renderButton(btn, row, j)
                  if (a) {
                    buttons.push(a)
                  }
                }
              }

              return buttons
            }
          } else {
            item.renderCell = row => {
              for (let i = 0; i < gridInfo.items.length; i++) {
                if (gridInfo.type === 'boolean') {
                  if ((gridInfo.items[i].value === 1 && row.value) || (gridInfo.items[i].value === 0 && !row.value)) {
                    return (
                      <span
                        style={{
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: 'block',
                          ...(gridInfo.color ? { color: gridInfo.color } : {})
                        }}
                      >
                        {gridInfo.items[i].key}
                      </span>
                    )
                  }
                } else {
                  if (gridInfo.items[i].value == row.value + '') {
                    return (
                      <span sx={{ ...(gridInfo.color ? { color: gridInfo.color } : {}) }}>{gridInfo.items[i].key}</span>
                    )
                  }
                }
              }
            }
          }

          item.filterOperators = [
            {
              label: gridInfo.name,
              value: gridInfo.field,
              getApplyFilterFn: filterItem => {
                console.log(filterItem)
              },
              InputComponentProps: { gridInfo },
              InputComponent: ({ gridInfo }) => {
                return (
                  <CustomTextField
                    select
                    fullWidth
                    onChange={e => {
                      const value = e.target.value

                      setTbl(prev =>
                        typeof prev === 'object'
                          ? { ...prev, filtered: [{ id: gridInfo.field, value }] }
                          : { filtered: [{ id: gridInfo.field, value }] }
                      )
                    }}
                  >
                    <MenuItem key={-1} value={''}>
                      All
                    </MenuItem>
                    {gridInfo.items.map((item, index) => (
                      <MenuItem key={index} value={item.value}>
                        {item.key}
                      </MenuItem>
                    ))}
                  </CustomTextField>
                )
              }
            }
          ]
        } else {
          item.renderCell = () => {
            return <span className={`text-danger`}>CHƯA CÓ DANH SÁCH</span>
          }
        }
      } else if (gridInfo.modelSelect) {
        let filt = {}
        if (tbl && tbl.filtered) {
          filt = calculateFilter(tbl.filtered)
        }

        item.filterOperators = [
          {
            label: gridInfo.name,
            value: gridInfo.field,
            getApplyFilterFn: filterItem => {
              console.log(filterItem)
            },
            InputComponentProps: { gridInfo, tbl },
            InputComponent: ({ gridInfo, tbl }) => {
              const filter = tbl?.filtered && tbl.filtered?.id === gridInfo.field ? tbl.filtered : null

              return (
                <Widgets.ArrayModel
                  value={filter ? filter?.value : []}
                  onChange={vals => {
                    const obj = { filtered: [{ id: gridInfo.field, value: vals }] }

                    setTimeout(() => {
                      setTbl(prev => (typeof prev === 'object' ? { ...prev, ...obj } : obj))
                    }, 1)
                  }}
                  data={filt}
                  schema={{
                    modelSelectField: gridInfo.modelSelectField || 'id,name$$Tên',
                    select: gridInfo.select || 'name',
                    pageId: pageInfo.id,
                    api: gridInfo.modelSelectApi,
                    hiddenWhere: gridInfo.hiddenWhere,
                    allowByPassHiddenWhere: gridInfo.allowByPassHiddenWhere || false
                  }}
                />
              )
            }
          }
        ]

        item.renderCell = row => {
          if (modelSelect?.[gridInfo.field]) {
            for (var i = 0; i < modelSelect[gridInfo.field].length; i++) {
              if (modelSelect[gridInfo.field][i].id == row.value) {
                return (
                  <span
                    style={{
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: 'block',
                      ...(gridInfo.color ? { color: gridInfo.color } : {})
                    }}
                  >
                    {modelSelect[gridInfo.field][i][gridInfo.select || 'name']}
                  </span>
                )
              }
            }
          }

          return <span style={{ ...(gridInfo.color ? { color: gridInfo.color } : {}) }}>{row.value}</span>
        }
      } else if (gridInfo.arraySelect) {
        let filt = {}
        if (tbl && tbl.filtered) {
          filt = calculateFilter(tbl.filtered)
        }

        item.filterOperators = [
          {
            label: gridInfo.name,
            value: gridInfo.field,
            getApplyFilterFn: filterItem => {
              console.log(filterItem)
            },
            InputComponentProps: { gridInfo, filt },
            InputComponent: ({ gridInfo, filt }) => {
              return (
                <Widgets.SingleModel
                  value={''}
                  onChange={val => {
                    const obj = { filtered: [{ id: gridInfo.field, value: val }] }

                    setTimeout(() => {
                      setTbl(prev => (typeof prev === 'object' ? { ...prev, ...obj } : obj))
                    }, 1)
                  }}
                  data={filt}
                  schema={{
                    modelSelectField: gridInfo.modelSelectField || 'id,name$$Tên',
                    select: gridInfo.select || 'name',
                    pageId: pageInfo.id,
                    api: gridInfo.modelSelectApi,
                    hiddenWhere: gridInfo.hiddenWhere,
                    allowByPassHiddenWhere: gridInfo.allowByPassHiddenWhere || false
                  }}
                />
              )
            }
          }
        ]

        if (!arraySelect?.[gridInfo.field]) {
          item.renderCell = row => {
            return (
              <span
                style={{
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: 'block',
                  ...(gridInfo.color ? { color: gridInfo.color } : {})
                }}
              >
                {row.value}
              </span>
            )
          }
        } else {
          item.renderCell = row => {
            let value = ''

            const fields = arraySelect[gridInfo.field]?.data || []
            for (let i = 0; i < fields.length; i++) {
              let tmp = gridInfo.type === 'string' ? '' + fields[i].id : +fields[i].id
              if (row.value.includes(tmp)) {
                if (value) {
                  value += ', '
                }
                value += fields[i][gridInfo.select || 'name'] || `{id:${fields[i].id}}`
              }
            }

            return (
              <span
                style={{
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: 'block',
                  ...(gridInfo.color ? { color: gridInfo.color } : {})
                }}
              >
                {value}
              </span>
            )
          }
        }
      } else {
        switch (gridInfo.type) {
          case 'date':
            if (gridInfo.filterRange) {
              // item.filterOperators = [
              //   {
              //     label: gridInfo.name,
              //     value: gridInfo.field,
              //     getApplyFilterFn: filterItem => {
              //       console.log(filterItem)
              //     },
              //     InputComponentProps: { gridInfo, tbl },
              //     InputComponent: ({ gridInfo, tbl }) => {
              //       const filter = tbl?.filtered && tbl.filtered?.id === gridInfo.field ? tbl.filtered : null
              //       return (
              //         <Widgets.Date
              //           value={filter ? filter?.value?.[0] : null}
              //           onChange={vals => {
              //             const obj = { filtered: [{ id: gridInfo.field, value: vals }] }
              //             setTimeout(() => {
              //               setTbl(prev => (typeof prev === 'object' ? { ...prev, ...obj } : obj))
              //             }, 1)
              //           }}
              //           schema={{ disabled: false, placeholder: 'Từ' }}
              //         />
              //       )
              //     }
              //   }
              // ]
            } else {
              item.Filter = ({ filter, onChange }) => {
                return (
                  <div>Single widget date</div>

                  // <Widgets.Date
                  //   value={filter ? filter.value : null}
                  //   schema={{ disabled: false }}
                  //   onChange={val => {
                  //     onChange(val)
                  //   }}
                  // />
                )
              }
            }
            item.renderCell = row => {
              return (
                <span
                  style={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: 'block',
                    ...(gridInfo.color ? { color: gridInfo.color } : {})
                  }}
                >
                  {timestampTpDDMMYYYY(row.value)}
                  {/* <Moment format='DD/MM/YYYY HH:mm:ss'>{row.value}</Moment> */}
                </span>
              )
            }
            break
          case 'number':
            if (gridInfo.filterRange) {
              item.filterOperators = [
                {
                  label: gridInfo.name,
                  value: gridInfo.field,
                  getApplyFilterFn: filterItem => {
                    console.log(filterItem)
                  },
                  InputComponentProps: { gridInfo },
                  InputComponent: ({ gridInfo }) => {
                    return (
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <CustomTextField
                            type='number'
                            placeholder={t('common.from')}
                            defaultValue={tbl?.filtered?.[0]?.value?.[0] || ''}
                            onChange={evt => {
                              let value
                              if (evt.target.value !== null && evt.target.value !== '') {
                                value = evt.target.value
                              } else {
                                value = null
                              }

                              setTbl(prev =>
                                typeof prev === 'object'
                                  ? {
                                      ...prev,
                                      filtered: [
                                        { id: gridInfo.field, value: [value, prev?.filtered?.[1]?.value?.[1]] }
                                      ]
                                    }
                                  : {
                                      filtered: [
                                        { id: gridInfo.field, value: [value, prev?.filtered?.[1]?.value?.[1]] }
                                      ]
                                    }
                              )
                            }}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <CustomTextField
                            type='number'
                            placeholder={t('common.to')}
                            defaultValue={tbl?.filtered?.[0]?.value?.[1] || ''}
                            onChange={evt => {
                              let value
                              if (evt.target.value !== null && evt.target.value !== '') {
                                value = evt.target.value
                              } else {
                                value = null
                              }

                              setTbl(prev =>
                                typeof prev === 'object'
                                  ? {
                                      ...prev,
                                      filtered: [
                                        { id: gridInfo.field, value: [prev?.filtered?.[0]?.value?.[0], value] }
                                      ]
                                    }
                                  : {
                                      filtered: [
                                        { id: gridInfo.field, value: [prev?.filtered?.[0]?.value?.[0], value] }
                                      ]
                                    }
                              )
                            }}
                          />
                        </Grid>
                      </Grid>
                    )
                  }
                }
              ]
            }

            item.renderCell = row => {
              let value = row.value === 0 ? 0 : row.value || ''
              if (gridInfo.formatNumber) {
                value = value.toLocaleString()
              }

              return <span style={{ ...(gridInfo.color ? { color: gridInfo.color } : {}) }}>{value}</span>
            }
            break
          case 'string':
            switch (gridInfo.display) {
              case 'image':
                item.renderCell = row => {
                  if (_.isArray(row.value)) {
                    return <img style={{ width: 80, height: 50, objectFit: 'contain' }} src={row.value} alt='image' />
                  } else {
                    return <img style={{ width: 80, height: 50, objectFit: 'contain' }} src={row.value} alt='image' />
                  }
                }
                break
              case 'progressbar':
                item.renderCell = row => {
                  let colorIndex = Math.floor(row.value / 25)
                  if (colorIndex > 3) {
                    colorIndex = 3
                  }
                  if (gridInfo.reverseColor) {
                    colorIndex = 3 - colorIndex
                  }

                  return (
                    <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Box sx={{ width: '100%' }}>
                        <LinearProgress color={'primary'} variant='determinate' value={row.value} />
                      </Box>
                      <Box sx={{ ml: 1 }}>{row.value}%</Box>
                    </Box>

                    // <Progress animated color={PROGRESS_COLORS[colorIndex]} value={row.value}>
                    //   <span className={row.value === 0 ? `text-primary` : ''}>{row.value}%</span>
                    // </Progress>
                  )
                }
                break
              default:
                item.renderCell = row => {
                  return (
                    <span
                      style={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: 'block',
                        ...(gridInfo.color ? { color: gridInfo.color } : {})
                      }}
                    >
                      {row.value && typeof row.value === 'object' ? JSON.stringify(row.value) : row.value}
                    </span>
                  )
                }
                break
            }
            break
          default:
            break
        }
      }

      columns.push(item)
    }

    if (pageInfo.buttons && pageInfo.buttons.length > 0) {
      let buttons = []
      pageInfo.buttons.map(i => {
        if (i.type === 'button' && !i.column) {
          return buttons.push(i)
        }

        return null
      })

      let col = {
        width: buttons.length * 125,
        headerName: 'Hành động',
        field: 'actions',
        sortable: false,
        filterable: false,
        renderCell: row => {
          return (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              {buttons.map((item, index) => {
                if (item.column) return null

                return renderButton(item, row, index)
              })}
            </div>
          )
        }
      }
      columns.push(col)
    }
    setColumns(columns)
  }

  const fetchData = useCallback(
    async (pageInfo, tbl_param) => {
      let rangeFilter = moment().valueOf() - lastFilterChange

      const query = queryList
      let filter = {}
      let skip = 0
      let limit = limitSize
      let sort = []

      if (tbl_param && tbl_param.filtered) {
        filter = calculateFilter(tbl_param.filtered)
        skip = tbl_param.pageSize * tbl_param.page
        limit = tbl_param.pageSize
      }

      if (tbl && tbl.sorted) {
        tbl.sorted.map(s => {
          sort.push({
            [s.id]: s.desc ? 'desc' : 'asc'
          })

          return null
        })
      }

      if (sort.length === 0) sort = [{ createdAt: 'desc' }]
      if (query?.filter) {
        const b = parseQueryData(query.filter)
        if (b) {
          filter = Object.assign(filter, b)
        }
      }

      let input = { queryInput: JSON.stringify(filter), ...(limit >= 0 && skip >= 0 ? { limit, skip } : {}) }
      if (sort) {
        input.sort = JSON.stringify(sort)
      }

      setLoading(true)

      const {
        data: { data, count }
      } = await pageApi.callPageApi(pageInfo, pageInfo.read, { ...query, input })

      let modelSelect = {}
      let modelSelectIds = {}
      let _arraySelect = {}
      let arraySelectIds = {}

      data.forEach(d => {
        pageInfo.grid.forEach(g => {
          if (g.modelSelect) {
            if (!modelSelectIds[g.field]) modelSelectIds[g.field] = []
            if (d[g.field] && !_.includes(modelSelectIds[g.field], d[g.field])) modelSelectIds[g.field].push(d[g.field])
          }
          if (g.arraySelect) {
            if (!arraySelectIds[g.field]) arraySelectIds[g.field] = []
            if (d[g.field] && _.intersection(arraySelectIds[g.field], d[g.field]).length !== d[g.field].length) {
              arraySelectIds[g.field] = arraySelectIds[g.field].concat(d[g.field])
            }
          }
        })
      })

      for (let i = 0; i < pageInfo.grid.length; ++i) {
        if (pageInfo.grid[i].modelSelect) {
          let gInfo = pageInfo.grid[i]
          if (!(modelSelectIds[gInfo.field] && modelSelectIds[gInfo.field].length > 0)) continue

          const {
            data: { data }
          } = await pageApi.callPageApi(pageInfo, gInfo.modelSelectApi, {
            queryInput: JSON.stringify({ id: modelSelectIds[gInfo.field] })
          })
          modelSelect[gInfo.field] = data
        } else if (pageInfo.grid[i].arraySelect) {
          let gInfo = pageInfo.grid[i]
          if (!(arraySelectIds[gInfo.field] && arraySelectIds[gInfo.field].length > 0)) continue

          let rs = await pageApi.callPageApi(pageInfo, gInfo.modelSelectApi, {
            queryInput: JSON.stringify({ id: arraySelectIds[gInfo.field] })
          })
          _arraySelect[gInfo.field] = rs.data
        }
      }

      setPageData(() => data)
      setModelSelect(() => modelSelect)
      setArraySelect(() => _arraySelect)
      setCount(() => count)
      setNPage(() => nPage)
      setCurrentFilter(() => input)
      createColumnsData(pageInfo, _arraySelect)
      setLoading(() => false)
    },
    [calculateFilter, lastFilterChange, limitSize, nPage, queryList, tbl]
  )

  const removeDuplicate = pageInfo => {
    const check = new Set()
    const newGrid = []

    for (let i = 0; i < pageInfo.grid.length; i++) {
      if (check.has(pageInfo.grid[i].field)) continue

      newGrid.push(pageInfo.grid[i])
      check.add(pageInfo.grid[i].field)
    }

    return { ...pageInfo, grid: newGrid }
  }

  const initPage = useCallback(
    (query, user, meta) => {
      const { page, mode } = query
      if (!page) return

      const pageInfo = getPage(user, meta, page)
      if (!pageInfo) return
      if (!Array.isArray(pageInfo.buttons)) pageInfo.buttons = []
      if (!Array.isArray(pageInfo.grid)) pageInfo.grid = []
      setPageInfo(() => removeDuplicate(pageInfo))

      if (mode) setMode(mode)
      fetchData(pageInfo)
    },
    [fetchData]
  )

  useEffect(() => {
    const query = queryList
    meta && initPage(query, user, meta)
  }, [queryList, meta, user])

  useEffect(() => {
    if (pageInfo && nPage !== null && limitSize !== null) {
      const tbl_params = {
        filtered: tbl?.filtered || [],
        sorted: tbl?.sorted || [],
        pageSize: limitSize,
        page: nPage
      }

      fetchData(pageInfo, tbl_params)
    }
  }, [nPage, limitSize, pageInfo, tbl])

  useEffect(() => {
    if (queryList?.page) setTbl(null)
  }, [queryList?.page])

  const handleSortChange = useCallback(
    sortModel => {
      if (sortModel?.length) {
        const sorted = { id: sortModel[0].field, desc: sortModel[0].sort !== 'asc' }
        setTbl(prev => (typeof prev === 'object' ? { ...prev, sorted: [sorted] } : { sorted: [sorted] }))
      }
    },
    [setTbl]
  )

  const handleFilterChange = useCallback(filterModel => {
    const filterItems = filterModel.items

    if (filterItems.length && filterItems[0]?.value !== undefined) {
      const filter = filterItems[0]

      const obj = { filtered: [{ id: filter.field, value: filter.value }] }

      setTbl(prev => (typeof prev === 'object' ? { ...prev, ...obj } : obj))
    } else {
      setTbl(null)
    }
  }, [])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const elements = document.querySelectorAll(
        'div[style*="pointer-events: none"][style*="color: rgba(130, 130, 130, 0.62)"][style*="bottom: 50%"][style*="right: 0px"]'
      )
      elements.forEach(element => {
        element.style.display = 'none'
      })
    }, 10)

    return () => clearTimeout(timeoutId)
  }, [])

  if (!pageInfo) return <div>{t('message.notFound', { value: t('common.page') })}</div>
  else
    return (
      <Grid>
        <Card style={{ marginTop: '1.5rem' }}>
          <CardHeader
            title={queryList?.name || pageInfo.name}
            subheader={`Tổng cộng ${count || '_'} bản ghi`}
            action={
              <>
                {pageInfo.buttons.map(item => {
                  if (item.type !== 'submit') return null

                  return renderButton(item, {})
                })}
              </>
            }
          />
          <Box
            sx={{
              height: 600,
              width: '100%',
              '& .MuiDataGrid-cell': {
                // overflow: 'unset !important',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                '& span': {
                  overflow: 'hidden !important'
                }
              },
              '& .super-app-theme--HighLight': {
                color: pageInfo.additionalGrid.highlightColor || 'red'
              }
            }}
          >
            <DataGridPro
              initialState={{ pinnedColumns: { right: ['actions'] } }}
              pagination
              columns={columns}
              rows={pageData}
              loading={loading}
              pageSizeOptions={PAGINATION_OPTIONS}
              rowCount={count}
              paginationMode='server'
              sortingMode='server'
              filterMode='server'
              paginationModel={{ page: nPage, pageSize: limitSize }}
              onSortModelChange={handleSortChange}
              onFilterModelChange={handleFilterChange}
              onPaginationModelChange={({ page, pageSize }) => {
                if (loading) return

                setNPage(page)
                setLimitSize(pageSize)
              }}
              getRowClassName={params => {
                if (
                  pageInfo.additionalGrid.highlight &&
                  checkHideExpression(pageInfo.additionalGrid.highlightExpression, params.row || {}, user)
                )
                  return `super-app-theme--HighLight`
                else return ''
              }}
            />
          </Box>
        </Card>

        {/* Dialog */}
        <Dialog
          fullWidth
          initialState={{
            pinnedColumns: { left: ['actions'] }
          }}
          open={isShowModal}
          maxWidth='md'
          scroll='body'
          onClose={() => setIsShowModal(false)}
          TransitionComponent={Transition}
          onBackdropClick={() => setIsShowModal(false)}
          sx={{ '& .MuiDialog-paper': { overflow: 'visible' }, zIndex: 1200 }}
        >
          <DialogContent>
            {CurrentModal && isShowModal && (
              <CurrentModal
                query={modalQuery}
                openType='modal'
                fetchData={() => {
                  fetchData(pageInfo)
                }}
                closeModal={() => setIsShowModal(false)}
              />
            )}
          </DialogContent>
          <DialogActions>
            <Box
              sx={{
                rowGap: 2,
                columnGap: 4,
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'end'
              }}
            >
              <Button color='secondary' variant='contained' onClick={() => setIsShowModal(false)}>
                Close
              </Button>
            </Box>
          </DialogActions>
        </Dialog>
      </Grid>
    )
}

export default List
