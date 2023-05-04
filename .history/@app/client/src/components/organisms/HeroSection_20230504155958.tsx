import Grid from '@mui/material/Unstable_Grid2/Grid2'
import HeroImage from '../atoms/hero/HeroImage'
import HeroText from '../atoms/hero/HeroText'
import HeroButton from '../atoms/hero/HeroButton'

interface HeroSectionProps {
  children: React.ReactNode
  imageSrc: string
  imageSide?: 'left' | 'right'
}
function HeroImageGrid(props: { src: string }) {
  return (
    <Grid>
      <HeroImage {...props} />
    </Grid>
  )
}
export default function HeroSection({ children, imageSrc, imageSide = 'left' }: HeroSectionProps) {
  return (
    <Grid container>
      {imageSide === 'left' ? <HeroImageGrid src={imageSrc} /> : null}
      <Grid>{children}</Grid>
      {imageSide === 'right' ? <HeroImageGrid src={imageSrc} /> : null}
    </Grid>
  )
}
