interface ModalFormProps {}
import * as React from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

interface ModalFormDialogProps {
  children: React.ReactNode
}

export default function ModalFormDialog({ children }: ModalFormDialogProps) {
  const [open, setOpen] = React.useState(false)

  const openModal = () => {
    setOpen(true)
  }

  const closeModal = () => {
    setOpen(false)
  }

  return (
    <div>
      <Button variant="outlined" onClick={openModal}>
        Open form dialog
      </Button>
      <Dialog open={open} onClose={closeModal}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>{children}</DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Create</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
