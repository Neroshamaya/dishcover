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
        <HeroButton href="/create">Sign Up & Start Creating</HeroButton>
      </HeroSection>
      <HeroSection imageSrc={image2} linkHref="/explore">
        <HeroTitle>Find Your Next Culinary Masterpiece</HeroTitle>
        <HeroText>
          Are you tired of the same old dishes? Spice up your cooking journey with Dishcover! Here,
          you can create your own personalized recipe collections, search for specific ingredients
          or cuisines, and even discover new favorites from our thriving community of home chefs.
          With endless inspiration at your fingertips, you'll never run out of ideas for your next
          meal. Join our diverse and creative community and embark on a delicious adventure!
        </HeroText>
        <HeroButton href="/create">Get Started for Free!</HeroButton>
      </HeroSection>
    </>
  )
}
