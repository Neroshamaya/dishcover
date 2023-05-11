import { Button, ButtonProps } from '@mui/material'
import React from 'react'

interface RecipeCreateButtonProps extends ButtonProps {
  children: React.ReactNode
  onClick: () => void
}
export default function RecipeCreateButton({
  children,
  onClick,
  ...otherProps
}: RecipeCreateButtonProps) {
  return (
    <Button
      sx={{ my: 3 }}
      {...otherProps}
      variant="contained"
      type="button"
      size="large"
      onClick={onClick}>
      {children}
    </Button>
  )
}
