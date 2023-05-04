import { TextField, TextFieldProps } from '@mui/material'

export default function FormTextField({ ...otherProps }: TextFieldProps) {
  return <TextField error={errorMessage.length > 1} helperText={errorMessage} {...otherProps} />
}
