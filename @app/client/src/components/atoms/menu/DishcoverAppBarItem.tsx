import { MenuItem, Typography, TypographyProps } from '@mui/material'
type DishcoverAppBarItemProps = { active: boolean } & TypographyProps<'a'>
export default function DishcoverAppBarItem(props: DishcoverAppBarItemProps) {
  return (
    <MenuItem>
      <Typography<'a'>
        component={'a'}
        fontSize={17}
        href={props.href}
        sx={{
          fontFamily: 'SkModernistRegular',
          textTransform: 'uppercase',
          fontWeight: 580,
          letterSpacing: 3.5,
          textDecoration: 'none',
          borderRadius: '0.5px',
          boxShadow: props.active ? 'inset 100px 0 0 0 white' : 'inset 0 0 0 0 white',
          color: props.active ? 'black' : 'white',
          margin: '0 -.27rem',
          padding: '0 .27rem',
          transition: 'color .5s ease-in-out, box-shadow .5s ease-in-out',

          ':hover': {
            boxShadow: 'inset 100px 0 0 0 white',
            color: 'black'
          }
        }}>
        {props.children}
      </Typography>
    </MenuItem>
  )
}
