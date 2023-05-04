import Grid from '@mui/material/Unstable_Grid2/Grid2'
import HeroImage from '../atoms/hero/HeroImage'
import React from 'react'

interface HeroSectionProps {
  imageSrc: string
  textContent: string
  button: React.ReactNode
}

export default function HeroSection({ imageSrc, textContent, button }: HeroSectionProps) {
  return (
    <Grid container>
      <Grid>
        <HeroImage src={imageSrc} />
      </Grid>
    </Grid>
  )
}
