import { IconButton, Icon } from '@mui/material'
import React from 'react'

export default function RecipeCardDeleteButton() {
  return (
    <IconButton aria-label="delete recipe">
      <Icon>remove_circle</Icon>
    </IconButton>
  )
}
