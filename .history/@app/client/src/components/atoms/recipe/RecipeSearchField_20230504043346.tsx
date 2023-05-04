import { TextField, Icon } from '@mui/material'

export default function RecipeSearchField() {
  return (
    <>
      <Icon>search_rounded</Icon>
      <TextField defaultValue="Search..." variant="filled" />
    </>
  )
}
