import { MenuItem, Typography, TypographyProps } from '@mui/material'

export default function DishcoverMenuItem(props: TypographyProps<'a'>) {
  return (
    <MenuItem>
      <Typography
        href={props.href}
        sx={{
          fontFamily: 'SkModernistRegular',
          textTransform: 'uppercase',
          fontWeight: 800,
          letterSpacing: 3,
          color: 'black',
          textDecoration: 'none',
          ':hover': {
            textDecoration: 'underline'
          }
        }}
        component={'a'}>
        {props.children}
      </Typography>
    </MenuItem>
  )
}
