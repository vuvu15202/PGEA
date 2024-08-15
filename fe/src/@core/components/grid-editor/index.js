import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import * as yup from 'yup'
import { CustomList } from 'src/pages/pageEditor/FormTab'
import { Button, Grid, ListItem, ListItemSecondaryAction, ListItemText, MenuItem } from '@mui/material'
import { Icon } from '@iconify/react'
import CustomTextField from '../mui/text-field'
import { dataTypes, defaultGrid, displays } from 'src/pages/pageEditor/gridTab'
import Widgets from 'src/@core/schemas/Widgets'
import ArrayEditor from 'src/@core/schemas/ArrayEditor'
import { v4 } from 'uuid'

const yupGrid = yup.object({
  // name: yup.string().required(),
  // field: yup.string().required(),
  // hideExpression: yup.string().required(),
  // roles: yup.array().required(),
  // type: yup.string().required(),
  // enumable: yup.boolean().required(),
  // modelSelect: yup.boolean().required(),
  // arraySelect: yup.boolean().required(),
  // filterRange: yup.boolean().required(),
  // stringID: yup.boolean().required(),
  // bindButton: yup.boolean().required()
})

const GridEditor = ({ grid, apis = [], onSave, showSave, setShowSave, onCopyGrid }) => {
  const { t } = useTranslation()

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors }
  } = useForm({
    defaultValues: {
      id: grid.id || v4(),
      name: grid.name || defaultGrid.name,
      field: grid.field || defaultGrid.field,
      hideExpression: grid.hideExpression || defaultGrid.hideExpression,
      roles: grid.roles || defaultGrid.roles,
      type: grid.type || defaultGrid.type,
      formatNumber: grid.formatNumber || defaultGrid.formatNumber,
      enumable: grid.enumable || defaultGrid.enumable,
      items: grid.items || defaultGrid.items,
      modelSelect: grid.modelSelect || defaultGrid.modelSelect,
      arraySelect: grid.arraySelect || defaultGrid.arraySelect,
      modelSelectApi: grid.modelSelectApi || defaultGrid.modelSelectApi,
      hiddenWhere: grid.hiddenWhere || defaultGrid.hiddenWhere,
      allowByPassHiddenWhere: grid.allowByPassHiddenWhere || defaultGrid.allowByPassHiddenWhere,
      modelSelectField: grid.modelSelectField || defaultGrid.modelSelectField,
      select: grid.select || defaultGrid.select,
      display: grid.display || defaultGrid.display,
      reverseColor: grid.reverseColor || defaultGrid.reverseColor,
      filterable: grid.filterable || defaultGrid.filterable,
      filterRange: grid.filterRange || defaultGrid.filterRange,
      stringID: grid.stringID || defaultGrid.stringID,
      bindButton: grid.bindButton || defaultGrid.bindButton
    },
    resolver: yupResolver(yupGrid)
  })
  const watchType = watch('type', grid.type || defaultGrid.type)
  const watchEnumable = watch('enumable', grid.enumable || defaultGrid.enumable)
  const watchModelSelect = watch('modelSelect', grid.modelSelect || defaultGrid.modelSelect)
  const watchArraySelect = watch('arraySelect', grid.arraySelect || defaultGrid.arraySelect)
  const watchDisplay = watch('display', grid.display || defaultGrid.display)
  const watchFilterable = watch('filterable', grid.filterable || defaultGrid.filterable)

  const onSubmit = data => {
    const payload = removeUnuseData(data)
    console.log(payload)
    onSave(payload)
    setShowSave(false)
  }

  const removeUnuseData = data => {
    let {
      formatNumber,
      items,
      modelSelectApi,
      hiddenWhere,
      allowByPassHiddenWhere,
      modelSelectField,
      select,
      reverseColor,
      filterRange,
      stringID,
      ...rest
    } = data

    if (data.type === 'number') {
      rest = { ...rest, formatNumber }
    }

    if (data.enumable) {
      rest = { ...rest, items }
    }

    if (data.modelSelect || data.arraySelect) {
      rest = { ...rest, modelSelectApi, hiddenWhere, allowByPassHiddenWhere, modelSelectField, select }
    }

    if (data.display === 'progressbar') {
      rest = { ...rest, reverseColor }
    }

    if (data.filterable && data.type === 'string') {
      rest = { ...rest, filterRange }
    } else {
      rest = { ...rest, stringID }
    }

    return rest
  }

  const onFieldChange = (onChange, e) => {
    onChange(e)
    if (!showSave) setShowSave(true)
  }

  const handleCopy = () => {
    const data = getValues()
    onCopyGrid(data)
  }

  return (
    <CustomList>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ListItem disablePadding>
          <ListItemText primary={t('common.column')} />
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
              {t('grid.name')}
            </Grid>
            <Grid item xs={8}>
              <Controller
                name='name'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    error={!!errors.name}
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
              {t('grid.field')}
            </Grid>
            <Grid item xs={8}>
              <Controller
                name='field'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    error={!!errors.field}
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
              {t('grid.hideExpression')}
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
              {t('grid.type')}
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
                    {dataTypes.map((type, index) => (
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

        {watchType === 'number' && (
          <ListItem>
            <Grid container>
              <Grid item xs={4}>
                {t('grid.formatNumber')}
              </Grid>
              <Grid item xs={8}>
                <Controller
                  name='formatNumber'
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
        )}
        <ListItem>
          <Grid container>
            <Grid item xs={4}>
              {t('grid.enumable')}
            </Grid>
            <Grid item xs={8}>
              <Controller
                name='enumable'
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
        {watchEnumable && (
          <ListItem>
            <Grid container>
              <Grid item xs={4}>
                {t('grid.items')}
              </Grid>
              <Grid item xs={8}>
                <Controller
                  name='items'
                  control={control}
                  render={({ field }) => <ArrayEditor {...field} onChange={e => onFieldChange(field.onChange, e)} />}
                />
              </Grid>
            </Grid>
          </ListItem>
        )}
        <ListItem>
          <Grid container>
            <Grid item xs={4}>
              {t('grid.csdl')}
            </Grid>
            <Grid item xs={8}>
              <Grid container>
                <Grid item xs={6}>
                  <Controller
                    name='modelSelect'
                    control={control}
                    render={({ field }) => (
                      <>
                        <span>Single select</span>
                        <Widgets.Checkbox
                          fullWidth
                          {...field}
                          checked={field.value}
                          onChange={e => {
                            onFieldChange(field.onChange, e)
                            setValue('arraySelect', false)
                          }}
                        />
                      </>
                    )}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Controller
                    name='arraySelect'
                    control={control}
                    render={({ field }) => (
                      <>
                        <span>Array select</span>
                        <Widgets.Checkbox
                          fullWidth
                          {...field}
                          checked={field.value}
                          onChange={e => {
                            onFieldChange(field.onChange, e)
                            setValue('modelSelect', false)
                          }}
                        />
                      </>
                    )}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </ListItem>
        {(watchModelSelect || watchArraySelect) && (
          <>
            <ListItem>
              <Grid container>
                <Grid item xs={4}>
                  {t('grid.modelSelectApi')}
                </Grid>
                <Grid item xs={8}>
                  <Controller
                    name='modelSelectApi'
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        select
                        fullWidth
                        error={!!errors.modelSelectApi}
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
                  {t('grid.hiddenWhere')}
                </Grid>
                <Grid item xs={8}>
                  <Controller
                    name='hiddenWhere'
                    control={control}
                    render={({ field }) => <ArrayEditor {...field} onChange={e => onFieldChange(field.onChange, e)} />}
                  />
                </Grid>
              </Grid>
            </ListItem>
            <ListItem>
              <Grid container>
                <Grid item xs={4}>
                  {t('grid.allowByPassHiddenWhere')}
                </Grid>
                <Grid item xs={8}>
                  <Controller
                    name='allowByPassHiddenWhere'
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
                  {t('grid.modelSelectField')}
                </Grid>
                <Grid item xs={8}>
                  <Controller
                    name='modelSelectField'
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        error={!!errors.modelSelectField}
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
                  {t('grid.select')}
                </Grid>
                <Grid item xs={8}>
                  <Controller
                    name='select'
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        error={!!errors.select}
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
              {t('grid.display')}
            </Grid>
            <Grid item xs={8}>
              <Controller
                name='display'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    select
                    fullWidth
                    error={!!errors.display}
                    {...field}
                    onChange={e => onFieldChange(field.onChange, e)}
                  >
                    {displays.map((display, index) => (
                      <MenuItem key={index} value={display}>
                        {display || 'None'}
                      </MenuItem>
                    ))}
                  </CustomTextField>
                )}
              />
            </Grid>
          </Grid>
        </ListItem>

        {watchDisplay === 'progressbar' && (
          <ListItem>
            <Grid container>
              <Grid item xs={4}>
                {t('grid.reverseColor')}
              </Grid>
              <Grid item xs={8}>
                <Controller
                  name='reverseColor'
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
        )}
        <ListItem>
          <Grid container>
            <Grid item xs={4}>
              {t('grid.filterable')}
            </Grid>
            <Grid item xs={8}>
              <Controller
                name='filterable'
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

        {watchFilterable && watchType !== 'string' ? (
          <ListItem>
            <Grid container>
              <Grid item xs={4}>
                {t('grid.filterRange')}
              </Grid>
              <Grid item xs={8}>
                <Controller
                  name='filterRange'
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
        ) : (
          <ListItem>
            <Grid container>
              <Grid item xs={4}>
                {t('grid.stringID')}
              </Grid>
              <Grid item xs={8}>
                <Controller
                  name='stringID'
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
        )}

        <ListItem>
          <Grid container>
            <Grid item xs={4}>
              {t('grid.bindButton')}
            </Grid>
            <Grid item xs={8}>
              <Controller
                name='bindButton'
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

export default GridEditor
