interface IngredientIconProps {
  src?: string
}
export default function IngredientIcon({ src = '/' }: IngredientIconProps) {
  return <img src={src} width={30} height={30} />
}
