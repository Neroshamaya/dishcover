import { RecipeIngredientDtoType } from '@dishcover/shared'
import { ListItem, ListItemText, ListItemIcon } from '@mui/material'
import IngredientText from '../../atoms/ingredient/IngredientText'
import IngredientIcon from '../../atoms/ingredient/IngredientIcon'

interface IngredientListProps {
  recipeIngredient: RecipeIngredientDtoType[]
  key: string
}
export default function IngredientList({ ingredients }: IngredientListProps) {
  return (
    <ListItem key={key} disablePadding>
      <ListItemIcon>
        <IngredientIcon src={recipeIngredient.details?.iconLink || undefined} />
      </ListItemIcon>
      <ListItemText
        primary={<IngredientText>{recipeIngredient.details?.description}</IngredientText>}
      />
    </ListItem>
  )
}