import { RecipeDtoType } from '@dishcover/shared/types/resources/Recipe'
import { Card, CardActions, CardContent } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import { useState } from 'react'

import Separator from '../atoms/common/Separator'
import RecipeCardBackButton from '../atoms/recipe/card/RecipeCardBackButton'
import RecipeCardDeleteButton from '../atoms/recipe/card/RecipeCardDeleteButton'
import RecipeCardDescription from '../atoms/recipe/card/RecipeCardDescription'
import RecipeCardEditButton from '../atoms/recipe/card/RecipeCardEditButton'
import RecipeCardImage from '../atoms/recipe/card/RecipeCardImage'
import RecipeCardShowButton from '../atoms/recipe/card/RecipeCardShowButton'
import RecipeCardTitle from '../atoms/recipe/card/RecipeCardTitle'
import IngredientList from '../organisms/IngredientList'

interface RecipeCardProps {
  data: {
    recipe: RecipeDtoType
    cardActionCallbacks?: {
      onClickEdit: (recipe: RecipeDtoType) => void
      onClickDelete: (recipe: RecipeDtoType) => void
    }
  }
}

function NormalContent({ recipe }: { recipe: RecipeDtoType }) {
  return (
    <>
      {recipe.image ? (
        <RecipeCardImage src={recipe.image} />
      ) : (
        <IngredientList recipeIngredients={recipe.recipeIngredients} />
      )}
    </>
  )
}

function ShowContent({ recipe }: { recipe: RecipeDtoType }) {
  return (
    <Grid container columnGap={3}>
      <Grid xs>
        <IngredientList recipeIngredients={recipe.recipeIngredients} />
      </Grid>
      {recipe.description && recipe.description.length > 0 ? (
        <Grid xs>
          <RecipeCardDescription>{recipe.description}</RecipeCardDescription>
        </Grid>
      ) : null}
    </Grid>
  )
}

export default function RecipeCard({ data: { recipe, cardActionCallbacks } }: RecipeCardProps) {
  const [show, setShow] = useState(false)

  function showDetails() {
    setShow(true)
  }
  function hideDetails() {
    setShow(false)
  }

  function handleClickEdit() {
    cardActionCallbacks?.onClickEdit(recipe)
  }

  function handleClickDelete() {
    cardActionCallbacks?.onClickDelete(recipe)
  }

  return (
    <Card elevation={5} variant="elevation">
      <CardContent>
        <RecipeCardTitle>{recipe.label}</RecipeCardTitle>
        <Separator spaceBefore={0} spaceAfter={1} style={'dashed'} />
        {!show ? <NormalContent recipe={recipe} /> : <ShowContent recipe={recipe} />}
      </CardContent>
      <CardActions>
        {!show ? (
          <>
            {' '}
            {(recipe.description && recipe.description.length > 0) || recipe.image ? (
              <RecipeCardShowButton onClick={showDetails} />
            ) : null}
            {cardActionCallbacks ? (
              <>
                <RecipeCardEditButton onClick={handleClickEdit} />
                <RecipeCardDeleteButton onClick={handleClickDelete} />{' '}
              </>
            ) : null}
          </>
        ) : (
          <RecipeCardBackButton onClick={hideDetails} />
        )}
      </CardActions>
    </Card>
  )
}
