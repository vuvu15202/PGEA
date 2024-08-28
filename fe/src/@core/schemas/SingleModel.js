import { useEffect, useState } from 'react'
import _ from 'lodash'
import CustomTextField from '../components/mui/text-field'
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  Switch
} from '@mui/material'
import { getPage } from '../utils/page'
import { useAuth } from 'src/hooks/useAuth'
import { pageApi } from '../apis/page'
import { Icon } from '@iconify/react'
import { Box } from '@mui/system'
import { DataGrid } from '@mui/x-data-grid'
import { DEFAULT_PAGE_SIZE, PAGINATION_OPTIONS } from '../constants/table'

const calculateColumns = (props, data, mode, onCheckboxChanged) => {
  let cols = []
  let names = (props.schema.modelSelectField || 'id,name').split(',')
  names.map(n => {
    let arr = n.split('$$')

    let col = {
      flex: 1.5,
      headerName: arr[1] || n,
      field: arr[0],
      filterable: !props.disabled
    }
    cols.push(col)

    return null
  })
  if (!props.disabled) {
    cols.push({
      flex: 1.5,
      headerName: 'Select',
      field: 'checked',
      filterable: false,
      renderCell: row => {
        let val = data.some(dataRow => dataRow.id === row.row.id && dataRow.checked)

        return (
          <div>
            {mode === 'select' ? (
              <Switch
                color='primary'
                checked={val}
                disabled={props.disabled}
                onChange={e => onCheckboxChanged(row, e)}
              />
            ) : null}
          </div>
        )
      }
    })
  }

  return cols
}

const SingleModel = props => {
  const { user, meta } = useAuth()

  const [state, setState] = useState({
    value: props.value,
    modal: false,
    data: [],
    loading: true,
    search: '',
    pageId: props.schema.pageId,
    schema: props.schema,
    count: 0,
    limit: DEFAULT_PAGE_SIZE,
    nPages: 0,
    display: null,
    mode: 'select'
  })
  const [display, setDisplay] = useState('')
  const [value, setValue] = useState(props.value)
  const [columns, setColumns] = useState([])
  const [tableData, setTableData] = useState(_.cloneDeep(state.data))
  const [pageInfo, setPageInfo] = useState(null)
  const [hiddenWhere, setHiddenWhere] = useState([]);

  let schema = null
  let hiddenWhereDepend = []
  let formData = {}

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
    if (props.value !== state.value) {
      setState(prevState => ({ ...prevState, value: props.value }))
      fetchItemName(pageInfo, schema, props.value)
    }

    for (let i = 0; i < hiddenWhereDepend.length; i++) {
      const e = hiddenWhereDepend[i]
      if (
        props.data &&
        (formData[e] !== props.data[e] ||
          (Array.isArray(props.data[e]) && !_.isEqual(formData[e].sort(), props.data[e].sort())))
      ) {
        formData = Object.assign({}, props.data)
        let value = ''
        let data = calculateCheck(state.data, schema, value)

        setState(prev => ({ ...prev, ...data, value: null }))
        onChange(value)

        return
      }
    }
  }, [props.value, props.data])

  const init = async (pageId, props) => {
    const pageInfo = await getPage(user, meta, pageId)
    setPageInfo(() => pageInfo)
    schema = props.schema
    fetchItemName(pageInfo, schema, props.value)
    formData = Object.assign({}, props.data || {})
    setHiddenWhere(props.schema.hiddenWhere || [])
    hiddenWhereDepend = []
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
          hiddenWhereDepend.push(tmp[1])
        }
      }
    })
  }

  const toggle = mode => {
    setState(prevState => ({
      ...prevState,
      ...(mode ? { mode } : {}),
      modal: !prevState.modal
    }))
  }

  const calculateSelectField = modelSelectField => {
    return [...new Set(modelSelectField.split(',').map(v => v.split('$$')[0]))].join(',')
  }

  const getFilterFromHiddenWhere = allowByPassHiddenWhere => {
    let ret = {};
    (hiddenWhere || []).map(v => {
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

    filter = Object.assign({}, filter, getFilterFromHiddenWhere(state.schema.allowByPassHiddenWhere))
    if (state.mode === 'view') {
      if (filter.id) {
        if (filter.id !== props.value) {
          filter.id = undefined
        }
      } else {
        filter.id = props.value
      }
    }
    try {
      let rs = await pageApi.callPageApi(pageInfo, state.schema.api, {
        select: calculateSelectField(state.schema.modelSelectField),
        sort,
        queryInput: JSON.stringify(filter),
        limit: tbl.pageSize,
        skip: tbl.pageSize * tbl.page
      })
      rs.data = calculateCheck(rs.data.data, state.schema, state.value)

      setState(prev => ({
        ...prev,
        data: rs.data,
        count: rs.count,
        loading: false,
        nPage: Math.ceil(rs.count / tbl.pageSize)
      }))
    } catch (error) {
      console.error(error)
    }
  }

  const fetchItemName = async (pageInfo, schema, value) => {
    if (!pageInfo || !schema || !value) {
      setState(prevState => ({ ...prevState, display: '' }))

      return
    }
    let filter = { id: value }

    let rs = await pageApi.callPageApi(pageInfo, schema.api, {
      queryInput: JSON.stringify(filter),
      select: schema.select || 'name'
    })

    const selectedData = rs.data.data.find(d => d.id === state.value)

    let display =
      (schema.showWithId && selectedData && selectedData.id ? '#' + selectedData.id + ' | ' : '') +
      (selectedData ? selectedData[schema.select] || selectedData.name : '')

    setState(prevState => ({ ...prevState, display }))
  }

  const calculateCheck = (data, schema, value) => {
    let mapData = data?.map(d => {
      if (d.id === value) return { ...d, checked: d?.checked || true }

      return { ...d, checked: false }
    })

    return mapData
  }

  const onChange = e => {
    setState(prevState => ({
      ...prevState,
      value: e,
      data: _.cloneDeep(prevState.data)
    }))
    if (props.onChange) {
      props.onChange(e)
    }
  }

  const onCheckboxChanged = (row, e) => {
    if (props.disabled) return
    let value = undefined
    if (e.target.checked) {
      value = row.row.id
    }
    let data = calculateCheck(state.data, schema, value)
    setState(prevState => ({ ...prevState, data, value }))
  }

  const confirm = () => {
    setState(prevState => ({
      ...prevState,
      data: _.cloneDeep(prevState.data),
      value: prevState.value
    }))
    if (props.onChange) {
      props.onChange(state.value)
    }
    toggle()
  }

  return schema && !schema.modelSelectField ? (
    <p>Thiếu dữ liệu modelSelectField</p>
  ) : (
    <div>
      <CustomTextField
        fullWidth
        type='text'
        disabled={true}
        value={state.display || state.value || ''}
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

      {/* Dialog */}
      <Dialog maxWidth={700} open={state.modal}>
        <DialogTitle>Select One</DialogTitle>
        <DialogContent>
          <Box sx={{ height: 500, minWidth: '700px' }}>
            <DataGrid
              columns={columns}
              rows={state.data}
              rowSelection={false}
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

export default SingleModel
