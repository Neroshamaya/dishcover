import { Icon,IconButton } from '@mui/material'
interface RecipeCardEditButtonProps {
  onClick: () => void
}
export default function RecipeCardEditButton({ onClick }: RecipeCardEditButtonProps) {
  return (
    <IconButton aria-label="edit recipe" onClick={onClick}>
      <Icon>edit_rounded</Icon>
    </IconButton>
  )
}
