import React from 'react'
interface SubmitButtonProps {
  src: string
}
export default function HeroImage({ src = '/' }: SubmitButtonProps) {
  return <img src={src}/>
