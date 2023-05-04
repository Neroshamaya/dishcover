import AuthenticationForm from '../organisms/AuthenticationForm'
import AuthFormTitle from '../atoms/authentication/AuthFormTitle'
import DishcoverAppBar from '../organisms/DishcoverAppBar'
import React from 'react'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <DishcoverAppBar />
      {children}
    </>
  )
}
