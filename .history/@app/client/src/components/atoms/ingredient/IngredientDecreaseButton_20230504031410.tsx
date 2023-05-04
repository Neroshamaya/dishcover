import React from 'react'
import { Typography } from '@mui/material'

interface IngredientDecreaseButtonProps {
  children: React.ReactNode
}
export default function IngredientDecreaseButton({ children }: IngredientDecreaseButtonProps) {
  return <Typography component={'p'}>{children}</Typography>
}
