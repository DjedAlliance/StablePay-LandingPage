'use client'
import { motion } from 'framer-motion'
import StabilityNexusLogo from '@/assets/StabilityNexus.png'
import DjedAllianceLogo from '@/assets/djed-alliance.png'
import Image from 'next/image'

export const LogoTicker = () => {
  const items = [
    { label: 'Stability Nexus', logo: StabilityNexusLogo },
    { label: 'Djed Alliance', logo: DjedAllianceLogo },
    { label: 'Stability Nexus', logo: StabilityNexusLogo },
    { label: 'Djed Alliance', logo: DjedAllianceLogo },
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
            animate={{ translateX: '-50%' }}
            transition={{
              repeat: Infinity,
              duration: 5,
              ease: 'linear',
            }}
          >
            {/* Render items twice for seamless looping */}
            {[...items, ...items].map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <Image src={item.logo} alt={item.label} className="h-5 w-5 sm:h-6 sm:w-6 object-contain" width={24} height={24} />
                <span className="text-xs sm:text-sm font-medium text-white">{item.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
