import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import * as React from 'react'

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
          return React.cloneElement(child as React.ReactElement, {
            onSubmit,
            onClose
          })
        })}
      </Dialog>
    </div>
  )
}
