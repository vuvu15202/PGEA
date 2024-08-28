import { Icon } from '@iconify/react'
import { Button, Grid, ListItem, ListItemSecondaryAction, ListItemText, MenuItem } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import * as yup from 'yup'

import { CustomList, defaultSchema } from 'src/pages/pageEditor/FormTab'
import CustomTextField from '../mui/text-field'
import Widgets from 'src/@core/schemas/Widgets'
import { yupResolver } from '@hookform/resolvers/yup'
import { WIDGETS } from 'src/@core/constants/widget'
import ArrayEditor from 'src/@core/schemas/ArrayEditor'
import { v4 } from 'uuid'

const yupSchema = yup.object({
  // name: yup.string().required(),
  // field: yup.string().required(),
  // placeholder: yup.string().required(),
  // roles: yup.array().required(),
  // required: yup.boolean(),
  // requiredExpression: yup.string().required(),
  // disabled: yup.boolean(),
  // disabledExpression: yup.string().required(),
  // hideExpression: yup.string().required(),
  // default: yup.string().required()
})

const dataTypes = Object.keys(WIDGETS)

const SchemaEdit = ({ schema, apis = [], onSave, showSave, setShowSave, onCopySchema }) => {
  const { t } = useTranslation()

  const {
    control,
    handleSubmit,
    getValues,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: {
      id: schema.id || v4(),
      name: schema.name || defaultSchema.name,
      field: schema.field || defaultSchema.field,
      placeholder: schema.placeholder || defaultSchema.placeholder,
      roles: schema.roles || defaultSchema.roles,
      required: schema.required || defaultSchema.required,
      requiredExpression: schema.requiredExpression || defaultSchema.requiredExpression,
      disabled: schema.disabled || defaultSchema.disabled,
      disabledExpression: schema.disabledExpression || defaultSchema.disabledExpression,
      type: schema.type || defaultSchema.type,
      widget: schema.widget || defaultSchema.widget,
      isArrayInput: schema.isArrayInput || defaultSchema.isArrayInput,
      numberOfLine: schema.numberOfLine || defaultSchema.numberOfLine,
      addButonName: schema.addButonName || defaultSchema.addButonName,
      min: schema.min || defaultSchema.min,
      max: schema.max || defaultSchema.max,
      regex: schema.regex || defaultSchema.regex,
      errorOnRegexFail: schema.errorOnRegexFail || defaultSchema.errorOnRegexFail,
      imageWidth: schema.imageWidth || defaultSchema.imageWidth,
      imageHeight: schema.imageHeight || defaultSchema.imageHeight,
      items: schema.items || defaultSchema.items,
      enableReadNumber: schema.enableReadNumber || defaultSchema.enableReadNumber,
      page: schema.page || defaultSchema.page,
      select: schema.select || defaultSchema.select,
      modelSelectField: schema.modelSelectField || defaultSchema.modelSelectField,
      hiddenWhere: schema.hiddenWhere || defaultSchema.hiddenWhere,
      showWithId: schema.showWithId || defaultSchema.showWithId,
      api: schema.api || defaultSchema.api,
      EnumButtonWidth: schema.enumButtonWidth || defaultSchema.enumButtonWidth,
      marginRight: schema.marginRight || defaultSchema.marginRight,
      hideExpression: schema.hideExpression || defaultSchema.hideExpression,
      default: schema.default || defaultSchema.default
    },
    resolver: yupResolver(yupSchema)
  })
  const watchType = watch('type', schema.type || defaultSchema.type)
  const watchWidget = watch('widget', schema.widget || defaultSchema.widget)
  const watchIsArrayInput = watch('isArrayInput', schema.isArrayInput || defaultSchema.isArrayInput)

  const onSubmit = data => {
    const payload = removeUnuseData(data)
    onSave(payload)
    setShowSave(false)
  }

  const removeUnuseData = data => {
    let {
      arrayInput,
      numberOfLine,
      addButonName,
      min,
      max,
      enableReadNumber,
      regex,
      errorOnRegexFail,
      imageWidth,
      imageHeight,
      items,
      EnumButtonWidth,
      marginRight,
      api,
      showWithId,
      hiddenWhere,
      modelSelectField,
      select,
      page,
      ...rest
    } = data

    if (data.widget === 'Text') {
      rest = { ...rest, arrayInput }
    }

    if (data.widget === 'TextArea' || data.widget === 'RichText') {
      rest = { ...rest, numberOfLine }
    }

    if (data.widget === 'ArrayFormViewer' || data.isArrayInput) {
      rest = { ...rest, addButonName }
    }

    if (data.widget === 'Text' && data.type === 'number') {
      rest = { ...rest, min, max, enableReadNumber }
    }

    if ((data.widget === 'Text' || data.widget === 'Password') && data.type === 'string') {
      rest = { ...rest, regex, errorOnRegexFail }
    }

    // if (data.widget === 'Image' || data.widget === 'ArrayImage') {
    //   rest = { ...rest, imageWidth, imageHeight }
    // }

    if (['EnumMultipleSelect', 'Enum', 'EnumButton'].includes(data.widget)) {
      rest = { ...rest, items }
    }

    if (data.widget === 'EnumButton' || data.widget === 'EnumMultipleSelect') {
      rest = { ...rest, EnumButtonWidth, marginRight }
    }

    if (data.widget === 'SingleModel' || data.widget === 'ArrayModel') {
      rest = { ...rest, api, showWithId, hiddenWhere, modelSelectField, select }
    }

    if (watchWidget === 'FormViewer' || watchWidget === 'ArrayFormViewer') {
      rest = { ...rest, page }
    }

    return rest
  }

  const onFieldChange = (onChange, e) => {
    onChange(e)
    if (!showSave) setShowSave(true)
  }

  const handleCopy = () => {
    const data = getValues()
    onCopySchema(data)
  }

  return (
    <CustomList>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ListItem disablePadding>
          <ListItemText primary={t('common.schema')} />
          <ListItemSecondaryAction>
            {showSave && (
              <Button variant='contained' color='primary' sx={{ mr: 2 }} type='submit'>
                <Icon fontSize={20} icon='tabler:check' />
                {t('common.save')}
              </Button>
            )}
            <Button
              disabled={showSave}
              variant='contained'
              color='primary'
              sx={{ mr: 2 }}
              type='button'
              onClick={handleCopy}
            >
              <Icon fontSize={20} icon='tabler:copy' />
              {t('common.copy')}
            </Button>
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
              {t('common.field')}
            </Grid>
            <Grid item xs={8}>
              <Controller
                name='field'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    error={errors.field}
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
              {t('common.placeholder')}
            </Grid>
            <Grid item xs={8}>
              <Controller
                name='placeholder'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    error={errors.placeholder}
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
              {t('common.requiredField')}
            </Grid>
            <Grid item xs={8}>
              <Controller
                name='required'
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
              {t('common.requiredExpression')}
            </Grid>
            <Grid item xs={8}>
              <Controller
                name='requiredExpression'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    error={errors.requiredExpression}
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
              {t('common.disabled')}
            </Grid>
            <Grid item xs={8}>
              <Controller
                name='disabled'
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
              {t('common.disabledExpression')}
            </Grid>
            <Grid item xs={8}>
              <Controller
                name='disabledExpression'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    error={errors.disabledExpression}
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
              {t('common.dataType')}
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
                    {dataTypes.map((dataType, index) => (
                      <MenuItem key={index} value={dataType}>
                        {dataType}
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
              {t('common.widget')}
            </Grid>
            <Grid item xs={8}>
              <Controller
                name='widget'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    select
                    fullWidth
                    error={!!errors.widget}
                    {...field}
                    onChange={e => onFieldChange(field.onChange, e)}
                  >
                    {WIDGETS?.[watchType]?.map((widget, index) => (
                      <MenuItem key={index} value={widget}>
                        {widget}
                      </MenuItem>
                    ))}
                  </CustomTextField>
                )}
              />
            </Grid>
          </Grid>
        </ListItem>
        {watchWidget === 'Text' && (
          <ListItem>
            <Grid container>
              <Grid item xs={4}>
                <Icon icon={'tabler:corner-down-right'} fontSize={20} />
                {t('common.arrayInput')}
              </Grid>
              <Grid item xs={8}>
                <Controller
                  name='arrayInput'
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
        {(watchWidget === 'TextArea' || watchWidget === 'RichText') && (
          <ListItem>
            <Grid container>
              <Grid item xs={4}>
                <Icon icon={'tabler:corner-down-right'} fontSize={20} />
                {t('common.numberOfLine')}
              </Grid>
              <Grid item xs={8}>
                <Controller
                  name='numberOfLine'
                  control={control}
                  render={({ field }) => (
                    <CustomTextField
                      type='number'
                      min={0}
                      error={errors.numberOfLine}
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
        {(watchIsArrayInput || watchWidget === 'ArrayFormViewer') && (
          <ListItem>
            <Grid container>
              <Grid item xs={4}>
                <Icon icon={'tabler:corner-down-right'} fontSize={20} />
                {t('common.addButonName')}
              </Grid>
              <Grid item xs={8}>
                <Controller
                  name='addButonName'
                  control={control}
                  render={({ field }) => (
                    <CustomTextField
                      error={errors.addButonName}
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
        {watchWidget === 'Text' && watchType === 'number' && (
          <>
            <ListItem>
              <Grid container>
                <Grid item xs={4}>
                  <Icon icon={'tabler:corner-down-right'} fontSize={20} />
                  {t('schema.min')}
                </Grid>
                <Grid item xs={8}>
                  <Controller
                    name='min'
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        type='number'
                        error={errors.min}
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
                  {t('schema.max')}
                </Grid>
                <Grid item xs={8}>
                  <Controller
                    name='max'
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        type='max'
                        error={errors.min}
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
                  {t('common.enableReadNumber')}
                </Grid>
                <Grid item xs={8}>
                  <Controller
                    name='enableReadNumber'
                    control={control}
                    render={({ field }) => (
                      <Widgets.Checkbox
                        fullWidth
                        {...field}
                        checked={field.enableReadNumber}
                        onChange={e => onFieldChange(field.onChange, e)}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </ListItem>
          </>
        )}
        {(watchWidget === 'Text' || watchWidget === 'Password') && watchType === 'string' && (
          <>
            <ListItem>
              <Grid container>
                <Grid item xs={4}>
                  <Icon icon={'tabler:corner-down-right'} fontSize={20} />
                  {t('common.regex')}
                </Grid>
                <Grid item xs={8}>
                  <Controller
                    name='regex'
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        error={errors.regex}
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
                  {t('common.errorOnRegexFail')}
                </Grid>
                <Grid item xs={8}>
                  <Controller
                    name='errorOnRegexFail'
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        error={errors.errorOnRegexFail}
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
        {(watchWidget === 'Image' || watchWidget === 'ArrayImage') && (
          <>
            <ListItem>
              <Grid container>
                <Grid item xs={4}>
                  <Icon icon={'tabler:corner-down-right'} fontSize={20} />
                  {t('common.imageWidth')}
                </Grid>
                <Grid item xs={8}>
                  <Controller
                    name='imageWidth'
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        error={errors.imageWidth}
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
                  {t('common.imageHeight')}
                </Grid>
                <Grid item xs={8}>
                  <Controller
                    name='imageHeight'
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        error={errors.imageHeight}
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
        {['EnumMultipleSelect', 'Enum', 'EnumButton'].includes(watchWidget) && (
          <ListItem>
            <Grid container>
              <Grid item xs={4}>
                <Icon icon={'tabler:corner-down-right'} fontSize={20} />
                {t('common.items')}
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
        {(watchWidget === 'EnumButton' || watchWidget === 'EnumMultipleSelect') && (
          <>
            <ListItem>
              <Grid container>
                <Grid item xs={4}>
                  <Icon icon={'tabler:corner-down-right'} fontSize={20} />
                  {t('common.width')} {`(%)`}
                </Grid>
                <Grid item xs={8}>
                  <Controller
                    name='EnumButtonWidth'
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        type='number'
                        min={0}
                        max={100}
                        error={errors.EnumButtonWidth}
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
                  {t('common.marginRight')}
                </Grid>
                <Grid item xs={8}>
                  <Controller
                    name='marginRight'
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
          </>
        )}
        {(watchWidget === 'SingleModel' || watchWidget === 'ArrayModel') && (
          <>
            <ListItem>
              <Grid container>
                <Grid item xs={4}>
                  <Icon icon={'tabler:corner-down-right'} fontSize={20} />
                  {t('schema.apiFunction')}
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
                  {t('common.showWithId')}
                </Grid>
                <Grid item xs={8}>
                  <Controller
                    name='showWithId'
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
                  <Icon icon={'tabler:corner-down-right'} fontSize={20} />
                  {t('schema.hiddenWhere')}
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
                  <Icon icon={'tabler:corner-down-right'} fontSize={20} />
                  {t('common.modelSelectField')}
                </Grid>
                <Grid item xs={8}>
                  <Controller
                    name='modelSelectField'
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        error={errors.modelSelectField}
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
                  {t('common.select')}
                </Grid>
                <Grid item xs={8}>
                  <Controller
                    name='select'
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        error={errors.select}
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
        {(watchWidget === 'FormViewer' || watchWidget === 'ArrayFormViewer') && (
          <ListItem>
            <Grid container>
              <Grid item xs={4}>
                <Icon icon={'tabler:corner-down-right'} fontSize={20} />
                {t('common.page')}
              </Grid>
              <Grid item xs={8}>
                <Controller
                  name='page'
                  control={control}
                  render={({ field }) => (
                    <CustomTextField
                      error={errors.page}
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
              {t('common.hideExpression')}
            </Grid>
            <Grid item xs={8}>
              <Controller
                name='hideExpression'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    error={errors.hideExpression}
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
              {t('common.default')}
            </Grid>
            <Grid item xs={8}>
              <Controller
                name='default'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    error={errors.default}
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

export default SchemaEdit
