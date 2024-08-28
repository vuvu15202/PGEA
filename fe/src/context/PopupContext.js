import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Fade } from '@mui/material'
import { createContext, forwardRef, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

const defaultProvider = {
  message: null,
  setMessage: () => {}
}

const Transition = forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />
})

const PopupContext = createContext(defaultProvider)

const PopupProvider = ({ children }) => {
  const { t } = useTranslation()
  const [message, setMessage] = useState(defaultProvider.message)

  return (
    <PopupContext.Provider value={{ message, setMessage }}>
      {children}
      <Dialog
        fullWidth
        open={!!message}
        maxWidth='md'
        scroll='body'
        onClose={() => setMessage(defaultProvider.message)}
        TransitionComponent={Transition}
      >
        <DialogTitle>Success</DialogTitle>
        <DialogContent>{message}</DialogContent>
        <DialogActions sx={{ justifyContent: 'space-between' }}>
          <Button
            variant='contained'
            onClick={() => {
              navigator.clipboard.writeText(message?.trim())
              toast.success(t('common.copyToClipboard'))
            }}
          >
            {t('common.copyMessage')}
          </Button>
          <Button variant='contained' color='secondary' onClick={() => setMessage(defaultProvider.message)}>
            {t('common.close')}
          </Button>
        </DialogActions>
      </Dialog>
    </PopupContext.Provider>
  )
}

export { PopupContext, PopupProvider }
