import { Icon } from '@iconify/react'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Button, Card, CardContent, CardHeader, Grid, MenuItem, Tab, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { pageApi } from 'src/@core/apis/page'
import CustomTextField from 'src/@core/components/mui/text-field'
import Widgets from 'src/@core/schemas/Widgets'
import { getPage } from 'src/@core/utils/page'
import { useAuth } from 'src/hooks/useAuth'
import FormTab from './FormTab'
import ButtonTab from './ButtonTab'
import APITab from './APITab'
import GridTab from './gridTab'
import FormJSONTab from './FormJSONTab'
import toast from 'react-hot-toast'
import { v4 } from 'uuid'

const PageEditor = () => {
  const { user, meta } = useAuth()
  const { t } = useTranslation()

  const router = useRouter()

  const [pageInfo, setPageInfo] = useState(null)
  const [name, setName] = useState('')
  const [desc, setDesc] = useState('')
  const [additionalGrid, setAdditionalGrid] = useState({})
  const [tab, setTab] = useState(1)
  const [schema, setSchema] = useState(router.query?.mode === 'edit' ? null : [])
  const [buttons, setButtons] = useState(router.query?.mode === 'edit' ? null : [])
  const [apis, setApis] = useState(router.query?.mode === 'edit' ? null : [])
  const [grid, setGrid] = useState(router.query?.mode === 'edit' ? null : [])
  const [read, setRead] = useState('')
  const [roles, setRoles] = useState(router.query?.mode === 'edit' ? null : [])
  const [notFound, setNotFound] = useState(false)

  const [showSave, setShowSave] = useState(false)

  const loadData = useCallback(
    async query => {
      const pageInfo = await getPage(user, meta, 4)
      setPageInfo(() => pageInfo)

      if (query.mode === 'edit') {
        if (!query.id) {
          console.log('Khong co du lieu')
          setNotFound(true)

          return
        }

        const { data } = await pageApi.callPageApi(pageInfo, pageInfo.read, {
          queryInput: JSON.stringify({ id: query.id })
        })

        if (!data.data.length) {
          setNotFound(true)

          return
        }

        setAdditionalGrid(data.data[0]?.additionalGrid || {})
        setSchema(data.data[0]?.schema?.map(schema => ({ ...schema, id: v4() })) || [])
        setRoles(data.data[0]?.roles || [])
        setName(data.data[0]?.name || '')
        setDesc(data.data[0]?.desc || '')
        setApis(data.data[0]?.apis?.map(api => ({ ...api, id: v4() })) || '')
        setRead(data.data[0]?.read || '')
        setButtons(data.data[0]?.buttons?.map(button => ({ ...button, id: v4() })) || [])
        setGrid(data.data[0]?.grid?.map(grid => ({ ...grid, id: v4() })) || [])
      }
    },
    [meta, user]
  )

  useEffect(() => {
    meta && loadData(router.query)
  }, [router.query, meta, loadData])

  const onCreatePage = useCallback(
    async action => {
      try {
        const payload = {
          name,
          desc,
          apis: apis.map(({ id, ...rest }) => rest),
          read,
          buttons: buttons.map(({ id, ...rest }) => rest),
          grid: grid.map(({ id, ...rest }) => rest),
          schema: schema.map(({ id, ...rest }) => rest),
          roles,
          additionalGrid: {
            highlight: additionalGrid.highlight,
            ...(additionalGrid.highlight
              ? {
                  highlightColor: additionalGrid.highlightColor,
                  highlightExpression: additionalGrid.highlightExpression
                }
              : {})
          }
        }
        await pageApi.callPageApi(pageInfo, 'create', payload)
        toast.success(t('message.createSuccess'))
        if (action === 'create') router.push('/list/?page=3')
      } catch (error) {
        toast.error(t('message.createFail'))
      }
    },
    [additionalGrid, apis, buttons, desc, grid, name, pageInfo, read, roles, schema, t]
  )

  const onSavePage = useCallback(async () => {
    try {
      const payload = {
        name,
        desc,
        apis: apis.map(({ id, ...rest }) => rest),
        read,
        buttons: buttons.map(({ id, ...rest }) => rest),
        id: router.query.id,
        grid: grid.map(({ id, ...rest }) => rest),
        schema: schema.map(({ id, ...rest }) => rest),
        roles,
        additionalGrid: {
          highlight: additionalGrid.highlight,
          ...(additionalGrid.highlight
            ? { highlightColor: additionalGrid.highlightColor, highlightExpression: additionalGrid.highlightExpression }
            : {})
        }
      }

      await pageApi.callPageApi(pageInfo, 'update', payload)
      toast.success(t('message.updateSuccess'))
    } catch (error) {
      toast.error(t('message.createFail'))
    }
  }, [additionalGrid, apis, buttons, desc, grid, name, pageInfo, read, roles, schema, t])

  const renderHeader = useMemo(() => {
    switch (router.query.mode) {
      case 'create':
        return (
          <CardHeader
            title={t('createNewPage')}
            action={
              <Button size='small' variant='contained' color='success' onClick={() => onCreatePage('create')}>
                <Icon icon={'tabler:circle-plus'} fontSize={24} style={{ marginRight: '.25rem' }} />
                {t('common.create')}
              </Button>
            }
          />
        )
      case 'edit':
        return (
          <CardHeader
            title={t('updatePageInfo')}
            action={
              <Grid sx={{ display: 'flex', gap: 4 }}>
                <Button size='small' variant='contained' color='success' onClick={onCreatePage}>
                  <Icon icon={'tabler:copy'} fontSize={24} style={{ marginRight: '.25rem' }} />
                  {t('common.copy')}
                </Button>
                <Button size='small' variant='contained' color='info' onClick={onSavePage}>
                  <Icon icon={'tabler:edit'} fontSize={24} style={{ marginRight: '.25rem' }} />
                  {t('common.update')}
                </Button>
              </Grid>
            }
          />
        )
      default:
        return null
    }
  }, [t, router.query.mode, onCreatePage])

  return (
    <Grid>
      {notFound ? (
        <Typography>Page Not Found</Typography>
      ) : (
        <>
          <Card>
            {renderHeader}
            <CardContent>
              <Grid container spacing={4}>
                <Grid item xs={4}>
                  <CustomTextField
                    fullWidth
                    label={t('pageName')}
                    required
                    placeholder={t('placeholder.title')}
                    value={name}
                    onChange={e => setName(e.target.value)}
                    error={!name}
                    helperText={!name ? t('common.requiredField') : ''}
                  />
                </Grid>
                <Grid item xs={4}>
                  <CustomTextField
                    fullWidth
                    label={t('common.description')}
                    placeholder={t('placeholder.description')}
                    value={desc}
                    onChange={e => setDesc(e.target.value)}
                  />
                </Grid>
                <Grid item xs={4}>
                  <CustomTextField
                    select
                    fullWidth
                    label={t('loadDataFunction')}
                    placeholder={t('placeholder.loadDataFunction')}
                    value={read}
                    onChange={e => setRead(e.target.value)}
                  >
                    <MenuItem value='-1'>{t('common.none')}</MenuItem>
                    {apis?.map((api, index) => (
                      <MenuItem key={index} value={api.name}>
                        {api.name}
                      </MenuItem>
                    ))}
                  </CustomTextField>
                </Grid>
                <Grid item xs={12}>
                  {roles && (
                    <>
                      <span style={{ fontSize: '13px', fontWeight: 500, color: '#0000008a' }}>Nhóm quyền</span>
                      <Widgets.ArrayModel
                        schema={{ pageId: 4, modelSelectField: 'id,name', api: 'find_role', disabled: false }}
                        value={roles}
                        onChange={e => setRoles(e)}
                        label='Role'
                      />
                    </>
                  )}
                </Grid>
                {tab === '4' && (
                  <Grid item xs={12}>
                    <Grid container spacing={4}>
                      <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center' }}>
                        <span>Highlight: </span>
                        <Widgets.Checkbox
                          value={additionalGrid.highlight || false}
                          onChange={e => setAdditionalGrid(prev => ({ ...prev, highlight: e }))}
                        />
                      </Grid>
                      {additionalGrid.highlight && (
                        <>
                          <Grid item xs={5}>
                            <CustomTextField
                              fullWidth
                              label='Highlight Expression'
                              value={additionalGrid.highlightExpression || ''}
                              onChange={e =>
                                setAdditionalGrid(prev => ({ ...prev, highlightExpression: e.target.value }))
                              }
                            />
                          </Grid>
                          <Grid item xs={5}>
                            <CustomTextField
                              fullWidth
                              label='Highlight color'
                              value={additionalGrid.highlightColor || ''}
                              onChange={e => setAdditionalGrid(prev => ({ ...prev, highlightColor: e.target.value }))}
                            />
                          </Grid>
                        </>
                      )}
                    </Grid>
                  </Grid>
                )}
              </Grid>
            </CardContent>
          </Card>
          <Card sx={{ mt: 4 }}>
            <CardContent>
              <TabContext value={String(tab)}>
                <TabList
                  onChange={(_, value) => {
                    if (showSave && !window.confirm(t('message.notSaveSchemaConfirm'))) return
                    setTab(value)
                    showSave && setShowSave(false)
                  }}
                >
                  <Tab value='1' label={t('common.form')} />
                  <Tab value='2' label={t('common.button')} />
                  <Tab value='3' label={t('common.api')} />
                  <Tab value='4' label={t('common.grid')} />
                  <Tab value='5' label={t('common.formJSON')} />
                </TabList>
                <TabPanel value='1'>
                  {apis && schema && (
                    <FormTab
                      apis={apis}
                      schema={schema}
                      onChange={newSchema => setSchema(newSchema)}
                      showSave={showSave}
                      setShowSave={setShowSave}
                    />
                  )}
                </TabPanel>
                <TabPanel value='2'>
                  {apis && buttons && (
                    <ButtonTab
                      apis={apis}
                      buttons={buttons}
                      onChange={newButtons => setButtons(newButtons)}
                      showSave={showSave}
                      setShowSave={setShowSave}
                    />
                  )}
                </TabPanel>
                <TabPanel value='3'>
                  {apis && (
                    <APITab
                      apis={apis}
                      onChange={newAPIs => setApis(newAPIs)}
                      showSave={showSave}
                      setShowSave={setShowSave}
                    />
                  )}
                </TabPanel>
                <TabPanel value='4'>
                  {apis && grid && (
                    <GridTab
                      grid={grid}
                      apis={apis}
                      onChange={newGrid => setGrid(newGrid)}
                      showSave={showSave}
                      setShowSave={setShowSave}
                    />
                  )}
                </TabPanel>
                <TabPanel value='5'>
                  <FormJSONTab
                    name={name}
                    desc={desc}
                    read={read}
                    roles={roles}
                    additionalGrid={additionalGrid}
                    apis={apis}
                    buttons={buttons}
                    grid={grid}
                    schema={schema}
                  />
                </TabPanel>
              </TabContext>
            </CardContent>
          </Card>
        </>
      )}
    </Grid>
  )
}

export default PageEditor
