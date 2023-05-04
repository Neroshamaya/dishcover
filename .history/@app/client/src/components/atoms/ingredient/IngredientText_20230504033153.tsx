import React from 'react'
import { Typography } from '@mui/material'

interface IngredientTextProps {
  children: React.ReactNode
}
export default function IngredientText({ children }: IngredientTextProps) {
  return <Typography component={'p'}>{children}</Typography>
}
