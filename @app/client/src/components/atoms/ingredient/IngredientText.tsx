import { Typography } from '@mui/material'
import React from 'react'

interface IngredientTextProps {
  children: React.ReactNode
}
export default function IngredientText({ children }: IngredientTextProps) {
  return (
    <Typography component={'p'} sx={{ textAlign: 'center' }}>
      {children}
    </Typography>
  )
}
