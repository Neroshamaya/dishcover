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
import RecipeCardDescription from '../../atoms/recipe/card/RecipeCardDescription'

interface RecipeCardProps {
  recipe: RecipeDtoType
  openEditModal: () => void
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
        <RecipeCardDescription>{recipe.description}</RecipeCardDescription>
      </Grid>
    </Grid>
  )
}

export default function RecipeCard({ recipe, openEditModal }: RecipeCardProps) {
  const [show, setShow] = useState(false)

  function showDetails() {
    setShow(true)
  }

  function openEditModal() {
    setShow(true)
  }

  return (
    <Card variant="outlined">
      <CardContent>
        {!show ? <NormalContent recipe={recipe} /> : <ShowContent recipe={recipe} />}
      </CardContent>
      <CardActions>
        <RecipeCardShowButton onClick={showDetails} />
        <RecipeCardEditButton />
        <RecipeCardDeleteButton />
      </CardActions>
    </Card>
  )
}
