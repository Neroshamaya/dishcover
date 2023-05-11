import { Box } from '@mui/material'

interface SeparatorProps {
  thickness?: number
  style?: string
  color?: string
  spaceBefore?: number
  spaceAfter?: number
}

export default function Separator({
  color = 'divider',
  spaceAfter = 3,
  spaceBefore = 3,
  style = 'groove',
  thickness = 5
}: SeparatorProps) {
  return (
    <>
      <Box
        sx={{
          borderBottom: `${thickness}px ${style}`,
          borderColor: color,
          py: spaceBefore
        }}
      />
      <Box sx={{ py: spaceAfter }} />
    </>
  )
}
