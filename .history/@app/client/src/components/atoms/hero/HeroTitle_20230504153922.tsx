import React from 'react'
import { Typography } from '@mui/material'

interface HeroTitleProps {
  children: React.ReactNode
}
export default function HeroTitle({ children }: HeroTitleProps) {
  return <Typography component={'p'}>{children}</Typography>
}
