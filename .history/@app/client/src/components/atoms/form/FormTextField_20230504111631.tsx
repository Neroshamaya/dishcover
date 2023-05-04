import { TextField, TextFieldProps } from '@mui/material'

type FormTextFieldProps = {
  errorMessage: string
} & TextFieldProps

export default function FormTextField(props: TextFieldProps) {
  return <TextField {...props} />
}
