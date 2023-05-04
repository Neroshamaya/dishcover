import { Typography } from '@mui/material'
import React from 'react'

interface AuthFormTitle {
  children: React.ReactNode
}

export default function AuthFormTitle({ children }) {
  return <Typography component={'p'}>{children}</Typography>
}
