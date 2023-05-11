import { Typography } from '@mui/material'
import React from 'react'

interface RecipeFormTitleProps {
  children: React.ReactNode
}

export default function RecipeFormTitle({ children }: RecipeFormTitleProps) {
  return (
    <Typography
      component={'h4'}
      sx={{
        fontFamily: 'SkModernistRegular',
        textTransform: 'uppercase',
        fontSize: 19,
        fontWeight: '400',
        textAlign: 'center'
      }}>
      {children}
    </Typography>
  )
}
