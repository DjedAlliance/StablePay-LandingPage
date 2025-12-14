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
    <section className="py-12 sm:py-16 md:py-24">
      <div className="container px-4 sm:px-6 flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
        {/* Static "Powered by" Text */}
        <h2 className="text-sm sm:text-base md:text-lg lg:text-xl font-medium whitespace-nowrap text-center sm:text-left">
          Powered by Stability Nexus and Djed Alliance
        </h2>
        {/* Moving Ticker */}
        <div className="flex flex-1 w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]">
          <motion.div
            className="flex flex-none gap-8 sm:gap-14 pr-8 sm:pr-14"
            initial={{ translateX: '0%' }}
            animate={{ translateX: '-100%' }}
            transition={{
              repeat: Infinity,
              duration: 10,
              ease: 'linear',
            }}
          >
            {items.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="h-5 w-5 sm:h-6 sm:w-6 bg-[#FF863B] rounded"></div>
                <span className="text-xs sm:text-sm font-medium text-white">{item.label}</span>
              </div>
            ))}
            {/* Repeat items for seamless looping */}
            {items.map((item, index) => (
              <div key={`${index}-repeat`} className="flex items-center gap-2">
                <div className="h-5 w-5 sm:h-6 sm:w-6 bg-[#FF863B] rounded"></div>
                <span className="text-xs sm:text-sm font-medium text-white">{item.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
