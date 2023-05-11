import Image from 'mui-image'
interface HeroImageProps {
  src: string
}
export default function HeroImage({ src = '/' }: HeroImageProps) {
  return <Image fit="contain" style={{ maxWidth: '600px' }} src={src} />
}
