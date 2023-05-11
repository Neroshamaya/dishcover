import { Container, createTheme,ThemeProvider } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import React from 'react'

import EskoolRegular from '../../assets/fonts/Eskool-Regular.ttf'
import NewakeFontDemo from '../../assets/fonts/Newake-Font-Demo.otf'
import SkModernistRegular from '../../assets/fonts/Sk-Modernist-Regular.otf'
import DishcoverAppBar from '../organisms/DishcoverAppBar'

const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'EskoolRegular';
          src: local('EskoolRegular'), local('Eskool-Regular'), url(${EskoolRegular}) format('truetype');
        }
        @font-face {
          font-family: 'NewakeFontDemo';
          src: local('NewakeFontDemo'), local('Newake-Font-Demo'), url(${NewakeFontDemo}) format('opentype');
        }
        @font-face {
          font-family: 'SkModernistRegular';
          src: local('SkModernistRegular'), local('SkModernist-Regular'), url(${SkModernistRegular}) format('opentype');
        }
      `
    }
  }
})

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <DishcoverAppBar />
      <Container>{children}</Container>
    </ThemeProvider>
  )
}
