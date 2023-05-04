import React from 'react'
import { Typography } from '@mui/material'

interface RecipeCardDescriptionProps {
  children: React.ReactNode
}
export default function RecipeCardDescription({ children }: RecipeCardDescriptionProps) {
  return <Typography component={'p'}>{children}</Typography>
}
