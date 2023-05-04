import { IconButton, Icon } from '@mui/material'

interface RecipeCardShowButtonProps {
  onClick: () => void
}

export default function RecipeCardShowButton({ onClick }: RecipeCardShowButtonProps) {
  return (
    <IconButton aria-label="edit recipe" onClick={onClick}>
      <Icon>list_alt_rounded</Icon>
    </IconButton>
  )
}
