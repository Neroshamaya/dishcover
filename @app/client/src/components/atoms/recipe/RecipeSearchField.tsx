import { Icon, InputAdornment, TextField, TextFieldProps } from '@mui/material'

export default function RecipeSearchField(props: TextFieldProps) {
  return (
    <TextField
      variant="outlined"
      sx={{ marginTop: 0 }}
      inputMode="search"
      placeholder="Search..."
      {...props}
      InputProps={{
        startAdornment: (
          <InputAdornment position="end">
            <Icon>search_rounded</Icon>
          </InputAdornment>
        )
      }}
    />
  )
}
