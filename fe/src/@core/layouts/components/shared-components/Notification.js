import { Box, Card, Dialog, DialogContent, DialogTitle, IconButton, Modal } from '@mui/material'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import List from 'src/pages/list'
import { Icon } from '@iconify/react'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: '900px'
}

const Notification = () => {
  const { t } = useTranslation()

  const [openModal, setOpenModal] = useState(false)

  return (
    <>
      <IconButton color='inherit' aria-haspopup='true' onClick={() => setOpenModal(true)}>
        <Icon fontSize='1.625rem' icon='tabler:bell' />
      </IconButton>

      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box style={style}>
          <Card sx={{ p: 5 }}>
            <List query={{ page: 23 }} />
          </Card>
        </Box>
      </Modal>
    </>
  )
}

export default Notification
