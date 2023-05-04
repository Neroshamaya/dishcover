import { Typography } from '@mui/material'
import React from 'react'

interface IngredientFormTitleProps {
  children: React.ReactNode
}

export default function IngredientFormTitle({ children }: IngredientFormTitleProps) {
  return <Typography component={'h4'}>{children}</Typography>
}
