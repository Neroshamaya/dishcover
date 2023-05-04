import Grid from '@mui/material/Unstable_Grid2/Grid2'
import HeroImage from '../atoms/hero/HeroImage'
import HeroText from '../atoms/hero/HeroText'
import HeroButton from '../atoms/hero/HeroButton'

interface HeroSectionProps {
  imageSrc: string
  textContent: string
  linkHref: string
  imageSide: 'left' | 'right'
}

export default function HeroSection({
  imageSrc,
  textContent,
  linkHref,
  imageSide = 'left'
}: HeroSectionProps) {
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
