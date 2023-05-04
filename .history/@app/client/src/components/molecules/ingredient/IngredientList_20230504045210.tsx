import { RecipeIngredientDtoType } from '@dishcover/shared'
import { ListItem, ListItemText, ListItemIcon, List } from '@mui/material'
import IngredientText from '../../atoms/ingredient/IngredientText'
import IngredientIcon from '../../atoms/ingredient/IngredientIcon'
import IngredientListItem from './IngredientListItem'

interface IngredientListProps {
  recipeIngredients: RecipeIngredientDtoType[]
}
export default function IngredientList({ recipeIngredients }: IngredientListProps) {
  return (
    <List>
      {recipeIngredients.map((recipeIngredient, index) => <IngredientListItem key={index} recipeIngredient={recipeIngredient}/>
      }
    </List>
  )
}