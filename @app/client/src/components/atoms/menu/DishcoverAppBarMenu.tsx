import { Typography } from '@mui/material'
interface DishcoverMenuItemProps {
  children: React.ReactNode
}
export default function DishcoverMenuItem({ children }: DishcoverMenuItemProps) {
  return <Typography component={'h4'}>{children}</Typography>
}
