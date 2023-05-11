import { Icon,IconButton } from '@mui/material'
interface RecipeCardDeleteButtonProps {
  onClick: () => void
}
export default function RecipeCardDeleteButton({ onClick }: RecipeCardDeleteButtonProps) {
  return (
    <IconButton onClick={onClick} aria-label="delete recipe">
      <Icon>delete</Icon>
    </IconButton>
  )
}
