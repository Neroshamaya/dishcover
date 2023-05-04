import { TextField } from '@mui/material'
interface FormTextFieldProps {
  errorMessage: string
} & TextFieldProps
export default function FormTextField({ errorMessage = '', ...otherProps }: TextFieldProps) {
  return <TextField error={errorMessage.length > 1} helperText={errorMessage} {...otherProps} />
}
