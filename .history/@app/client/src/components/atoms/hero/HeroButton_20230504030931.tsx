import { Button } from '@mui/material'
import React from 'react'
interface SubmitButtonProps {
  children: React.ReactNode
}
export default function HeroButton({ children }: SubmitButtonProps) {
  return (
    <Button variant="contained" size="large" type="button">
      {children}
    </Button>
  )
}
