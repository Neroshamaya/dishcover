import { Typography } from '@mui/material'
interface RecipeCardTitleProps {
  children: React.ReactNode
}

export default function RecipeCardTitle({ children }: RecipeCardTitleProps) {
  return (
    <Typography
      sx={{
        fontFamily: 'EskoolRegular',
        fontWeight: 700,
        fontSize: 25,
        marginBottom: 1
      }}
      component={'h5'}>
      {children}
    </Typography>
  )
}
