interface RecipeCardImageProps {
  src?: string
}
export default function RecipeCardImage({ src = '/' }: RecipeCardImageProps) {
  return (
    <CardMedia
      component="img"
      height="194"
      image="/static/images/cards/paella.jpg"
      alt="Paella dish"
    />
  )
}
