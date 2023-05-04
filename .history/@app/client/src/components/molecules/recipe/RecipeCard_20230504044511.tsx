import { RecipeDtoType } from '@dishcover/shared'
import { Card, CardContent } from '@mui/material'
import RecipeCardTitle from '../../atoms/recipe/card/RecipeCardTitle'

interface RecipeCardProps {
  recipe: RecipeDtoType
}
function NormalContent({ recipe }: RecipeCardProps) {
  return (
    <>
      <RecipeCardTitle>{recipe.label}</RecipeCardTitle>
    </>
  )
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  nor

  return (
    <Card variant="outlined">
      <CardContent></CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  )
}
