import { TextField, Icon, InputAdornment } from '@mui/material'

export default function RecipeSearchField() {
  return (
    <>
      <TextField
        defaultValue="Search..."
        variant="filled"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Icon>search_rounded</Icon>
            </InputAdornment>
          )
        }}
      />
    </>
  )
}
