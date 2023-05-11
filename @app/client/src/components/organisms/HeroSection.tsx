import { GridProps } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2/Grid2'

import HeroImage from '../atoms/hero/HeroImage'

type HeroSectionProps = {
  children: React.ReactNode
  imageSrc: string
  imageSide?: 'left' | 'right'
} & GridProps

export default function HeroSection({
  children,
  imageSrc,
  imageSide = 'left',
  ...otherProps
}: HeroSectionProps) {
  return (
    <Grid container {...otherProps}>
      {imageSide === 'left' ? (
        <Grid xs={12} md={6}>
          <HeroImage src={imageSrc} />
        </Grid>
      ) : null}
      <Grid sx={{ padding: 3, alignContent: 'center', alignItems: 'center' }} xs={12} md={6}>
        {children}
      </Grid>
      {imageSide === 'right' ? (
        <Grid
          xs={12}
          md={6}
          sx={{
            display: {
              xs: 'none',
              md: 'flex'
            }
          }}>
          <HeroImage src={imageSrc} />
        </Grid>
      ) : null}
    </Grid>
  )
}
