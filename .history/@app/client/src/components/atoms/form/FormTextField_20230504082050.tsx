import { TextField } from '@mui/material'
interface TextFieldProps {
  errorMessage: string
  label: string
  otherProps: TextFieldProps
}
export default function FormTextField({ errorMessage = '', label, ...otherProps }: TextFieldProps) {
  return (
    <TextField
      error={errorMessage.length > 1}
      id={label}
      helperText={errorMessage}
      {...otherProps}
    />
  )
}
