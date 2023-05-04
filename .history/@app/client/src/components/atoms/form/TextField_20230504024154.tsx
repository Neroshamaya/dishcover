import { TextField } from '@mui/material'
interface TextFieldProps {
  errorMessage: string
}
export default function TextField({ errorMessage = '' }: TextFieldProps) {
  return (
    <TextField
      error={errorMessage.length > 1}
      id="filled-error"
      label="Error"
      defaultValue="Hello World"
      variant="filled"
    />
  )
}
