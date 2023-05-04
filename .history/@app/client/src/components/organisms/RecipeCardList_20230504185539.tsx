import { RecipeDtoType } from '@dishcover/shared'
import Grid from '@mui/material/Unstable_Grid2/Grid2'
import RecipeCard from '../molecules/RecipeCard'

interface RecipeCardListProps {
  recipes?: RecipeDtoType[]
  cardActionCallbacks: {
    onClickDelete: () => void
    onClickEdit: () => void
  }
}
export default function RecipeCardList({ recipes, cardActionCallbacks }: RecipeCardListProps) {
  return (
    <Grid container columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}>
      {recipes?.map((recipe) => (
        <Grid key={recipe.id}>
          <RecipeCard cardActionCallbacks={cardActionCallbacks} recipe={recipe} />
        </Grid>
      ))}
    </Grid>
  )
}
