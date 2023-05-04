import React from 'react'
import { Tooltip, Icon } from '@mui/material'

interface IngredientDescriptionProps {
  description: React.ReactNode
}
export default function IngredientDescription({ description }: IngredientDescriptionProps) {
  return (
    <Tooltip title={description}>
      <Icon>add_circle</Icon>
    </Tooltip>
  )
}
