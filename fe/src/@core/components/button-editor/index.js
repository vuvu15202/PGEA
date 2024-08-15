import { useTranslation } from 'react-i18next'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'

import { CustomList } from 'src/pages/pageEditor/FormTab'
import { Button, Grid, ListItem, ListItemSecondaryAction, ListItemText, MenuItem } from '@mui/material'
import { Icon } from '@iconify/react'
import CustomTextField from '../mui/text-field'
import { defaultButton } from 'src/pages/pageEditor/ButtonTab'
import Widgets from 'src/@core/schemas/Widgets'
import { BUTTON_ACTIONS, BUTTON_COLORS, BUTTON_TYPES, URL_TARGETS } from 'src/@core/constants/widget'
import { v4 } from 'uuid'

const yupButton = yup.object({
  // mode: yup.string().required(),
  // title: yup.string().required(),
  // roles: yup.array(),
  // color: yup.string().required(),
  // outline: yup.boolean().required(),
  // icon: yup.string().required(),
  // column: yup.string().required(),
  // hideExpression: yup.string().required(),
  // action: yup.string().required(),
  // confirm: yup.string().required(),
  // backOnDone: yup.boolean().required(),
  // embedUrl: yup.boolean().required(),
  // type: yup.string().required(),
  // showOnTop: yup.boolean().required(),
  // showOnFormOnly: yup.boolean().required()
})

const button_colors = Object.values(BUTTON_COLORS)
const button_types = Object.values(BUTTON_TYPES)
const button_actions = Object.values(BUTTON_ACTIONS)
const url_targets = Object.values(URL_TARGETS)

