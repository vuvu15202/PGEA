import { useEffect, useState } from 'react'
import {
  CircularProgress,
  Grid,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemSecondaryAction,
  ListItemText
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Icon } from '@iconify/react'

import { CustomList } from './FormTab'
import ButtonEditor from 'src/@core/components/button-editor'
import { BUTTON_ACTIONS, BUTTON_COLORS, BUTTON_TYPES, URL_TARGETS } from 'src/@core/constants/widget'
import { v4 } from 'uuid'

export const defaultButton = {
  mode: '',
  title: '',
  roles: [],
  color: BUTTON_COLORS.DEFAULT,
  outline: false,
  icon: '',
  column: '',
  hideExpression: '',
  action: BUTTON_ACTIONS.NONE,
  reportName: '',
  modalQuery: '',
  url: '',
  target: URL_TARGETS._self,
  api: '',
  apiData: '',
  confirm: '',
  backOnDone: false,
  backOnDoneHref: '',
  embedUrl: false,
  type: BUTTON_TYPES.BUTTON,
  showOnTop: false,
  showOnFormOnly: false
}

const ButtonTab = ({ buttons = [], apis = [], onChange, showSave, setShowSave }) => {
  const { t } = useTranslation()

  const [selectedTab, setSelectedTab] = useState(buttons?.[0]?.id)
  const [listButton, setListButton] = useState(buttons)
  const [selectedButton, setSelectedButton] = useState(buttons?.[0])
  const [loadingSelectButton, setLoadingSelectButton] = useState(false)

  useEffect(() => {
    onChange && onChange(listButton)
  }, [listButton, onChange])

  const handleAddButton = () => {
    setListButton(prev => [...prev, { ...defaultButton, id: v4() }])
  }

  const handleSelectButton = id => {
    if (showSave && !window.confirm(t('message.notSaveConfirm', { value: t('common.button') }))) return

    const button = listButton.find(button => button.id === id)
    if (!button) return

    setSelectedButton(() => null)

    setLoadingSelectButton(true)
    setSelectedTab(button.id)
    showSave && setShowSave(false)
    setTimeout(() => {
      setSelectedButton(() => button)
      setLoadingSelectButton(false)
    }, 200)
  }

  const handleRemoveButton = id => {
    if (!window.confirm(t('message.confirmRemove', { value: t('common.button') }))) return
    setListButton(prev => prev.filter(button => button.id !== id))
    if (selectedButton && selectedButton.id === id) {
      setSelectedButton(null)
      setSelectedTab(null)
    }
  }

  const handleSaveButton = data => {
    setListButton(prev => prev.map(button => (button.id === data.id ? data : button)))
  }

  const onCopyButton = data => {
    const target = listButton.findIndex(button => button.id === data.id)

    if (target >= 0) {
      const newListButton = [...listButton.slice(0, target + 1), { ...data, id: v4() }, ...listButton.slice(target + 1)]

      setListButton(() => newListButton)
    }
  }

  return (
    <Grid container spacing={4}>
      <Grid item xs={2} style={{ paddingLeft: 0 }}>
        <CustomList>
          <ListItem disablePadding>
            <ListItemText primary={t('common.button')} />
            <ListItemSecondaryAction>
              <IconButton edge='end' onClick={handleAddButton}>
                <Icon icon='tabler:plus' fontSize={20} />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          {listButton.map((button, index) => (
            <ListItem disablePadding key={button.id}>
              <ListItemButton selected={selectedTab === button.id} onClick={e => handleSelectButton(button.id)}>
                <ListItemText primary={button.mode || `No Name ${index + 1}`} />
                <ListItemSecondaryAction>
                  <IconButton edge='end'>
                    <Icon
                      icon='tabler:trash'
                      fontSize={20}
                      onClick={e => {
                        e.stopPropagation()
                        handleRemoveButton(button.id)
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
        {loadingSelectButton && (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '5rem' }}>
            <CircularProgress />
          </div>
        )}
        {selectedButton && (
          <ButtonEditor
            button={selectedButton}
            apis={apis}
            onSave={handleSaveButton}
            showSave={showSave}
            setShowSave={setShowSave}
            onCopyButton={onCopyButton}
          />
        )}
      </Grid>
    </Grid>
  )
}

export default ButtonTab
