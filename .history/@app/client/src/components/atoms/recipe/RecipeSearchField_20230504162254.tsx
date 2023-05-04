import { TextField, Icon, InputAdornment } from '@mui/material'
interface RecipeSearchFieldProps {
  children: React.ReactNode
}
export default function RecipeSearchField({ children }: RecipeSearchFieldProps) {
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
