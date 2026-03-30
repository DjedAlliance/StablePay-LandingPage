import { Header } from '@/sections/Header'
import { Hero } from '@/sections/Hero'
import { LogoTicker } from '@/sections/LogoTicker'
import { About } from '@/sections/About'
import { Features } from '@/sections/Features'

import { CallToAction } from '@/sections/CallToAction'
import { Footer } from '@/sections/Footer'

/**
 * Home — landing page root component assembling page sections.
 */
export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <About />
      <LogoTicker />
      <Features />

      <CallToAction />
      <Footer />
    </>
  )
}
