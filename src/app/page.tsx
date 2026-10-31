import { Header } from '@/sections/Header'
import { Hero } from '@/sections/Hero'
import { TrustBar } from '@/sections/TrustBar'
import { HowItWorks } from '@/sections/HowItWorks'
import { Features } from '@/sections/Features'
import { Developers } from '@/sections/Developers'
import { Tectonic } from '@/sections/Tectonic'
import { Networks } from '@/sections/Networks'
import { Faq } from '@/sections/Faq'
import { CallToAction } from '@/sections/CallToAction'
import { Footer } from '@/sections/Footer'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TrustBar />
        <HowItWorks />
        <Features />
        <Developers />
        <Tectonic />
        <Networks />
        <Faq />
        <CallToAction />
      </main>
      <Footer />
    </>
  )
}
