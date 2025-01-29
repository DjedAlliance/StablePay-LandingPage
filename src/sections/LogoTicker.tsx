'use client'
import { motion } from 'framer-motion'

export const LogoTicker = () => {
  const items = [
    { label: 'Stability Nexus' },
    { label: 'Djed Alliance' },
    { label: 'Stability Nexus' },
    { label: 'Djed Alliance' },
  ]

  return (
    <section className="py-20 md:py-24">
      <div className="container flex items-center gap-8">
        {/* Static "Powered by" Text */}
        <h2 className="text-lg md:text-xl sm:text-xs font-medium whitespace-nowrap">
          Powered by Stability Nexus and Djed Alliance
        </h2>
        {/* Moving Ticker */}
        <div className="flex flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]">
          <motion.div
            className="flex flex-none gap-6 md:gap-14 pr-6 md:pr-14"
            initial={{ translateX: '0%' }}
            animate={{ translateX: '-100%' }}
            transition={{
              repeat: Infinity,
              duration: 10, // Faster movement
              ease: 'linear',
            }}
          >
            {items.map((item, index) => (
              <div key={index} className="flex items-center gap-2 sm:gap-3 md:gap-4">
                <div className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 bg-[#FF863B] rounded"></div> {/* Small Box */}
                <span className="text-xs sm:text-sm md:text-base font-medium text-white">{item.label}</span>
              </div>
            ))}
            {/* Repeat items for seamless looping */}
            {items.map((item, index) => (
              <div key={`${index}-repeat`} className="flex items-center gap-2 sm:gap-3 md:gap-4">
                <div className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 bg-[#FF863B] rounded"></div> {/* Small Box */}
                <span className="text-xs sm:text-sm md:text-base font-medium text-white">{item.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
