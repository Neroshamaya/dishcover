import { useContext } from 'react'
import { Typography } from '@mui/material'
import UserContext from '../../../contexts/UserContext'

export default function NotRegistredLink() {
  return (
    <Typography component={'a'} href="/register">
      Not registered yet ?
    </Typography>
  )
}
