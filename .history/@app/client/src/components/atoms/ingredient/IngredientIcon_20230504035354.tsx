import React from 'react'
interface IngredientIconProps {
  src: string
}
export default function IngredientIcon({ src }: IngredientIconProps) {
  return <img src={src} />
}
