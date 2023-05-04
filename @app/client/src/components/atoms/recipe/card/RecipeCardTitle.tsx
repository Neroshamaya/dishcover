import { Typography } from '@mui/material'
interface RecipeCardTitleProps {
  children: React.ReactNode
}

export default function RecipeCardTitle({ children }: RecipeCardTitleProps) {
  return <Typography component={'h5'}>{children}</Typography>
}
