import DishcoverAppBar from '../organisms/DishcoverAppBar'
import HeroSection from '../organisms/HeroSection'
import image1 from '../../../images/hero1.png'
import image2 from '../../../images/hero2.png'
import HeroTitle from '../atoms/hero/HeroTitle'
import HeroText from '../atoms/hero/HeroText'

export default function Home() {
  return (
    <>
      <DishcoverAppBar />
      <HeroSection
        imageSrc={image1}
        linkHref="/create">
          <HeroTitle>Unleash Your Culinary Creativity!</HeroTitle>
          <HeroText>Welcome to Recipe Vault, the ultimate platform for food lovers! Embrace your culinary talents by creating your own recipes, easily storing them for future use, and browsing through our diverse community's delectable dishes. Whether you're a seasoned chef or an aspiring home cook, Recipe Vault is your all-in-one solution for culinary exploration and inspiration</HeroText>
        </HeroSection>
      />
    </>
  )
}
