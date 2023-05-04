import { IconButton, Icon } from '@mui/material'
interface RecipeCardDeleteButtonProps {
  onClick: () => void
}
export default function RecipeCardDeleteButton({ onClick }: RecipeCardDeleteButtonProps) {
  return (
    <IconButton aria-label="delete recipe">
      <Icon>delete_rounded</Icon>
    </IconButton>
  )
}