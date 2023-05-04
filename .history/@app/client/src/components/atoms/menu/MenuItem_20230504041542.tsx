import { Typography } from '@mui/material'
interface MenuItemProps {
  children: React.ReactNode
}
export default function MenuItem(): MenuItemProps {
  return <Typography component={'h4'}>dishcover</Typography>
}
