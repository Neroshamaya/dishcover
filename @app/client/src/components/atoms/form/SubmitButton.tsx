import { Button, ButtonBaseProps } from '@mui/material'

export default function SubmitButton(props: ButtonBaseProps) {
  return (
    <Button sx={{ display: 'flex' }} variant="contained" size="medium" type="submit">
      {props.children}
    </Button>
  )
}
