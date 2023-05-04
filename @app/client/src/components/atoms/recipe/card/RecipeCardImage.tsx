import { CardMedia } from '@mui/material'
interface RecipeCardImageProps {
  src?: string
}
export default function RecipeCardImage({ src = '/' }: RecipeCardImageProps) {
  return <CardMedia component="img" image={src} />
}
