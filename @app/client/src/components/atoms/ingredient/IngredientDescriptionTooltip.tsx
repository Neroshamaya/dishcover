import { Icon,Tooltip } from '@mui/material'
import React from 'react'

interface IngredientDescriptionProps {
  description: React.ReactNode
}
export default function IngredientDescription({ description }: IngredientDescriptionProps) {
  return (
    <Tooltip title={description}>
      <Icon>info_circle</Icon>
    </Tooltip>
  )
}
