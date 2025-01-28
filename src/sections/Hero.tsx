'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import Button from '@/components/Button'
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
      className="h-[492px] md:h-[800px] flex items-center overflow-visible relative [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]"
      style={{
        backgroundImage: `url(${StarsBg.src})`,
        backgroundPositionY: backgroundPositionY,
      }}
      animate={{
        backgroundPositionX: StarsBg.width,
      }}
      transition={{
        repeat: Infinity,
        ease: 'linear',
        duration: 120,
      }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(90%_300%_at_50%_50%,rgba(255,134,59,0.2)_0%,transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(255,134,59,0.15)_0%,transparent_60%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(40%_40%_at_50%_100%,rgba(255,134,59,0.1)_0%,transparent_70%)]"></div>

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
        className="absolute h-[244px] w-[244px] md:h-[680px] md:w-[680px] sm:h-[344px] sm:w-[344px] border border-white/40 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <div className="absolute h-3 w-3 left-0 bg-white/50 rounded-full top-1/2 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute h-3 w-3 left-1/2 bg-white/50 rounded-full top-0 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute h-6 w-6 left-full border border-white/40 rounded-full top-1/2 -translate-x-1/2 -translate-y-1/2 inline-flex items-center justify-center">
          <div className="h-3 w-3 bg-white/50 rounded-full"></div>
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
        className="absolute h-[544px] w-[544px] md:h-[980px] md:w-[980px] sm:h-[744px] sm:w-[744px] rounded-full border border-dashed border-orange-400 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
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
        className="absolute h-[644px] w-[644px] sm:h-[844px] sm:w-[844px] md:h-[1180px] md:w-[1180px] rounded-full border border-white/50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <div className="absolute h-3 w-3 left-0 bg-white/50 rounded-full top-1/2 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute h-3 w-3 left-full bg-white/50 rounded-full top-1/2 -translate-x-1/2 -translate-y-1/2"></div>
      </motion.div>
      {/* End Ring 3 */}

      <div className="container relative mt-16 -mt-16 text-center">
        <p className="font-caudex text:xl sm:text-2xl max-w-xl mx-auto text-orange-100/70 mb-5 text-center tracking-tight italic">
          ✨ Freeing merchants, redefining payments ✨
        </p>

        <h1 className="font-inter text-xl sm:text-5xl md:text-[135px] md:leading-none tracking-tighter bg-gradient-to-br from-[#F7941D] via-[#F57C00] to-[#EF6C00] text-transparent bg-clip-text text-center pb-4">
          StablePay
        </h1>
        <p className="font-caudex text-xl sm:text-2xl max-w-xl mx-auto text-orange-100/95 mt-5 text-center tracking-tight">
          An open-source SDK enabling merchants to accept payments in Djed stablecoins
        </p>
        <div className="flex justify-center mt-7 mb-5">
          <Button>Get Started </Button>
        </div>
      </div>
    </motion.section>
  )
}
