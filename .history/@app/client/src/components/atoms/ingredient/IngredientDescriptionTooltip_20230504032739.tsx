import React from 'react'
import { Typography } from '@mui/material'

interface IngredientDescriptionProps {
  children: React.ReactNode
}
export default function IngredientDescription({ children }: IngredientDescriptionProps) {
  return <Tooltip title={longText}>
  <Button sx={{ m: 1 }}>Default Width [300px]</Button>
</Tooltip>
  
  
  <Typography component={'p'}>{children}</Typography>
}
