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
  onSubmit: () => void
  onClose: () => void
  open: boolean
}

export default function ModalFormDialog({
  children,
  open = false,
  onSubmit,
  onClose
}: ModalFormDialogProps) {
  return (
    <div>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Subscribe</DialogTitle>
        {React.Children.map(children, (child) => {
          // Pass additional props to children components
          return React.cloneElement(child as React.ReactElement<any>, {
            additionalProp: 'Hello from ParentComponent'
          })
        })}
      </Dialog>
    </div>
  )
}