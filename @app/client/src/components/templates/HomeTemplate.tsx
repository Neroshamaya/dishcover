import { useContext } from 'react'

import image1 from '../../assets/images/hero1.png'
import image2 from '../../assets/images/hero2.png'
import UserContext from '../../contexts/UserContext'
import Separator from '../atoms/common/Separator'
import HeroButton from '../atoms/hero/HeroButton'
import HeroText from '../atoms/hero/HeroText'
import HeroTitle from '../atoms/hero/HeroTitle'
import HeroSection from '../organisms/HeroSection'

export default function HomeTemplate() {
  const { getConnectedUser } = useContext(UserContext)
  return (
    <>
      <HeroSection imageSrc={image1}>
        <HeroTitle>Unleash Your Culinary Creativity!</HeroTitle>
        <HeroText>
          Welcome to Recipe Vault, the ultimate platform for food lovers! Embrace your culinary
          talents by creating your own recipes, easily storing them for future use, and browsing
          through our diverse community's delectable dishes. Whether you're a seasoned chef or an
          aspiring home cook, Recipe Vault is your all-in-one solution for culinary exploration and
          inspiration
        </HeroText>
        <HeroButton href="/create">
          {!getConnectedUser() ? 'Sign Up & ' : ''}Start Creating
        </HeroButton>
      </HeroSection>
      <Separator />
      <HeroSection mb={5} imageSide="right" imageSrc={image2}>
        <HeroTitle>Find Your Next Culinary Masterpiece</HeroTitle>
        <HeroText>
          Are you tired of the same old dishes? Spice up your cooking journey with Dishcover! Here,
          you can create your own personalized recipe collections, search for specific ingredients
          or cuisines, and even discover new favorites from our thriving community of home chefs.
          With endless inspiration at your fingertips, you'll never run out of ideas for your next
          meal. Join our diverse and creative community and embark on a delicious adventure!
        </HeroText>
        <HeroButton href="/explore">Explore</HeroButton>
      </HeroSection>
    </>
  )
}
