import React from 'react'
import { Typography } from '@mui/material'

interface IngredientDescriptionProps {
  children: React.ReactNode
}
export default function IngredientDescription({ children }: IngredientDescriptionProps) {
  return <Typography component={'p'}>{children}</Typography>
}
