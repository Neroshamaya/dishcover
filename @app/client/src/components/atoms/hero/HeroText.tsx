import { Typography } from '@mui/material'
import React from 'react'

interface HeroTextProps {
  children: React.ReactNode
}
export default function HeroText({ children }: HeroTextProps) {
  return (
    <Typography
      component={'p'}
      sx={{
        fontFamily: 'SkModernistRegular',
        lineHeight: '2.2em',
        textAlign: 'justify',
        fontSize: '1.2em',
        fontWeight: '400'
      }}>
      {children}
    </Typography>
  )
}
