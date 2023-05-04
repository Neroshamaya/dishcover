import { TextField } from '@mui/material'
import React from 'react'
interface SubmitButtonProps {
  children: React.ReactNode
}
export default function SubmitButton({ children }: SubmitButtonProps) {
  return (
    <TextField
      error={errorMessage.length > 1}
      id="filled-error"
      label="Error"
      helperText={errorMessage}
      defaultValue="Hello World"
      variant="filled"
    />
  )
}
