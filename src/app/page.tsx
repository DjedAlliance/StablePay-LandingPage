import { Header } from '@/sections/Header'
import { Hero } from '@/sections/Hero'
import { LogoTicker } from '@/sections/LogoTicker'
import { Features } from '@/sections/Features'

import { CallToAction } from '@/sections/CallToAction'
import { Footer } from '@/sections/Footer'

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <LogoTicker />
      <Features />

      <CallToAction />
      <Footer />
    </>
  )
}
