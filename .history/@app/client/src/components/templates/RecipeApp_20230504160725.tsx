import DishcoverAppBar from '../organisms/DishcoverAppBar'
import HeroSection from '../organisms/HeroSection'
import image1 from '../../../images/hero1.png'
import image2 from '../../../images/hero2.png'
import HeroTitle from '../atoms/hero/HeroTitle'
import HeroText from '../atoms/hero/HeroText'
import HeroButton from '../atoms/hero/HeroButton'
import { RecipeDtoType } from '@dishcover/shared'
import RecipeSearchField from '../atoms/recipe/RecipeSearchField'
import RecipeCardList from '../organisms/RecipeCardList'

interface RecipeAppProps {
  recipes: Array<RecipeDtoType>
}
export default function RecipeApp({ recipes }: RecipeAppProps) {
  return (
    <>
      <RecipeSearchField />
      <RecipeCardList recipes={recipes} />
    </>
  )
}
