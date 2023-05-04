import { RecipeDtoType } from '@dishcover/shared'
import { Card, CardContent } from '@mui/material'
import RecipeCardTitle from '../../atoms/recipe/card/RecipeCardTitle'
import RecipeCardImage from '../../atoms/recipe/card/RecipeCardImage'
import IngredientList from '../ingredient/IngredientList'
import { useState } from 'react'

interface RecipeCardProps {
  recipe: RecipeDtoType
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  const [show, setShow] = useState(false)

  return (
    <Card variant="outlined">
      <CardContent>
        <RecipeCardTitle>{recipe.label}</RecipeCardTitle>

        {recipe.image ? (
          <RecipeCardImage />
        ) : (
          <IngredientList recipeIngredients={recipe.ingredients} />
        )}
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  )
}
