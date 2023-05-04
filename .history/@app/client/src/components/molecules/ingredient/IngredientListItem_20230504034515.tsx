import { RecipeIngredientDtoType } from '@dishcover/shared'
import { List } from '@mui/material'

interface IngredientListItemProps {
  ingredients: RecipeIngredientDtoType
}
export default function IngredientListItem({ ingredients }: IngredientListItemProps) {
  return <List></List>
}
