import { useContext } from 'react'
import { Typography } from '@mui/material'
import UserContext from '../../../contexts/UserContext'

export default function NotRegistredLink({ login = true }) {
  return <Typography>Not registered yet ?</Typography>
}
