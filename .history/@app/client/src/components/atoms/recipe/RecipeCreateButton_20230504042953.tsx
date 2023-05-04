import { Button } from '@mui/material'
import React from 'react'

interface RecipeCreateButtonProps {
  children: React.ReactNode
  onClick: () => void
}
export default function RecipeCreateButton({ children, onClick }: RecipeCreateButtonProps) {
  return (
    <Button variant="contained" size="large" onClick={}>
      {children}
    </Button>
  )
}
