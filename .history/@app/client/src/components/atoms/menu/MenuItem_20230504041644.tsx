import { Typography } from '@mui/material'
interface MenuItemProps {
  children: React.ReactNode
}
export default function MenuItem({ children }: MenuItemProps) {
  return <Typography component={'h4'}>{children}</Typography>
}
