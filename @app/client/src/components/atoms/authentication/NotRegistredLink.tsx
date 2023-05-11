import { Typography } from '@mui/material'

export default function NotRegistredLink() {
  return (
    <Typography
      component={'a'}
      href="/register"
      sx={{
        textDecoration: 'none',
        fontStyle: 'italic',
        color: '#29292E',
        fontSize: '0.9em',
        alignSelf: 'center',
        textAlign: 'center',
        display: 'flex',
        ':hover': {
          textDecoration: 'underline'
        }
      }}>
      Not registered yet ?
    </Typography>
  )
}
