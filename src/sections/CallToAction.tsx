'use client'

import Button from '@/components/Button'
import startBg from '@/assets/stars.png'
import gridLines from '@/assets/grid-lines.png'
import { RefObject, useEffect, useRef, useCallback } from 'react'
import { useMotionTemplate, useMotionValue, useScroll, useTransform } from 'framer-motion'
import { motion } from 'framer-motion'

/**
 * Hook to track mouse position relative to a target element.
 * Returns motion values `[mouseX, mouseY]` representing coordinates
 * within the target element's bounding box.
 */
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
    // Respect reduced motion preference and avoid attaching heavy listeners on touch devices
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    if (!prefersReduced && !isTouch) {
      let rafId: number | null = null
      let latestEvent: MouseEvent | null = null

      const handler = (e: MouseEvent) => {
        latestEvent = e
        if (rafId === null) {
          rafId = requestAnimationFrame(() => {
            if (latestEvent) updateMousePosition(latestEvent)
            rafId = null
            latestEvent = null
          })
        }
      }

      window.addEventListener('mousemove', handler)
      return () => {
        window.removeEventListener('mousemove', handler)
        if (rafId !== null) cancelAnimationFrame(rafId)
      }
    }
    return () => {}
  }, [updateMousePosition])

  return [mouseX, mouseY]
}

/**
 * CallToAction component — hero CTA block with animated background
 * Displays a headline, supporting text, and primary action button.
 */
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
    <section id="developers" ref={sectionRef} className="scroll-mt-24 py-12 sm:py-16 md:py-24">
      <div className="container px-4 sm:px-6">
        <motion.div
          ref={borderedDivRef}
          className="border border-black/15 dark:border-white/15 py-12 sm:py-16 md:py-24 rounded-xl overflow-hidden relative group transition-colors duration-500 bg-white dark:bg-black"
          animate={{
            backgroundPositionX: startBg.width,
          }}
          transition={{
            repeat: Infinity,
            duration: 60,
            ease: 'linear',
          }}
        >
          {/* Animated Background */}
          <motion.div
            className="absolute inset-0 -z-20 invert opacity-40 dark:invert-0 dark:opacity-100 transition-all duration-500 pointer-events-none"
            style={{
              backgroundImage: `url(${startBg.src})`,
              backgroundPositionY: backgroundPositionY,
            }}
          />
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
          <div className="relative px-4 sm:px-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium max-w-xs sm:max-w-sm mx-auto tracking-tighter text-center text-black dark:text-white transition-colors duration-500">
              Redefining the Future of Stable Payments.
            </h2>
            <p className="text-base sm:text-lg md:text-xl max-w-xs mx-auto text-center text-black/70 dark:text-white/70 mt-4 sm:mt-5 tracking-tight transition-colors duration-500">
              Accept Djed stablecoins and empower your business with a reliable, decentralized payment solution.
            </p>

            <div className="mt-6 sm:mt-8 flex justify-center">
              <Button>Integrate StablePay Today!</Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default CallToAction
