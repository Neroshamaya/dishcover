import { RecipeDtoType } from '@dishcover/shared'
import { Card, CardContent, CardActions } from '@mui/material'
import RecipeCardTitle from '../atoms/recipe/card/RecipeCardTitle'
import RecipeCardImage from '../atoms/recipe/card/RecipeCardImage'
import IngredientList from '../organisms/IngredientList'
import { useState } from 'react'
import RecipeCardShowButton from '../atoms/recipe/card/RecipeCardShowButton'
import RecipeCardDeleteButton from '../atoms/recipe/card/RecipeCardDeleteButton'
import RecipeCardEditButton from '../atoms/recipe/card/RecipeCardEditButton'
import Grid from '@mui/material/Unstable_Grid2'
import RecipeCardDescription from '../atoms/recipe/card/RecipeCardDescription'
import RecipeCardBackButton from '../atoms/recipe/card/RecipeCardBackButton'

interface BaseRecipeCardProps {
  recipe: RecipeDtoType
}

interface RecipeCardProps extends BaseRecipeCardProps {
  onClickEdit: (recipe: RecipeDtoType) => void
  onClickDelete: (recipe: RecipeDtoType) => void
}

function NormalContent({ recipe }: BaseRecipeCardProps) {
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

function ShowContent({ recipe }: BaseRecipeCardProps) {
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

export default function RecipeCard({ recipe }: RecipeCardProps) {
  const [show, setShow] = useState(false)

  function showDetails() {
    setShow(true)
  }
  function hideDetails() {
    setShow(false)
  }

  function handleClickEdit() {
    onClickEdit(recipe)
  }

  function handleClickDelete() {
    onClickDelete(recipe)
  }

  return (
    <Card variant="outlined">
      <CardContent>
        {!show ? <NormalContent recipe={recipe} /> : <ShowContent recipe={recipe} />}
      </CardContent>
      <CardActions>
        {!show ? (
          <>
            <RecipeCardShowButton onClick={showDetails} />
            <RecipeCardEditButton onClick={handleClickEdit} />
            <RecipeCardDeleteButton onClick={handleClickDelete} />
          </>
        ) : (
          <RecipeCardBackButton onClick={hideDetails} />
        )}
      </CardActions>
    </Card>
  )
}
