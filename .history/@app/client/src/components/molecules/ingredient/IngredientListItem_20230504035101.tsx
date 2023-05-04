import { RecipeIngredientDtoType } from '@dishcover/shared'
import { ListItem, ListItemIcon } from '@mui/material'
import IngredientText from '../../atoms/ingredient/IngredientText'

interface IngredientListItemProps {
  recipeIngredient: RecipeIngredientDtoType
  key: string
}
export default function IngredientListItem({ recipeIngredient, key }: IngredientListItemProps) {
  return (
    <ListItem key={key} disablePadding>
      <ListItemIcon></ListItemIcon>
      <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
    </ListItem>
  )
}
