import { RecipeIngredientDtoType } from '@dishcover/shared'
import { List } from '@mui/material'
import IngredientListItem from '../molecules/IngredientListItem'

interface IngredientListProps {
  recipeIngredients?: RecipeIngredientDtoType[]
}
export default function IngredientList({ recipeIngredients }: IngredientListProps) {
  return (
    <List>
      {recipeIngredients?.map((recipeIngredient, index) => (
        <IngredientListItem key={index} recipeIngredient={recipeIngredient} />
      ))}
    </List>
  )
}
