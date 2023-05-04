import { TextField } from '@mui/material'

export default function RecipeSearchField() {
  return <TextField helperText={errorMessage} defaultValue="Search..." variant="filled" />
}
