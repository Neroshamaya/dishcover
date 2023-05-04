import { AppBar, Container, Toolbar, Box, IconButton, Icon, Menu, MenuItem } from '@mui/material'
import React from 'react'
import BrandLogo from '../atoms/menu/BrandLogo'
import BrandTitle from '../atoms/menu/BrandTitle'
import DishcoverMenuItem from '../atoms/menu/DishcoverAppBarItem.tsx'
import AuthButton from '../atoms/authentication/AuthButton.tsx'

const pages = [
  {
    title: 'Create',
    href: '/create'
  },
  {
    title: 'Explore',
    href: '/explore'
  }
]

export default function DishcoverAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <BrandLogo />
            <BrandTitle />
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit">
              <Icon>menu</Icon>
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left'
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' }
              }}>
              {pages.map((page, index) => (
                <MenuItem key={index} href={page.href}>
                  <DishcoverMenuItem>{page.title}</DishcoverMenuItem>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <BrandLogo />
            <BrandTitle />
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <DishcoverMenuItem key={page.title}>{page.title}</DishcoverMenuItem>
            ))}
          </Box>

          <AuthButton />
        </Toolbar>
      </Container>
    </AppBar>
  )
}
