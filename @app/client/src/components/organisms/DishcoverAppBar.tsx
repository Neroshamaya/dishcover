import { AppBar, Box, Container, Icon, IconButton, Menu, Toolbar } from '@mui/material'
import React, { useContext, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import UserContext from '../../contexts/UserContext'
import AuthButton from '../atoms/authentication/AuthButton.tsx'
import BrandLogo from '../atoms/menu/BrandLogo'
import BrandTitle from '../atoms/menu/BrandTitle'
import DishcoverAppBarItem from '../atoms/menu/DishcoverAppBarItem.tsx'
import DishcoverMenuItem from '../atoms/menu/DishcoverMenuItem.tsx'

export default function DishcoverAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)
  const location = useLocation()
  const [pages, setPages] = React.useState<Array<{ title: string; href: string; secure: boolean }>>(
    [
      {
        title: 'Explore',
        href: '/explore',
        secure: false
      },
      {
        title: 'Create',
        href: '/create',
        secure: true
      }
    ]
  )
  const userContext = useContext(UserContext)
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  useEffect(() => {
    if (!userContext.getConnectedUser()) {
      setPages((currentPages) => currentPages.filter((page) => !page.secure))
    }
  }, [userContext])

  return (
    <AppBar position="static" sx={{ backgroundColor: '#29292E', marginBottom: 2 }}>
      <Container maxWidth="xl">
        <Toolbar sx={{ gap: 1 }}>
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' }
            }}>
            <BrandLogo />
          </Box>

          <Box
            sx={{
              display: { xs: 'none', md: 'flex' }
            }}>
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
                <DishcoverMenuItem key={index} href={page.href}>
                  {page.title}
                </DishcoverMenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <BrandLogo />
            <Box sx={{ alignSelf: 'center' }}>
              <BrandTitle />
            </Box>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              marginLeft: 1,
              display: { xs: 'none', md: 'flex' },
              gap: 2
            }}>
            {pages.map((page) => (
              <DishcoverAppBarItem
                href={page.href}
                key={page.title}
                active={location.pathname === page.href}>
                {page.title}
              </DishcoverAppBarItem>
            ))}
          </Box>

          <AuthButton />
        </Toolbar>
      </Container>
    </AppBar>
  )
}
