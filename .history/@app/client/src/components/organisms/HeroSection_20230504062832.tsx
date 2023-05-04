import Grid from '@mui/material/Unstable_Grid2/Grid2'
import HeroImage from '../atoms/hero/HeroImage'
import React from 'react'

interface HeroSectionProps {
  imageSrc: string,
  textContent: string,
  button: React.ReactNode
}

export default function HeroSection({i}: HeroSectionProps) {
  return <Grid container>
    <HeroImage >
  </Grid>
}
