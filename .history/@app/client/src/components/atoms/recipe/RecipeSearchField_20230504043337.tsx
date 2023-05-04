import { TextField, Icon } from '@mui/material'

export default function RecipeSearchField() {
  return (
    <>
      <TextField defaultValue="Search..." variant="filled" />
      <Icon>search_rounded</Icon>
    </>
  )
}
