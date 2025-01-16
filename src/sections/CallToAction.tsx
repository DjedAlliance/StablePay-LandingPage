'use client'

import Button from '@/components/Button'
import startBg from '@/assets/stars.png'
import gridLines from '@/assets/grid-lines.png'
import { RefObject, useEffect, useRef, useCallback } from 'react'
import { useMotionTemplate, useMotionValue, useScroll, useTransform } from 'framer-motion'
import { motion } from 'framer-motion'

const useRelativeMousePosition = (to: RefObject<HTMLElement>) => {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Memoize the function to prevent re-creation
  const updateMousePosition = useCallback(
    (event: MouseEvent) => {
      if (!to.current) return
      const { top, left } = to.current.getBoundingClientRect()
      mouseX.set(event.clientX - left)
      mouseY.set(event.clientY - top)
    },
    [to, mouseX, mouseY] // Dependencies for useCallback
  )

  useEffect(() => {
    window.addEventListener('mousemove', updateMousePosition)
    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
    }
  }, [updateMousePosition])

  return [mouseX, mouseY]
}

export const CallToAction = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const borderedDivRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const backgroundPositionY = useTransform(scrollYProgress, [0, 1], [-300, 300])
  const [mouseX, mouseY] = useRelativeMousePosition(borderedDivRef)
  const maskImage = useMotionTemplate`radial-gradient(50% 50% at ${mouseX}px ${mouseY}px, black, transparent)`

  return (
    <section ref={sectionRef} className="py-20 md:py-24">
      <div className="container">
        <motion.div
          ref={borderedDivRef}
          className="border border-white/15 py-24 rounded-xl overflow-hidden relative group"
          animate={{
            backgroundPositionX: startBg.width,
          }}
          transition={{
            repeat: Infinity,
            duration: 60,
            ease: 'linear',
          }}
          style={{
            backgroundImage: `url(${startBg.src})`,
            backgroundPositionY: backgroundPositionY,
          }}
        >
          <div
            className="absolute inset-0 bg-[#FF863B] bg-blend-overlay [mask-image:radial-gradient(50%_50%_at_50%_35%,black,transparent)] group-hover:opacity-0 transition duration-300"
            style={{
              backgroundImage: `url(${gridLines.src})`,
            }}
          ></div>
          <motion.div
            className="absolute inset-0 bg-[#FF863B] bg-blend-overlay opacity-0 group-hover:opacity-100 transition duration-300"
            style={{
              maskImage: maskImage,
              backgroundImage: `url(${gridLines.src})`,
            }}
          ></motion.div>
          <div className="relative">
            <h2 className="text-5xl md:text-6xl font-medium max-w-sm mx-auto tracking-tighter text-center">
              Redefining the Future of Stable Payments.
            </h2>
            <p className="text-lg md:text-xl max-w-xs mx-auto text-center text-white/70 px-4 mt-5 tracking-tight">
              Accept Djed stablecoins and empower your business with a reliable, decentralized payment solution.
            </p>

            <div className="mt-8 flex justify-center">
              <Button>Integrate StablePay Today!</Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default CallToAction
