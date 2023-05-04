import { RecipeDtoType } from '@dishcover/shared'
import { Card } from '@mui/material'

interface RecipeCardProps {
  recipe: RecipeDtoType
}
export default function RecipeCard({ recipe }: RecipeCardProps) {
  return <Card variant="outlined"></Card>
}
