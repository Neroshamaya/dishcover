import { useContext } from 'react'
import { Typography } from '@mui/material'
import UserContext from '../../../contexts/UserContext'

interface NotRegistredLinkProps {
  login: boolean
}

export default function NotRegistredLink({ login = true }: NotRegistredLinkProps) {
  return (
    <Typography component={'a'} href="/register">
      Not registered yet ?
    </Typography>
  )
}
