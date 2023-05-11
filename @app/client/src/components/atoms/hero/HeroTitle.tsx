import { Typography } from '@mui/material'
import React from 'react'

interface HeroTitleProps {
  children: React.ReactNode
}
export default function HeroTitle({ children }: HeroTitleProps) {
  return (
    <Typography
      component={'p'}
      sx={{
        fontFamily: 'NewakeFontDemo',
        fontSize: 40,
        textAlign: 'center'
      }}>
      {children}
    </Typography>
  )
}
