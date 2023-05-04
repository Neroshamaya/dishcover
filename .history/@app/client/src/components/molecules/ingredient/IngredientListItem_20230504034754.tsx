import { RecipeIngredientDtoType } from '@dishcover/shared'
import { List } from '@mui/material'

interface IngredientListItemProps {
  recipeIngredient: RecipeIngredientDtoType
  key: string
}
export default function IngredientListItem({ recipeIngredient, key }: IngredientListItemProps) {
  return (
    <ListItem
      key={value}
      secondaryAction={
        <IconButton edge="end" aria-label="comments">
          <CommentIcon />
        </IconButton>
      }
      disablePadding>
      <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={checked.indexOf(value) !== -1}
            tabIndex={-1}
            disableRipple
            inputProps={{ 'aria-labelledby': labelId }}
          />
        </ListItemIcon>
        <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
      </ListItemButton>
    </ListItem>
  )
}
