import { Icon, IconButton, IconButtonProps } from '@mui/material'
export default function IngredientIncreaseButton(props: IconButtonProps) {
  return (
    <IconButton {...props} aria-label="increase">
      <Icon>add_circle</Icon>
    </IconButton>
  )
}
