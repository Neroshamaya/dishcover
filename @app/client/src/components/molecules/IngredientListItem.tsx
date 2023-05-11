import { CreateRecipeIngredientQuery } from '@dishcover/shared/types/requests/RecipeIngredient'
import { RecipeIngredientDtoType } from '@dishcover/shared/types/resources/RecipeIngredient'
import { Box, ListItem, ListItemIcon, ListItemProps, ListItemText } from '@mui/material'

import IngredientDecreaseButton from '../atoms/ingredient/IngredientDecreaseButton'
import IngredientIcon from '../atoms/ingredient/IngredientIcon'
import IngredientIncreaseButton from '../atoms/ingredient/IngredientIncreaseButton'
import IngredientText from '../atoms/ingredient/IngredientText'

export interface IngredientListItemProps extends ListItemProps {
  recipeIngredient: CreateRecipeIngredientQuery | RecipeIngredientDtoType
  increase?: (ingredient: CreateRecipeIngredientQuery | RecipeIngredientDtoType) => unknown
  decrease?: (ingredient: CreateRecipeIngredientQuery | RecipeIngredientDtoType) => unknown
  canEdit?: boolean
}
export default function IngredientListItem({
  recipeIngredient,
  increase,
  decrease,
  canEdit = false,
  ...otherProps
}: IngredientListItemProps) {
  return (
    <ListItem {...otherProps} divider dense>
      <ListItemIcon>
        <IngredientIcon src={recipeIngredient.details?.iconLink || undefined} />
      </ListItemIcon>
      <ListItemText
        primary={
          <IngredientText>
            <Box component={'span'} sx={{ fontWeight: 'bold', fontSize: 15 }}>
              {recipeIngredient.details?.label}
            </Box>
            <i> x{recipeIngredient.quantity}</i>
          </IngredientText>
        }
      />
      {canEdit ? (
        <>
          <IngredientIncreaseButton
            onClick={() => (increase ? increase(recipeIngredient) : null)}
          />
          <IngredientDecreaseButton
            onClick={() => (decrease ? decrease(recipeIngredient) : null)}
          />
        </>
      ) : null}
    </ListItem>
  )
}
