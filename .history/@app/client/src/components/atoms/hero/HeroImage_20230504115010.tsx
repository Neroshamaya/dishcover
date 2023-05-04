import React from 'react'
interface HeroImageProps {
  src: string
}
export default function HeroImage({ src = '/' }: HeroImageProps) {
  return <img src={src} />
}
