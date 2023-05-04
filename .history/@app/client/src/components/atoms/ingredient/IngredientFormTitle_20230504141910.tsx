import { Typography } from '@mui/material'
import React from 'react'

interface AuthFormTitleProps {
  children: React.ReactNode
}

export default function AuthFormTitle({ children }: AuthFormTitleProps) {
  return <Typography component={'h4'}>{children}</Typography>
}
