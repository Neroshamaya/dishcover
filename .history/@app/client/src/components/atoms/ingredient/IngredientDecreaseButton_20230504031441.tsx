import React from 'react'
import { Typography } from '@mui/material'

interface IngredientDecreaseButtonProps {}
export default function IngredientDecreaseButton({ children }: IngredientDecreaseButtonProps) {
  return <Typography component={'p'}>{children}</Typography>
}
