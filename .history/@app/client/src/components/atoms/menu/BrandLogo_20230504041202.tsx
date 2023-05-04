import logo from '../../../../public/logo.png'
import { Typography } from '@mui/material'

export default function BrandLogo() {
  return (
    <>
      <img src={logo} />
      <Typography component={'h3'}>dishcover</Typography>
    </>
  )
}
