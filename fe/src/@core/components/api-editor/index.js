import { yupResolver } from '@hookform/resolvers/yup'
import { Icon } from '@iconify/react'
import { Button, Grid, ListItem, ListItemSecondaryAction, ListItemText, MenuItem } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { defaultApi, methods, types } from 'src/pages/pageEditor/APITab'
import { CustomList } from 'src/pages/pageEditor/FormTab'
import * as yup from 'yup'
import CustomTextField from '../mui/text-field'
import Widgets from 'src/@core/schemas/Widgets'
import ArrayEditor from 'src/@core/schemas/ArrayEditor'
import { useState } from 'react'
import { v4 } from 'uuid'

const yupApi = yup.object({
  // name: yup.string().required(),
  // type: yup.string().required(),
  // url: yup.string().required(),
  // description: yup.string().required(),
  // method: yup.string().required(),
  // enableCaptcha: yup.boolean().required(),
  // roles: yup.array().required(),
  // options: yup.array().required(),
  // criterias: yup.array().required(),
  // requestFields: yup.string().required(),
  // restrictFields: yup.string().required(),
  // responseFields: yup.string().required(),
  // fixedQuery: yup.string().required(),
  // boolExpression: yup.string().required(),
  // downloadReport: yup.string().required()
})

const APIEditor = ({ api, onSave, showSave, setShowSave }) => {
  const { t } = useTranslation()

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues: {
      id: api.id || v4(),
      name: api.name || defaultApi.name,
      type: api.type || defaultApi.type,
      url: api.url || defaultApi.url,
      description: api.description || defaultApi.description,
      method: api.method || defaultApi.method,
      enableCaptcha: api.enableCaptcha || defaultApi.enableCaptcha,
      roles: api.roles || defaultApi.roles,
      options: api.options || defaultApi.options,
      criterias: api.criterias || defaultApi.criterias,
      requestFields: api.requestFields || defaultApi.requestFields,
      restrictFields: api.restrictFields || defaultApi.restrictFields,
      responseFields: api.responseFields || defaultApi.responseFields,
      fixedQuery: api.fixedQuery || defaultApi.fixedQuery,
      boolExpression: api.boolExpression || defaultApi.boolExpression,
      downloadReport: api.downloadReport || defaultApi.downloadReport,
      ignoreRoles: api.ignoreRoles || defaultApi.ignoreRoles
    },
    resolver: yupResolver(yupApi)
  })

  const onSubmit = data => {
    const payload = removeUnuseData(data)
    onSave(payload)
    setShowSave(false)
  }

  const removeUnuseData = data => {
    const { ...rest } = data

    return rest
  }

  const onFieldChange = (onChange, e) => {
    onChange(e)
    if (!showSave) setShowSave(true)
  }

  return (
    <CustomList>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ListItem disablePadding>
          <ListItemText primary={t('common.api')} />
          <ListItemSecondaryAction>
            {showSave && (
              <Button variant='contained' color='primary' sx={{ mr: 2 }} type='submit'>
                <Icon fontSize={20} icon='tabler:check' />
                {t('common.save')}
              </Button>
            )}
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem>
          <Grid container>
            <Grid item xs={4}>
              {t('common.name')}
            </Grid>
            <Grid item xs={8}>
              <Controller
                name='name'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    error={errors.name}
                    fullWidth
                    {...field}
                    onChange={e => onFieldChange(field.onChange, e)}
                  />
                )}
              />
            </Grid>
          </Grid>
        </ListItem>
        <ListItem>
          <Grid container>
            <Grid item xs={4}>
              {t('common.type')}
            </Grid>
            <Grid item xs={8}>
              <Controller
                name='type'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    select
                    fullWidth
                    error={!!errors.type}
                    {...field}
                    onChange={e => onFieldChange(field.onChange, e)}
                  >
                    {types.map((type, index) => (
                      <MenuItem key={index} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </CustomTextField>
                )}
              />
            </Grid>
          </Grid>
        </ListItem>
        <ListItem>
          <Grid container>
            <Grid item xs={4}>
              {t('common.url')}
            </Grid>
            <Grid item xs={8}>
              <Controller
                name='url'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    error={errors.url}
                    fullWidth
                    {...field}
                    onChange={e => onFieldChange(field.onChange, e)}
                  />
                )}
              />
            </Grid>
          </Grid>
        </ListItem>
        <ListItem>
          <Grid container>
            <Grid item xs={4}>
              {t('common.description')}
            </Grid>
            <Grid item xs={8}>
              <Controller
                name='description'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    rows={3}
                    multiline
                    error={errors.description}
                    fullWidth
                    {...field}
                    onChange={e => onFieldChange(field.onChange, e)}
                  />
                )}
              />
            </Grid>
          </Grid>
        </ListItem>
        <ListItem>
          <Grid container>
            <Grid item xs={4}>
              {t('common.method')}
            </Grid>
            <Grid item xs={8}>
              <Controller
                name='method'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    select
                    fullWidth
                    error={!!errors.method}
                    {...field}
                    onChange={e => onFieldChange(field.onChange, e)}
                  >
                    {methods.map((method, index) => (
                      <MenuItem key={index} value={method}>
                        {method}
                      </MenuItem>
                    ))}
                  </CustomTextField>
                )}
              />
            </Grid>
          </Grid>
        </ListItem>
        <ListItem>
          <Grid container>
            <Grid item xs={4}>
              {t('common.enableCaptcha')}
            </Grid>
            <Grid item xs={8}>
              <Controller
                name='enableCaptcha'
                control={control}
                render={({ field }) => (
                  <Widgets.Checkbox
                    fullWidth
                    {...field}
                    checked={field.value}
                    onChange={e => onFieldChange(field.onChange, e)}
                  />
                )}
              />
            </Grid>
          </Grid>
        </ListItem>
        <ListItem>
          <Grid container>
            <Grid item xs={4}>
              {t('common.decentralization')}
            </Grid>
            <Grid item xs={8}>
              <Controller
                name='roles'
                control={control}
                render={({ field }) => (
                  <Widgets.ArrayModel
                    schema={{
                      pageId: 4,
                      modelSelectMultiple: true,
                      modelSelectField: 'id,name$$Tên',
                      api: 'find_role'
                    }}
                    value={field.value}
                    onChange={roles => {
                      onFieldChange(field.onChange, roles)
                    }}
                  />
                )}
              />
            </Grid>
          </Grid>
        </ListItem>
        <ListItem>
          <Grid container>
            <Grid item xs={4}>
              {t('common.ignoreRoles')}
            </Grid>
            <Grid item xs={8}>
              <Controller
                name='ignoreRoles'
                control={control}
                render={({ field }) => (
                  <>
                    {field.value.map(value => (
                      <Grid container spacing={2} key={value.id} sx={{ mb: 2 }}>
                        <Grid item xs={5}>
                          <CustomTextField
                            fullWidth
                            value={value.field}
                            onChange={e => {
                              const data = field.value.map(data =>
                                data.id === value.id ? { ...data, field: e.target.value } : data
                              )
                              onFieldChange(field.onChange, data)
                            }}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <Widgets.ArrayModel
                            schema={{
                              pageId: 4,
                              modelSelectMultiple: true,
                              modelSelectField: 'id,name$$Tên',
                              api: 'find_role'
                            }}
                            value={value.roles}
                            onChange={roles => {
                              const data = field.value.map(data => (data.id === value.id ? { ...data, roles } : data))
                              onFieldChange(field.onChange, data)
                            }}
                          />
                        </Grid>
                        <Grid item xs={1}>
                          <Button
                            color='error'
                            variant='contained'
                            onClick={() => field.onChange(field.value.filter(data => data.id !== value.id))}
                          >
                            <Icon icon={'tabler:trash'}></Icon>
                          </Button>
                        </Grid>
                      </Grid>
                    ))}
                    <Button
                      variant='contained'
                      onClick={() => {
                        field.onChange([
                          ...field.value,
                          {
                            id: new Date().valueOf(),
                            field: '',
                            roles: []
                          }
                        ])
                      }}
                    >
                      {t('common.add')}
                    </Button>
                  </>
                )}
              />
            </Grid>
          </Grid>
        </ListItem>

        <ListItem>
          <Grid container>
            <Grid item xs={4}>
              {t('common.options')}
            </Grid>
            <Grid item xs={8}>
              <Controller
                name='options'
                control={control}
                render={({ field }) => <ArrayEditor {...field} onChange={e => onFieldChange(field.onChange, e)} />}
              />
            </Grid>
          </Grid>
        </ListItem>
        <ListItem>
          <Grid container>
            <Grid item xs={4}>
              {t('common.criterias')}
            </Grid>
            <Grid item xs={8}>
              <Controller
                name='criterias'
                control={control}
                render={({ field }) => <ArrayEditor {...field} onChange={e => onFieldChange(field.onChange, e)} />}
              />
            </Grid>
          </Grid>
        </ListItem>
        <ListItem>
          <Grid container>
            <Grid item xs={4}>
              {t('common.requestFields')}
            </Grid>
            <Grid item xs={8}>
              <Controller
                name='requestFields'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    error={errors.requestFields}
                    fullWidth
                    {...field}
                    onChange={e => onFieldChange(field.onChange, e)}
                  />
                )}
              />
            </Grid>
          </Grid>
        </ListItem>
        <ListItem>
          <Grid container>
            <Grid item xs={4}>
              {t('common.restrictFields')}
            </Grid>
            <Grid item xs={8}>
              <Controller
                name='restrictFields'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    error={errors.restrictFields}
                    fullWidth
                    {...field}
                    onChange={e => onFieldChange(field.onChange, e)}
                  />
                )}
              />
            </Grid>
          </Grid>
        </ListItem>
        <ListItem>
          <Grid container>
            <Grid item xs={4}>
              {t('common.responseFields')}
            </Grid>
            <Grid item xs={8}>
              <Controller
                name='responseFields'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    error={errors.responseFields}
                    fullWidth
                    {...field}
                    onChange={e => onFieldChange(field.onChange, e)}
                  />
                )}
              />
            </Grid>
          </Grid>
        </ListItem>
        <ListItem>
          <Grid container>
            <Grid item xs={4}>
              {t('common.fixedQuery')}
            </Grid>
            <Grid item xs={8}>
              <Controller
                name='fixedQuery'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    error={errors.fixedQuery}
                    fullWidth
                    {...field}
                    onChange={e => onFieldChange(field.onChange, e)}
                  />
                )}
              />
            </Grid>
          </Grid>
        </ListItem>
        <ListItem>
          <Grid container>
            <Grid item xs={4}>
              {t('common.boolExpression')}
            </Grid>
            <Grid item xs={8}>
              <Controller
                name='boolExpression'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    rows={3}
                    multiline
                    error={errors.boolExpression}
                    fullWidth
                    {...field}
                    onChange={e => onFieldChange(field.onChange, e)}
                  />
                )}
              />
            </Grid>
          </Grid>
        </ListItem>
        <ListItem>
          <Grid container>
            <Grid item xs={4}>
              {t('common.downloadReport')}
            </Grid>
            <Grid item xs={8}>
              <Controller
                name='downloadReport'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    error={errors.downloadReport}
                    fullWidth
                    {...field}
                    onChange={e => onFieldChange(field.onChange, e)}
                  />
                )}
              />
            </Grid>
          </Grid>
        </ListItem>
      </form>
    </CustomList>
  )
}

export default APIEditor
