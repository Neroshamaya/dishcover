import { IconButton, Icon } from '@mui/material'
interface RecipeCardEditButtonProps {
  onClick: () => void
}
export default function RecipeCardEditButton({ onClick }: RecipeCardEditButtonProps) {
  return (
    <IconButton aria-label="edit recipe">
      <Icon>edit_rounded</Icon>
    </IconButton>
  )
}
