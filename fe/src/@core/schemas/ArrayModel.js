import { useEffect, useState } from 'react'
import _ from 'lodash'

import { getPage } from '../utils/page'
import { useAuth } from 'src/hooks/useAuth'
import { pageApi } from '../apis/page'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  Switch
} from '@mui/material'
import CustomTextField from '../components/mui/text-field'
import { Icon } from '@iconify/react'
import { Box } from '@mui/system'
import { DataGrid } from '@mui/x-data-grid'
import { DEFAULT_PAGE_SIZE, PAGINATION_OPTIONS } from '../constants/table'

const calculateColumns = (props, data, mode, onCheckboxChanged) => {
  let cols = []
  let names = props.schema.modelSelectField.split(',')
  names.map(n => {
    let arr = n.split('$$')
    cols.push({
      flex: 1.5,
      headerName: arr[1] || n,
      field: arr[0]
    })

    return null
  })
  cols.push({
    flex: 1.5,
    headerName: 'Select',
    field: 'checked',
    filterable: false,
    renderCell: row => {
      let val = false
      for (var i = 0; i < data.length; i++) {
        if (data[i].id === row.row.id) {
          val = data[i].checked || false
        }
      }

      return (
        <div>
          {mode === 'select' ? (
            <Switch
              color='primary'
              checked={val || false}
              disabled={props.disabled || false}
              onChange={e => {
                onCheckboxChanged(row, e)
              }}
            />
          ) : null}
        </div>
      )
    }
  })

  return cols
}

