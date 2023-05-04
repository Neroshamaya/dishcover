import { TextField } from '@mui/material'
import React from 'react'
interface TextFieldProps {
  children: React.ReactNode
}
export default function SubmitButton({ children }: TextFieldProps) {
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