const ButtonEditor = ({ button, apis = [], onSave, showSave, setShowSave, onCopyButton }) => {
  const { t } = useTranslation()

  const {
    control,
    handleSubmit,
    watch,
    getValues,
    formState: { errors }
  } = useForm({
    defaultValues: {
      id: button.id || v4(),
      mode: button.mode || defaultButton.mode,
      title: button.title || defaultButton.title,
      roles: button.roles || defaultButton.roles,
      color: button.color || defaultButton.color,
      outline: button.outline || defaultButton.outline,
      icon: button.icon || defaultButton.icon,
      column: button.column || defaultButton.column,
      hideExpression: button.hideExpression || defaultButton.hideExpression,
      action: button.action || defaultButton.action,
      reportName: button.reportName || defaultButton.reportName,
      modalQuery: button.modalQuery || defaultButton.modalQuery,
      url: button.url || defaultButton.url,
      target: button.target || defaultButton.target,
      api: button.api || defaultButton.api,
      apiData: button.apiData || defaultButton.apiData,
      confirm: button.confirm || defaultButton.confirm,
      backOnDone: button.backOnDone || defaultButton.backOnDone,
      backOnDoneHref: button.backOnDoneHref || defaultButton.backOnDoneHref,
      embedUrl: button.embedUrl || defaultButton.embedUrl,
      type: button.type || defaultButton.type,
      showOnTop: button.showOnTop || defaultButton.showOnTop,
      showOnFormOnly: button.showOnFormOnly || defaultButton.showOnFormOnly
    },
    resolver: yupResolver(yupButton)
  })

  const watchAction = watch('action', button.action || defaultButton.action)
  const watchBackOnDone = watch('backOnDone', button.backOnDone || defaultButton.backOnDone)

  const onSubmit = data => {
    const payload = removeUnuseData(data)
    console.log(payload)
    onSave(data)
    setShowSave(false)
  }

  const removeUnuseData = data => {
    const { reportName, modalQuery, url, target, api, apiData, ...rest } = data

    if (!data.action || data.action === BUTTON_ACTIONS.DISABLE || data.action === BUTTON_ACTIONS.NONE) {
      return { ...rest, action: '' }
    }

    if (data.action === BUTTON_ACTIONS.REPORT) {
      return { ...rest, reportName, api, apiData }
    }

    if (data.action === BUTTON_ACTIONS.FORM_MODAL || data.action === BUTTON_ACTIONS.LIST_MODAL) {
      return { ...rest, modalQuery }
    }

    if (data.action === BUTTON_ACTIONS.URL) {
      return { ...rest, url, target }
    }

    if (data.action === BUTTON_ACTIONS.API || data.action === BUTTON_ACTIONS.REPORT) {
      return { ...rest, api, apiData }
    }

    return rest
  }

  const onFieldChange = (onChange, e) => {
    onChange(e)
    if (!showSave) setShowSave(true)
  }

  const handleCopy = () => {
    const data = getValues()
    onCopyButton(data)
  }

  return (
    <CustomList>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ListItem disablePadding>
          <ListItemText primary={t('common.button')} />
          <ListItemSecondaryAction>
            {showSave && (
              <Button variant='contained' color='primary' sx={{ mr: 2 }} type='submit'>
                <Icon fontSize={20} icon='tabler:check' />
                {t('common.save')}
              </Button>
            )}
            <Button disabled={showSave} variant='contained' color='primary' sx={{ mr: 2 }} onClick={handleCopy}>
              <Icon fontSize={20} icon='tabler:copy' />
              {t('common.copy')}
            </Button>
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem>
          <Grid container>
            <Grid item xs={4}>
              {t('button.mode')}
            </Grid>
            <Grid item xs={8}>
              <Controller
                name='mode'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    error={!!errors.mode}
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
              {t('common.name')}
            </Grid>
            <Grid item xs={8}>
              <Controller
                name='title'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    error={!!errors.title}
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
              {t('button.color')}
            </Grid>
            <Grid item xs={8}>
              <Controller
                name='color'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    select
                    fullWidth
                    error={!!errors.color}
                    {...field}
                    onChange={e => onFieldChange(field.onChange, e)}
                  >
                    {button_colors.map((color, index) => (
                      <MenuItem key={index} value={color}>
                        {color}
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
              {t('common.outline')}
            </Grid>
            <Grid item xs={8}>
              <Controller
                name='outline'
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
              {t('button.icon')}
            </Grid>
            <Grid item xs={8}>
              <Controller
                name='icon'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    error={!!errors.icon}
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
              {t('button.showOnColumn')}
            </Grid>
            <Grid item xs={8}>
              <Controller
                name='column'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    error={!!errors.column}
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
              {t('button.hideExpression')}
            </Grid>
            <Grid item xs={8}>
              <Controller
                name='hideExpression'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    error={!!errors.hideExpression}
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
              {t('button.action')}
            </Grid>
            <Grid item xs={8}>
              <Controller
                name='action'
                control={control}
                render={({ field }) => {
                  return (
                    <CustomTextField
                      select
                      fullWidth
                      error={!!errors.action}
                      {...field}
                      onChange={e => {
                        onFieldChange(field.onChange, e)
                      }}
                    >
                      {button_actions.map((action, index) => (
                        <MenuItem key={index} value={action}>
                          {action}
                        </MenuItem>
                      ))}
                    </CustomTextField>
                  )
                }}
              />
            </Grid>
          </Grid>
        </ListItem>
        {watchAction === BUTTON_ACTIONS.REPORT && (
          <ListItem>
            <Grid container>
              <Grid item xs={4}>
                <Icon icon={'tabler:corner-down-right'} fontSize={20} />
                {t('button.fileName')}
              </Grid>
              <Grid item xs={8}>
                <Controller
                  name='reportName'
                  control={control}
                  render={({ field }) => (
                    <CustomTextField
                      error={!!errors.reportName}
                      fullWidth
                      {...field}
                      onChange={e => onFieldChange(field.onChange, e)}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </ListItem>
        )}
        {(watchAction === BUTTON_ACTIONS.FORM_MODAL || watchAction === BUTTON_ACTIONS.LIST_MODAL) && (
          <ListItem>
            <Grid container>
              <Grid item xs={4}>
                <Icon icon={'tabler:corner-down-right'} fontSize={20} />
                {t('button.modalQuery')}
              </Grid>
              <Grid item xs={8}>
                <Controller
                  name='modalQuery'
                  control={control}
                  render={({ field }) => (
                    <CustomTextField
                      error={!!errors.modalQuery}
                      fullWidth
                      {...field}
                      onChange={e => onFieldChange(field.onChange, e)}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </ListItem>
        )}
        {watchAction === BUTTON_ACTIONS.URL && (
          <>
            <ListItem>
              <Grid container>
                <Grid item xs={4}>
                  <Icon icon={'tabler:corner-down-right'} fontSize={20} />
                  {t('button.url')}
                </Grid>
                <Grid item xs={8}>
                  <Controller
                    name='url'
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        error={!!errors.url}
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
                  <Icon icon={'tabler:corner-down-right'} fontSize={20} />
                  {t('button.target')}
                </Grid>
                <Grid item xs={8}>
                  <Controller
                    name='target'
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        select
                        fullWidth
                        error={!!errors.target}
                        {...field}
                        onChange={e => onFieldChange(field.onChange, e)}
                      >
                        {url_targets.map((target, index) => (
                          <MenuItem key={index} value={target}>
                            {target}
                          </MenuItem>
                        ))}
                      </CustomTextField>
                    )}
                  />
                </Grid>
              </Grid>
            </ListItem>
          </>
        )}
        {(watchAction === BUTTON_ACTIONS.API || watchAction === BUTTON_ACTIONS.REPORT) && (
          <>
            <ListItem>
              <Grid container>
                <Grid item xs={4}>
                  <Icon icon={'tabler:corner-down-right'} fontSize={20} />
                  {t('button.api')}
                </Grid>
                <Grid item xs={8}>
                  <Controller
                    name='api'
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        select
                        fullWidth
                        error={!!errors.api}
                        {...field}
                        onChange={e => onFieldChange(field.onChange, e)}
                      >
                        {apis.map((api, index) => (
                          <MenuItem key={index} value={api.name}>
                            {api.name}
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
                  <Icon icon={'tabler:corner-down-right'} fontSize={20} />
                  {t('button.apiData')}
                </Grid>
                <Grid item xs={8}>
                  <Controller
                    name='apiData'
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        error={!!errors.apiData}
                        fullWidth
                        {...field}
                        onChange={e => onFieldChange(field.onChange, e)}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </ListItem>
          </>
        )}

        <ListItem>
          <Grid container>
            <Grid item xs={4}>
              {t('button.confirm')}
            </Grid>
            <Grid item xs={8}>
              <Controller
                name='confirm'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    error={!!errors.confirm}
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
              {t('button.backOnDone')}
            </Grid>
            <Grid item xs={8}>
              <Controller
                name='backOnDone'
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
        {watchBackOnDone && (
          <ListItem>
            <Grid container>
              <Grid item xs={4}>
                {t('button.backOnDoneHref')}
              </Grid>
              <Grid item xs={8}>
                <Controller
                  name='backOnDoneHref'
                  control={control}
                  render={({ field }) => (
                    <CustomTextField
                      error={!!errors.backOnDoneHref}
                      placeholder='href'
                      fullWidth
                      {...field}
                      onChange={e => onFieldChange(field.onChange, e)}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </ListItem>
        )}
        <ListItem>
          <Grid container>
            <Grid item xs={4}>
              {t('button.embedUrl')}
            </Grid>
            <Grid item xs={8}>
              <Controller
                name='embedUrl'
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
              {t('button.type')}
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
                    {button_types.map((type, index) => (
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
              {t('button.showOnTop')}
            </Grid>
            <Grid item xs={8}>
              <Controller
                name='showOnTop'
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
              {t('button.showOnFormOnly')}
            </Grid>
            <Grid item xs={8}>
              <Controller
                name='showOnFormOnly'
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
      </form>
    </CustomList>
  )
}

export default ButtonEditor
