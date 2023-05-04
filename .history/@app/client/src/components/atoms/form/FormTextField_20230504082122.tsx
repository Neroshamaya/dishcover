import { TextField } from '@mui/material'
interface TextFieldProps {
  errorMessage: string
  label: string
  otherProps: TextFieldProps
}
export default function FormTextField({ errorMessage = '', ...otherProps }: TextFieldProps) {
  return <TextField error={errorMessage.length > 1} helperText={errorMessage} {...otherProps} />
}
