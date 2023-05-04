import React from 'react'
import { Typography } from '@mui/material'

interface HeroTextProps {
  children: React.ReactNode
}
export default function HeroText({ children }: HeroTextProps) {
  return <Typography component={'p'}>{children}</Typography>
}
