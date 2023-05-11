import { Typography } from '@mui/material'
import React from 'react'

interface AuthFormTitleProps {
  children: React.ReactNode
}

export default function AuthFormTitle({ children }: AuthFormTitleProps) {
  return (
    <Typography
      component={'p'}
      sx={{
        fontFamily: 'NewakeFontDemo',
        fontSize: 40,
        textAlign: 'center',
        textTransform: 'uppercase'
      }}>
      {children}
    </Typography>
  )
}
