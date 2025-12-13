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
    <section className="py-12 md:py-16 lg:py-20 bg-white dark:bg-black overflow-hidden w-full">
      <div className="container px-4 max-w-full">
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 lg:gap-8">
          {/* Static "Powered by" Text */}
          <h2 className="text-sm sm:text-base md:text-lg lg:text-xl font-medium text-center md:text-left md:whitespace-nowrap text-gray-900 dark:text-white">
            Powered by Stability Nexus and Djed Alliance
          </h2>
          {/* Moving Ticker */}
          <div className="w-full md:flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)] dark:[mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]">
            <motion.div
              className="flex flex-none gap-8 sm:gap-10 md:gap-14 pr-8 sm:pr-10 md:pr-14"
              initial={{ translateX: '0%' }}
              animate={{ translateX: '-100%' }}
              transition={{
                repeat: Infinity,
                duration: 10, // Faster movement
                ease: 'linear',
              }}
            >
              {items.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="h-5 w-5 sm:h-6 sm:w-6 bg-[#FF863B] rounded flex-shrink-0"></div>
                  <span className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white whitespace-nowrap">{item.label}</span>
                </div>
              ))}
              {/* Repeat items for seamless looping */}
              {items.map((item, index) => (
                <div key={`${index}-repeat`} className="flex items-center gap-2">
                  <div className="h-5 w-5 sm:h-6 sm:w-6 bg-[#FF863B] rounded flex-shrink-0"></div>
                  <span className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white whitespace-nowrap">{item.label}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
