import { RecipeIngredientDtoType } from '@dishcover/shared'
import { List } from '@mui/material'

interface IngredientListItemProps {
  recipeIngredients: RecipeIngredientDtoType[]
}
export default function IngredientListItem({ recipeIngredients }: IngredientListItemProps) {
  return <List>{recipeIngredients.map((recipeIngredient) => {})}</List>
}
