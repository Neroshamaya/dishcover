import Grid from '@mui/material/Unstable_Grid2/Grid2'
import HeroImage from '../atoms/hero/HeroImage'
import HeroText from '../atoms/hero/HeroText'
import HeroButton from '../atoms/hero/HeroButton'

interface HeroSectionProps {
  children: React.ReactNode
  imageSrc: string
  textContent: string
  linkHref: string
  imageSide: 'left' | 'right'
}
function HeroImageGrid(props: { src: string }) {
  return (
    <Grid>
      <HeroImage {...props} />
    </Grid>
  )
}
export default function HeroSection({
  children,
  imageSrc,
  linkHref,
  imageSide = 'left'
}: HeroSectionProps) {
  return (
    <Grid container>
      {imageSide === 'left' ? <HeroImageGrid src={imageSrc} /> : null}
      <Grid>
        <HeroText>{children}</HeroText>
        <HeroButton href={linkHref} />
      </Grid>
      {imageSide === 'right' ? <HeroImageGrid src={imageSrc} /> : null}
    </Grid>
  )
}
