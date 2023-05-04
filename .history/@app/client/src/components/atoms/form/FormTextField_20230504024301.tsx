import { TextField } from '@mui/material'
interface TextFieldProps {
  errorMessage: string
}
export default function FormTextField({ errorMessage = '' }: TextFieldProps) {
  return (
    <TextField
      error={errorMessage.length > 1}
      id="filled-error"
      label="Error"
      helperText={errorMessage}
      defaultValue="Hello World"
      variant="filled"
    />
  )
}
