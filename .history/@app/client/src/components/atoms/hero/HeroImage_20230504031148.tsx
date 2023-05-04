import React from 'react'
interface SubmitButtonProps {
  src: string
  children: React.ReactNode
}
export default function HeroButton({ children, src = '/' }: SubmitButtonProps) {
  return <img src={src}>{children}</img>
}
