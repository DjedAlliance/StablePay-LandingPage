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
        <h2 className="text-lg md:text-xl font-medium whitespace-nowrap">
          Powered by Stability Nexus and Djed Alliance
        </h2>
        {/* Moving Ticker */}
        <div className="flex flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]">
          <motion.div
            className="flex flex-none gap-14 pr-14"
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
                <div className="h-6 w-6 bg-[#FF863B] rounded"></div> {/* Small Box */}
                <span className="text-sm font-medium text-white">{item.label}</span>
              </div>
            ))}
            {/* Repeat items for seamless looping */}
            {items.map((item, index) => (
              <div key={`${index}-repeat`} className="flex items-center gap-2">
                <div className="h-6 w-6 bg-[#FF863B] rounded"></div> {/* Small Box */}
                <span className="text-sm font-medium text-white">{item.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
