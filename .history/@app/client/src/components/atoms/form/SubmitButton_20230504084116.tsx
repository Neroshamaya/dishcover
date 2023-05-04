import { Button } from '@mui/material'
import React from 'react'
interface SubmitButtonProps {
  children: React.ReactNode
  onSubmit: () => void
}
export default function SubmitButton({ children, onSubmit }: SubmitButtonProps) {
  return (
    <Button variant="contained" size="medium" type="submit" onClick={onSubmit}>
      {children}
    </Button>
  )
}
