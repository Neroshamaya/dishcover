import { RecipeDtoType } from '@dishcover/shared'
import Grid from '@mui/material/Unstable_Grid2/Grid2'
import RecipeCard from '../molecules/RecipeCard'

interface RecipeCardListProps {
  recipes?: RecipeDtoType[]
  onClickDelete: (recipe: RecipeDtoType) => void
  onClickEdit: (recipe: RecipeDtoType) => void
}
export default function RecipeCardList({
  recipes,
  onClickDelete,
  onClickEdit
}: RecipeCardListProps) {
  return (
    <Grid columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}>
      {recipes?.map((recipe) => (
        <RecipeCard
          onClickEdit={onClickEdit}
          onClickDelete={onClickDelete}
          key={recipe.id}
          recipe={recipe}
        />
      ))}
    </Grid>
  )
}
