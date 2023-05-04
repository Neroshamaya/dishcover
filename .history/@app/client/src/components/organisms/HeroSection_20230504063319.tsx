import Grid from '@mui/material/Unstable_Grid2/Grid2'
import HeroImage from '../atoms/hero/HeroImage'
import React from 'react'
import HeroText from '../atoms/hero/HeroText'
import HeroButton from '../atoms/hero/HeroButton'

interface HeroSectionProps {
  imageSrc: string
  textContent: string
  linkHref: string
}

export default function HeroSection({ imageSrc, textContent, linkHref }: HeroSectionProps) {
  return (
    <Grid container>
      <Grid>
        <HeroImage src={imageSrc} />
      </Grid>
      <Grid>
        <HeroText>{textContent}</HeroText>
        <HeroButton href={linkHref} />
      </Grid>
    </Grid>
  )
}
