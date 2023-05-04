import { IconButton, Icon } from '@mui/material'
interface RecipeCardBackButtonProps {
  onClick: () => void
}
export default function RecipeCardBackButton({ onClick }: RecipeCardBackButtonProps) {
  return (
    <IconButton onClick={onClick} aria-label="back to normal view">
      <Icon>arrow_back</Icon>
    </IconButton>
  )
}
