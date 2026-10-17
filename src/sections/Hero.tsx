'use client'
import { motion } from 'framer-motion'
import { ArrowRight, Github } from 'lucide-react'
import Button from '@/components/Button'
import WidgetMock from '@/components/WidgetMock'
import { site } from '@/lib/site'

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
})

export const Hero = () => (
  <section id="top" className="relative isolate overflow-hidden">
    {/* The logo's three circles, blown up and blurred into the page background. */}
    <div className="brand-wash" aria-hidden="true">
      <div className="absolute left-1/2 top-[-18rem] h-[38rem] w-[38rem] -translate-x-[62%] rounded-full bg-brand-400/25 blur-[90px] animate-drift" />
      <div className="absolute left-[8%] top-[6rem] h-[30rem] w-[30rem] rounded-full bg-gold-300/30 blur-[90px] animate-drift [animation-delay:-5s]" />
      <div className="absolute right-[2%] top-[-4rem] h-[32rem] w-[32rem] rounded-full bg-ember-300/25 blur-[90px] animate-drift [animation-delay:-9s]" />
    </div>
    <div
      className="absolute inset-0 -z-10 rule-grid [mask-image:radial-gradient(75%_60%_at_50%_35%,black,transparent)]"
      aria-hidden="true"
    />
    <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-b from-transparent to-white" aria-hidden="true" />

    <div className="container relative pb-16 pt-14 md:pb-24 md:pt-20 lg:pb-28 lg:pt-24">
      <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,460px)] lg:gap-10">
        <div className="max-w-2xl">


          <motion.h1 {...fade(0.06)} className="mt-6 text-display-xl">
            Accept stablecoins <span className="text-brand-500">without a payment processor</span>.
          </motion.h1>

          <motion.p {...fade(0.12)} className="mt-6 max-w-xl text-lg leading-relaxed text-ink-500 md:text-xl">
            StablePay is a drop-in checkout widget that settles payments straight against Tectonic
            contracts from your customer&rsquo;s browser. There is no backend and no custody: your
            customer signs one transaction and the stablecoins arrive in your wallet.
          </motion.p>

          <motion.div {...fade(0.18)} className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button as="a" href={site.repo} target="_blank" rel="noopener noreferrer" size="lg">
              Start integrating <ArrowRight className="h-4 w-4" />
            </Button>
            <Button as="a" href="#how-it-works" variant="secondary" size="lg">
              See how it works
            </Button>
          </motion.div>

          <motion.div {...fade(0.24)} className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-ink-400">
            <span className="inline-flex items-center gap-1.5">
              <Github className="h-4 w-4" /> Open source
            </span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.85, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="lg:pl-4"
        >
          <WidgetMock />
        </motion.div>
      </div>
    </div>
  </section>
)

export default Hero
