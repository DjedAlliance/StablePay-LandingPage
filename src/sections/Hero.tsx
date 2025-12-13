'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import Button from '@/components/Button'
import StarsBg from '@/assets/stars.png'
import StarsBgLight from '@/assets/stars-light.png'
import { useRef } from 'react'
import { useTheme } from '@/context/ThemeContext'

export const Hero = () => {
  const sectionRef = useRef(null)
  const { theme } = useTheme()
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const backgroundPositionY = useTransform(scrollYProgress, [0, 1], [-300, 300])

  return (
    <motion.section
      ref={sectionRef}
      className="h-[492px] md:h-[800px] flex items-center overflow-visible relative [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]"
      style={{
        backgroundImage: `url(${theme === 'dark' ? StarsBg.src : StarsBgLight.src})`,
        backgroundPositionY: backgroundPositionY,
      }}
      animate={{
        backgroundPositionX: theme === 'dark' ? StarsBg.width : StarsBgLight.width,
      }}
      transition={{
        repeat: Infinity,
        ease: 'linear',
        duration: 120,
      }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(90%_300%_at_50%_50%,hsl(var(--accent-primary)/0.2)_0%,transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_0%,hsl(var(--accent-primary)/0.15)_0%,transparent_60%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(40%_40%_at_50%_100%,hsl(var(--accent-primary)/0.1)_0%,transparent_70%)]"></div>

      {/* Ring 1  */}
      <motion.div
        style={{
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          rotate: '1turn',
        }}
        transition={{
          repeat: Infinity,
          duration: 60,
          ease: 'linear',
        }}
        className="absolute h-[244px] w-[244px] md:h-[680px] md:w-[680px] border border-ring-color/[var(--ring-opacity)] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <div className="absolute h-3 w-3 left-0 bg-dot-color/[var(--dot-opacity)] rounded-full top-1/2 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute h-3 w-3 left-1/2 bg-dot-color/[var(--dot-opacity)] rounded-full top-0 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute h-6 w-6 left-full border border-ring-color/[var(--ring-opacity)] rounded-full top-1/2 -translate-x-1/2 -translate-y-1/2 inline-flex items-center justify-center">
          <div className="h-3 w-3 bg-dot-color/[var(--dot-opacity)] rounded-full"></div>
        </div>
      </motion.div>
      {/* End Ring 1 */}

      {/* Ring 2  */}
      <motion.div
        style={{
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          rotate: '-1turn',
        }}
        transition={{
          repeat: Infinity,
          duration: 60,
          ease: 'linear',
        }}
        className="absolute h-[544px] w-[544px] md:h-[980px] md:w-[980px] rounded-full border border-dashed border-accent-primary top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      ></motion.div>
      {/* End Ring 2 */}

      {/* Ring 3  */}
      <motion.div
        style={{
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          rotate: '1turn',
        }}
        transition={{
          repeat: Infinity,
          duration: 60,
          ease: 'linear',
        }}
        className="absolute h-[644px] w-[644px] md:h-[1180px] md:w-[1180px] rounded-full border border-ring-color/50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <div className="absolute h-3 w-3 left-0 bg-dot-color/[var(--dot-opacity)] rounded-full top-1/2 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute h-3 w-3 left-full bg-dot-color/[var(--dot-opacity)] rounded-full top-1/2 -translate-x-1/2 -translate-y-1/2"></div>
      </motion.div>
      {/* End Ring 3 */}

      <div className="container relative mt-16 -mt-16">
        <p className="font-caudex text-2xl max-w-xl mx-auto text-text-secondary mb-5 text-center tracking-tight italic">
          ✨ Freeing merchants, redefining payments ✨
        </p>

        <h1 className="font-inter text-8xl md:text-[135px] md:leading-none tracking-tighter bg-gradient-to-br from-accent-primary via-accent-secondary to-accent-glow text-transparent bg-clip-text text-center pb-4">
          StablePay
        </h1>
        <p className="font-caudex text-2xl max-w-xl mx-auto text-text-primary/95 mt-5 text-center tracking-tight">
          An open-source SDK enabling merchants to accept payments in Djed stablecoins
        </p>
        <div className="flex justify-center mt-7 mb-5">
          <Button>Get Started </Button>
        </div>
      </div>
    </motion.section>
  )
}
