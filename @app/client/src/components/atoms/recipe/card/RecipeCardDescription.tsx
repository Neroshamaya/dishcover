import { Typography } from '@mui/material'
import React from 'react'

interface RecipeCardDescriptionProps {
  children: React.ReactNode
}
export default function RecipeCardDescription({ children }: RecipeCardDescriptionProps) {
  return (
    <Typography sx={{ fontSize: 12, textAlign: 'justify' }} component={'p'}>
      {children}
    </Typography>
  )
}
