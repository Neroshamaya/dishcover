import React from 'react'
interface IngredientIconProps {
  src: string
}
export default function IngredientIcon({ children, src = '/' }: IngredientIconProps) {
  return <img src={src} />
}
