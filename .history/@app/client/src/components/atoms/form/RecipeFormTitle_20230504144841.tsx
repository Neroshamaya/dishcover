import { Typography } from '@mui/material'
import React from 'react'

interface RecipeFormTitleProps {
  children: React.ReactNode
}

export default function RecipeFormTitle({ children }: RecipeFormTitleProps) {
  return <Typography component={'h4'}>{children}</Typography>
}
