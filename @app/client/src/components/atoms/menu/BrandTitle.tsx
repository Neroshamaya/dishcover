import { Typography } from '@mui/material'

export default function BrandTitle() {
  return (
    <Typography
      component={'a'}
      href="/"
      sx={{
        fontFamily: 'NewakeFontDemo',
        textDecoration: 'none',
        color: 'white',
        fontSize: 29
      }}>
      dishcover
    </Typography>
  )
}
