import { Icon, IconButton, IconButtonProps } from '@mui/material'
export default function IngredientDecreaseButton(props: IconButtonProps) {
  return (
    <IconButton {...props} aria-label="decrease">
      <Icon>remove_circle</Icon>
    </IconButton>
  )
}
