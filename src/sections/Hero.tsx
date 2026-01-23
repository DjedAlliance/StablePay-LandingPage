'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { Button } from '@/components/Button'
import StarsBg from '@/assets/stars.png'
import { useRef } from 'react'

export const Hero = () => {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const backgroundPositionY = useTransform(scrollYProgress, [0, 1], [-300, 300])

  return (
    <motion.section
      ref={sectionRef}
      className="h-[420px] sm:h-[492px] md:h-[800px] flex items-center overflow-hidden relative"
      style={{
        backgroundImage: `url(${StarsBg.src})`,
        backgroundPositionY,
      }}
    >
      <div className="container relative mt-8 md:mt-16 px-4 sm:px-6 text-center">
        <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold tracking-tighter">
          StablePay
        </h1>
        <p className="mt-4 text-lg text-white/80">
          An open-source SDK enabling merchants to accept payments in Djed stablecoins
        </p>
        <div className="mt-6 flex justify-center">
          <Button>Get Started</Button>
        </div>
      </div>
    </motion.section>
  )
}
