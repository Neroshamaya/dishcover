import { RecipeIngredientDtoType } from '@dishcover/shared'
import { ListItem, ListItemText, ListItemIcon, List } from '@mui/material'
import IngredientListItem from './IngredientListItem'

interface IngredientListProps {
  recipeIngredients: RecipeIngredientDtoType[]
}
export default function IngredientList({ recipeIngredients }: IngredientListProps) {
  return (
    <List>
      {recipeIngredients.map((recipeIngredient, index) => (
        <IngredientListItem key={index} recipeIngredient={recipeIngredient} />
      ))}
    </List>
  )
}
