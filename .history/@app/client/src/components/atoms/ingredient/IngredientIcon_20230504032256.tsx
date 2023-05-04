import React from 'react'
interface IngredientIconProps {
  src: string
  children: React.ReactNode
}
export default function IngredientIcon({ children, src = '/' }: IngredientIconProps) {
  return <img src={src}>{children}</img>
}
