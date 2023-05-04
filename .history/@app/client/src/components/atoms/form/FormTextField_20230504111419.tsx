import { TextField, TextFieldProps } from '@mui/material'

type FormTextFieldProps = {
  errorMessage: string
} & TextFieldProps

export default function FormTextField({ errorMessage = '', ...otherProps }: FormTextFieldProps) {
  return <TextField error={errorMessage.length > 1} helperText={errorMessage} {...otherProps} />
}
