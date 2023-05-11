import { CreateRecipeIngredientQuery } from '@dishcover/shared/types/requests'
import { RecipeIngredientDtoType } from '@dishcover/shared/types/resources'
import { List } from '@mui/material'

import IngredientListItem, { IngredientListItemProps } from '../molecules/IngredientListItem'

interface IngredientListProps {
  recipeIngredients?: (CreateRecipeIngredientQuery | RecipeIngredientDtoType)[]
  listItemProps?: Omit<IngredientListItemProps, 'recipeIngredient'>
}

export default function IngredientList({ listItemProps, recipeIngredients }: IngredientListProps) {
  return recipeIngredients && recipeIngredients?.length > 0 ? (
    <List>
      {recipeIngredients?.map((recipeIngredient, index) => (
        <IngredientListItem key={index} recipeIngredient={recipeIngredient} {...listItemProps} />
      ))}
    </List>
  ) : null
}
