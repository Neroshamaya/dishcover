import { RecipeDtoType } from '@dishcover/shared'
import Grid from '@mui/material/Unstable_Grid2/Grid2'

interface RecipeCardListProps {
  recipes?: RecipeDtoType[]
}
export default function RecipeCardList({ recipes }: RecipeCardListProps) {
  return (
    <Grid columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}>
      {recipes?.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </Grid>
  )
}