const ArrayModel = props => {
  const { user, meta } = useAuth()

  const [state, setState] = useState({
    modal: false,
    loading: true,
    search: '',
    pageId: props.schema.pageId,
    schema: props.schema,
    count: 0,
    nPages: 0,
    display: null,
    mode: 'select',
    names: [],
    limit: DEFAULT_PAGE_SIZE,
    data: [],
    output: _.cloneDeep(props.value || [])
  })
  const [pageInfo, setPageInfo] = useState(null)
  const [data, setData] = useState([])
  const [columns, setColumns] = useState([])
  const [names, setNames] = useState([])
  const [output, setOutput] = useState(props.value || [])
  const [formData, setFormData] = useState({})
  const [hiddenWhere, setHiddenWhere] = useState([])
  const [hiddenWhereDepend, setHiddenWhereDepend] = useState([])
  const [remove, setRemove] = useState(false)

  useEffect(() => {
    init(props.schema.pageId, props)
  }, [props.schema.pageId, props])

  useEffect(() => {
    if (props.schema) {
      const cols = calculateColumns(props, state.data, state.mode, onCheckboxChanged)
      setColumns(cols)
    }
  }, [props, state.data, state.mode])

  useEffect(() => {
    pageInfo && fetchData({})
  }, [pageInfo])

  useEffect(() => {
    for (let i = 0; i < hiddenWhereDepend.length; i++) {
      const e = hiddenWhereDepend[i]
      if (
        props.data &&
        (formData[e] !== props.data[e] ||
          (Array.isArray(props.data[e]) && !_.isEqual(formData[e].sort(), props.data[e].sort())))
      ) {
        setFormData(Object.assign({}, props.data))
        setState(prev => ({ ...prev, names: [], output: [] }))
        onChange([])
        fetchItemName(pageInfo, state.schema, state.output)

        break
      }
    }

    if (!props.value) {
      return setState(prev => ({ ...prev, names: [], output: [] }))
    }
    if (!_.isEqual(state.output, props.value)) {
      fetchItemName(pageInfo, state.schema, props.value)
    }
    setState(prev => ({ ...prev, output: _.clone(props.value) }))
  }, [props.value, props.data])

  const init = async (pageId, props) => {
    const pageInfo = getPage(user, meta, pageId)
    setPageInfo(() => pageInfo)
    await fetchItemName(pageInfo, props.schema, output)
    setFormData(Object.assign({}, props.data || {}))
    setHiddenWhere(props.schema.hiddenWhere || [])
    setHiddenWhereDepend([])
    ;(props.schema.hiddenWhere || []).map(v => {
      let tmpV = ''
      try {
        tmpV = JSON.parse(v.value)
      } catch (error) {
        tmpV = v.value
      }
      if (typeof tmpV === 'string') {
        let tmp = tmpV.split('this.')
        if (tmp.length === 2) {
          setHiddenWhereDepend(prev => [...prev, tmp[1]])
        }
      }
    })
  }

  const getFilterFromHiddenWhere = allowByPassHiddenWhere => {
    let ret = {}
    ;(hiddenWhere || []).map(v => {
      let tmpV = ''
      try {
        tmpV = JSON.parse(v.value)
      } catch (error) {
        tmpV = v.value
      }
      if (typeof tmpV === 'string') {
        let tmp = tmpV.split('this.')
        if (tmp.length === 2) {
          ret[v.key] = formData[tmp[1]] || (allowByPassHiddenWhere ? undefined : [0])
        } else {
          ret[v.key] = tmpV
        }
      } else {
        ret[v.key] = tmpV
      }
    })

    return ret
  }

  const toggle = mode => {
    setState(prev => ({ ...prev, mode, modal: !prev.modal }))
  }

  const calculateSelectField = modelSelectField => {
    return modelSelectField
      .split(',')
      .map(v => v.split('$$')[0])
      .join(',')
  }

  const fetchItemName = async (pageInfo, schema, output) => {
    if (!pageInfo || !schema || !output) return
    let filter = {}
    filter.id = output
    try {
      let rs = await pageApi.callPageApi(pageInfo, schema.api, {
        queryInput: JSON.stringify(filter),
        select: schema.select || 'name'
      })
      let display = []
      rs.data.data.map(d => {
        return display.push(d[schema.select] || d.name)
      })
      if (rs.data.data) {
        setNames(rs.data.data)
        setState(prev => ({ ...prev, names: rs.data.data, display: _.join(display, '-') }))
      }
    } catch (err) {
      console.error(err)
    }
  }

  const fetchData = async tbl => {
    let filter = {},
      sort = null
    if (tbl.filtered) {
      tbl.filtered.map(f => {
        switch (f.id) {
          case 'id':
            filter.id = f.value || '0'
            break
          default:
            filter[f.id] = { contains: f.value }
            break
        }

        return null
      })
    }
    if (tbl && tbl.sorted) {
      sort = []
      tbl.sorted.map(s => {
        sort.push({
          [s.id]: s.desc ? 'desc' : 'asc'
        })

        return null
      })
    }
    if (state.mode === 'view') {
      if (filter.id) {
        if (!_.includes(output, filter.id)) {
          filter.id = 0
        }
      } else {
        filter.id = output
      }
    }
    try {
      filter = Object.assign({}, filter, getFilterFromHiddenWhere(state.schema.allowByPassHiddenWhere))

      let rs = await pageApi.callPageApi(pageInfo, state.schema.api, {
        select: calculateSelectField(state.schema.modelSelectField),
        sort,
        queryInput: JSON.stringify(filter),
        limit: tbl.pageSize,
        skip: tbl.pageSize * tbl.page
      })
      const cal_data = calculateCheck(rs.data.data, output)
      setState(prev => ({
        ...prev,
        data: cal_data,
        count: rs.data.count,
        loading: false,
        nPages: Math.ceil(rs.data.count / tbl.pageSize) || 0
      }))
    } catch (err) {
      console.error(err)
    }
  }

  const calculateCheck = (data, output) => {
    let mapData = data?.map(d => {
      if (_.includes(output, d.id)) return { ...d, checked: d?.checked || true }

      return { ...d, checked: false }
    })

    return mapData
  }

  const onCheckboxChanged = (row, e) => {
    if (props.disabled) return
    let output = state.output.splice(0)
    if (e.target.checked) {
      if (!_.includes(output, row.row.id)) output.push(row.row.id)
    } else {
      let tmp = []
      output.map(o => {
        if (o !== row.row.id) {
          tmp.push(o)
        }

        return null
      })
      output = tmp
    }

    let data = calculateCheck(state.data, output)
    setState(prev => ({ ...prev, data, output }))
  }

  const confirm = () => {
    onChange(state.output)

    fetchItemName(pageInfo, state.schema, state.output)
    toggle()
  }

  const onChange = dt => {
    setOutput(_.cloneDeep(dt))
    if (props.onChange) {
      props.onChange(dt)
    }
  }

  const onRemoveClick = id => {
    setRemove(true)
    if (props.disabled) return
    let _output = []
    let _names = []
    for (var i = 0; i < names.length; i++) {
      if (names[i].id !== id) {
        _output.push(names[i].id)
        _names.push(names[i])
      }
    }
    setOutput(_output)
    setNames(_names)

    onChange(output)
  }

  return props.schema && !props.schema.modelSelectField ? (
    <p>Thiếu dữ liệu modelSelectField</p>
  ) : (
    <div>
      <CustomTextField
        fullWidth
        type='text'
        disabled={props?.schema?.disabled}
        value={state.names.map(item => `[${item.name}]`).join(', ')}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton
                edge='end'
                onClick={() => {
                  props.disabled ? toggle('view') : toggle('select')
                }}
                aria-label='toggle password visibility'
              >
                <Icon fontSize='1.25rem' icon={'tabler:plus'} />
              </IconButton>
            </InputAdornment>
          )
        }}
      />

      <Dialog maxWidth={700} open={state.modal}>
        <DialogTitle>Select Many</DialogTitle>
        <DialogContent>
          <Box sx={{ height: 500, minWidth: '700px' }}>
            <DataGrid
              columns={columns}
              rows={state.data}
              rowSelection={false}
              loading={state.loading}
              pageSizeOptions={PAGINATION_OPTIONS}
              paginationModel={{ page: state.nPages, pageSize: state.limit }}
              onPaginationModelChange={({ page, pageSize }) => {
                setState(prev => ({ ...prev, nPages: page, limit: pageSize }))
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          {state.mode === 'select' && !props.disabled ? (
            <>
              <Button color='primary' onClick={confirm}>
                Ok
              </Button>
              <Button
                color='secondary'
                onClick={() => {
                  // setState(prev => ({ ...prev, names, output }))
                  toggle()
                }}
              >
                Cancel
              </Button>
            </>
          ) : (
            <Button color='secondary' onClick={toggle}>
              Close
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default ArrayModel
