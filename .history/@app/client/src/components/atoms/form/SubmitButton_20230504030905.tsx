import { Button } from '@mui/material'
import React from 'react'
interface SubmitButtonProps {
  children: React.ReactNode
}
export default function SubmitButton({ children }: SubmitButtonProps) {
  return (
    <Button variant="contained" size="medium" type="submit">
      {children}
    </Button>
  )
}
