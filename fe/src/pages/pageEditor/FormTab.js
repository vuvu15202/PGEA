import { Icon } from '@iconify/react'
import {
  Button,
  CircularProgress,
  Dialog,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemSecondaryAction,
  ListItemText,
  MenuItem,
  styled
} from '@mui/material'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useTranslation } from 'react-i18next'

import CustomTextField from 'src/@core/components/mui/text-field'
import { WIDGETS } from 'src/@core/constants/widget'
import Widgets from 'src/@core/schemas/Widgets'
import SchemaEdit from 'src/@core/components/schema-edit'
import { v4 } from 'uuid'

export const CustomList = styled(List)(({ theme }) => ({
  '&': {
    padding: 0
  },
  '& .MuiListItem-container': {
    border: `1px solid ${theme.palette.divider}`,
    '&:first-of-type': {
      borderTopLeftRadius: theme.shape.borderRadius,
      borderTopRightRadius: theme.shape.borderRadius,
      padding: '8px 20px'
    }
  },
  '& .MuiListItem-root': {
    '&:not(:first-child)': {
      borderLeft: `1px solid ${theme.palette.divider}`,
      borderBottom: `1px solid ${theme.palette.divider}`,
      borderRight: `1px solid ${theme.palette.divider}`
    },
    '&:last-child': {
      borderBottomLeftRadius: theme.shape.borderRadius,
      borderBottomRightRadius: theme.shape.borderRadius,
      '& .MuiButtonBase-root': {
        borderBottomLeftRadius: theme.shape.borderRadius,
        borderBottomRightRadius: theme.shape.borderRadius
      }
    }
  }
}))

const dataTypes = Object.keys(WIDGETS)

export const defaultSchema = {
  name: '',
  field: '',
  placeholder: '',
  roles: [],
  required: false,
  requiredExpression: '',
  disabled: false,
  disabledExpression: '',
  type: dataTypes[0],
  widget: '',
  isArrayInput: false,
  numberOfLine: 5,
  addButonName: '',
  min: '',
  max: '',
  regex: '',
  errorOnRegexFail: '',
  imageWidth: '',
  imageHeight: '',
  items: [],
  addButonName: '',
  enableReadNumber: false,
  page: '',
  select: '',
  modelSelectField: '',
  hiddenWhere: [],
  showWithId: false,
  api: '',
  EnumButtonWidth: 0,
  marginRight: '',
  hideExpression: '',
  default: ''
}

const FormTab = ({ apis = [], schema = [], onChange, showSave, setShowSave }) => {
  const { t } = useTranslation()

  const [selectedTab, setSelectedTab] = useState(schema?.[0]?.id)
  const [listSchema, setListSchema] = useState(schema)
  const [selectedSchema, setSelectedSchema] = useState(schema?.[0])
  const [loadingSelectSchema, setLoadingSelectSchema] = useState(false)

  useEffect(() => {
    onChange && onChange(listSchema)
  }, [listSchema, onChange])

  const handleAddSchema = () => {
    setListSchema(prev => [...prev, { ...defaultSchema, id: v4() }])
  }

  const handleRemoveSchema = id => {
    if (!window.confirm(t('message.confirmRemove', { value: t('common.schema') }))) return
    setListSchema(prev => prev.filter(schema => schema.id !== id))
    if (selectedSchema && selectedSchema.id === id) {
      setSelectedSchema(null)
      setSelectedTab(null)
    }
  }

  const handleSelectSchema = id => {
    if (showSave && !window.confirm(t('message.notSaveConfirm', { value: t('common.schema') }))) return

    const schema = listSchema.find(schema => schema.id === id)
    if (!schema) return

    setSelectedSchema(() => null)

    setLoadingSelectSchema(true)
    setSelectedTab(schema.id)
    showSave && setShowSave(false)
    setTimeout(() => {
      setSelectedSchema(() => schema)
      setLoadingSelectSchema(false)
    }, 200)
  }

  const handleSaveSchema = data => {
    setListSchema(prev => prev.map(schema => (schema.id === data.id ? data : schema)))
  }

  const onCopySchema = data => {
    const target = listSchema.findIndex(schema => schema.id === data.id)

    if (target >= 0) {
      const newListSchema = [...listSchema.slice(0, target + 1), { ...data, id: v4() }, ...listSchema.slice(target + 1)]

      setListSchema(() => newListSchema)
    }
  }

  return (
    <Grid container spacing={4}>
      <Grid item xs={2} style={{ paddingLeft: 0 }}>
        <CustomList>
          <ListItem disablePadding>
            <ListItemText primary={t('common.schema')} />
            <ListItemSecondaryAction>
              <IconButton edge='end' onClick={handleAddSchema}>
                <Icon icon='tabler:plus' fontSize={20} />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          {listSchema.map((schema, index) => (
            <ListItem disablePadding key={schema.id}>
              <ListItemButton selected={selectedTab === schema.id} onClick={e => handleSelectSchema(schema.id)}>
                <ListItemText primary={schema.name || `No Name ${index + 1}`} />
                <ListItemSecondaryAction>
                  <IconButton edge='end'>
                    <Icon
                      icon='tabler:trash'
                      fontSize={20}
                      onClick={e => {
                        e.stopPropagation()
                        handleRemoveSchema(schema.id)
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
        {loadingSelectSchema && (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '5rem' }}>
            <CircularProgress />
          </div>
        )}
        {selectedSchema && (
          <SchemaEdit
            schema={selectedSchema}
            apis={apis}
            onSave={handleSaveSchema}
            showSave={showSave}
            setShowSave={setShowSave}
            onCopySchema={onCopySchema}
          />
        )}
      </Grid>
    </Grid>
  )
}

export default FormTab
