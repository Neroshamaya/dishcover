interface RecipeCardImageProps {
  src?: string
}
export default function RecipeCardImage({ src = '/' }: RecipeCardImageProps) {
  return <img src={src} />
}
