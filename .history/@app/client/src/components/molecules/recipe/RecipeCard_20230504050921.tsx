import { RecipeDtoType } from '@dishcover/shared'
import { Card, CardContent, CardActions } from '@mui/material'
import RecipeCardTitle from '../../atoms/recipe/card/RecipeCardTitle'
import RecipeCardImage from '../../atoms/recipe/card/RecipeCardImage'
import IngredientList from '../ingredient/IngredientList'
import { useState } from 'react'
import RecipeCardShowButton from '../../atoms/recipe/card/RecipeCardShowButton'
import RecipeCardDeleteButton from '../../atoms/recipe/card/RecipeCardDeleteButton'
import RecipeCardEditButton from '../../atoms/recipe/card/RecipeCardEditButton'
import Grid from '@mui/material/Unstable_Grid2'

interface RecipeCardProps {
  recipe: RecipeDtoType
}

function NormalContent({ recipe }: RecipeCardProps) {
  return (
    <>
      <RecipeCardTitle>{recipe.label}</RecipeCardTitle>

      {recipe.image ? (
        <RecipeCardImage />
      ) : (
        <IngredientList recipeIngredients={recipe.ingredients} />
      )}
    </>
  )
}

function ShowContent({ recipe }: RecipeCardProps) {
  return (
    <Grid container spacing={2} columns={2}>
      <Grid xs>
        <IngredientList recipeIngredients={recipe.ingredients} />
      </Grid>
      <Grid xs>
        <IngredientList recipeIngredients={recipe.ingredients} />
      </Grid>
    </Grid>
  )
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
        <RecipeCardShowButton />
        <RecipeCardEditButton />
        <RecipeCardDeleteButton />
      </CardActions>
    </Card>
  )
}
