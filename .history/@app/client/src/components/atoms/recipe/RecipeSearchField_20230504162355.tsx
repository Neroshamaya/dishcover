import { TextField, Icon, InputAdornment, TextFieldProps } from '@mui/material'

export default function RecipeSearchField(props: TextFieldProps) {
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
          ),
          ...props
        }}
      />
    </>
  )
}
