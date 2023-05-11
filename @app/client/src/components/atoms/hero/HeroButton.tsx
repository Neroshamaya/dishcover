import { Box, Button } from '@mui/material'
import React from 'react'

interface SubmitButtonProps {
  href: string
  children: React.ReactNode
}

export default function HeroButton({ href = '/', children }: SubmitButtonProps) {
  return (
    <Box sx={{ textAlign: 'center', marginTop: 4 }}>
      <Button variant="contained" size="large" type="button" href={href}>
        {children}
      </Button>
    </Box>
  )
}
