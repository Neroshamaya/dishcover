import { RecipeIngredientDtoType } from '@dishcover/shared'
import { ListItem, ListItemText, ListItemIcon } from '@mui/material'
import IngredientText from '../../atoms/ingredient/IngredientText'

interface IngredientListItemProps {
  recipeIngredient: RecipeIngredientDtoType
  key: string
}
export default function IngredientListItem({ recipeIngredient, key }: IngredientListItemProps) {
  return (
    <ListItem key={key} disablePadding>
      <ListItemIcon></ListItemIcon>
      <ListItemText
        primary={<IngredientText>{recipeIngredient.details?.description}</IngredientText>}
      />
    </ListItem>
  )
}
