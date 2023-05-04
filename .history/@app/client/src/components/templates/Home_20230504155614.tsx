import DishcoverAppBar from '../organisms/DishcoverAppBar'
import HeroSection from '../organisms/HeroSection'
import image1 from '../../../images/hero1.png'
import image2 from '../../../images/hero2.png'
import HeroTitle from '../atoms/hero/HeroTitle'
import HeroText from '../atoms/hero/HeroText'
import HeroButton from '../atoms/hero/HeroButton'

export default function Home() {
  return (
    <>
      <DishcoverAppBar />
      <HeroSection imageSrc={image1} linkHref="/create">
        <HeroTitle>Unleash Your Culinary Creativity!</HeroTitle>
        <HeroText>
          Welcome to Recipe Vault, the ultimate platform for food lovers! Embrace your culinary
          talents by creating your own recipes, easily storing them for future use, and browsing
          through our diverse community's delectable dishes. Whether you're a seasoned chef or an
          aspiring home cook, Recipe Vault is your all-in-one solution for culinary exploration and
          inspiration
        </HeroText>
        <HeroButton href="/create">Get Started for Free!</HeroButton>
      </HeroSection>
      <HeroSection imageSrc={image2} linkHref="/explore">
        <HeroTitle>Your Personalized Recipe Repository Awaits!</HeroTitle>
        <HeroText>
          Ready to elevate your cooking game? RecipeHub is here to help! Create and customize your
          own recipes, save them in your personal library, and search through our extensive
          collection of mouthwatering dishes shared by our passionate community. Join us on this
          culinary journey and never run out of meal ideas again.
        </HeroText>
        <HeroButton href="/create">Get Started for Free!</HeroButton>
      </HeroSection>
    </>
  )
}
