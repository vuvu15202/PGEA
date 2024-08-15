import {
  CircularProgress,
  Grid,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemSecondaryAction,
  ListItemText
} from '@mui/material'
import { CustomList } from './FormTab'
import { useTranslation } from 'react-i18next'
import { Icon } from '@iconify/react'
import { useEffect, useState } from 'react'
import APIEditor from 'src/@core/components/api-editor'
import { v4 } from 'uuid'

export const methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']

export const types = ['create', 'update', 'find']

export const defaultApi = {
  name: '',
  type: types[0],
  url: '',
  description: '',
  method: methods[0],
  enableCaptcha: false,
  roles: [],
  options: [],
  criterias: [],
  requestFields: '',
  restrictFields: '',
  responseFields: '',
  fixedQuery: '',
  boolExpression: '',
  downloadReport: '',
  ignoreRoles: []
}

const APITab = ({ apis, onChange, showSave, setShowSave }) => {
  const { t } = useTranslation()

  const [selectedTab, setSelectedTab] = useState(apis?.[0]?.id)
  const [listApi, setListApi] = useState(apis)
  const [selectedApi, setSelectedApi] = useState(apis?.[0])
  const [loadingSelectApi, setLoadingSelectApi] = useState(false)

  useEffect(() => {
    onChange && onChange(listApi)
  }, [listApi, onChange])

  const handleAddApi = () => {
    setListApi(prev => [...prev, { ...defaultApi, id: v4() }])
  }

  const handleRemoveApi = id => {
    if (!window.confirm(t('message.confirmRemove', { value: t('common.api') }))) return
    setListApi(prev => prev.filter(api => api.id !== id))
    if (selectedApi && selectedApi.id === id) {
      setSelectedApi(null)
      setSelectedTab(null)
    }
  }

  const handleSelectApi = id => {
    if (showSave && !window.confirm(t('message.notSaveConfirm', { value: t('common.api') }))) return

    const api = listApi.find(api => api.id === id)
    if (!api) return

    setSelectedApi(() => null)

    setLoadingSelectApi(true)
    setSelectedTab(api.id)
    showSave && setShowSave(false)
    setTimeout(() => {
      setSelectedApi(() => api)
      setLoadingSelectApi(false)
    }, 200)
  }

  const handleSaveApi = data => {
    setListApi(prev => prev.map(api => (api.id === data.id ? data : api)))
  }

  return (
    <Grid container spacing={4}>
      <Grid item xs={2} style={{ paddingLeft: 0 }}>
        <CustomList>
          <ListItem disablePadding>
            <ListItemText primary={t('common.api')} />
            <ListItemSecondaryAction>
              <IconButton edge='end' onClick={handleAddApi}>
                <Icon icon='tabler:plus' fontSize={20} />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          {listApi.map((api, index) => (
            <ListItem disablePadding key={api.id}>
              <ListItemButton selected={selectedTab === api.id} onClick={e => handleSelectApi(api.id)}>
                <ListItemText primary={api.name || `No Name ${index + 1}`} />
                <ListItemSecondaryAction>
                  <IconButton edge='end'>
                    <Icon
                      icon='tabler:trash'
                      fontSize={20}
                      onClick={e => {
                        e.stopPropagation()
                        handleRemoveApi(api.id)
                      }}
                    />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItemButton>
            </ListItem>
          ))}
        </CustomList>
      </Grid>
      <Grid item xs={10}>
        {loadingSelectApi && (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '5rem' }}>
            <CircularProgress />
          </div>
        )}
        {selectedApi && (
          <APIEditor api={selectedApi} onSave={handleSaveApi} showSave={showSave} setShowSave={setShowSave} />
        )}
      </Grid>
    </Grid>
  )
}

export default APITab
