 'use client'
import { motion } from 'framer-motion'
import StabilityNexusLogo from '@/assets/stability-nexus.svg'
import DjedAllianceLogo from '@/assets/djed-alliance.svg'

/**
 * LogoTicker displays a horizontal ticker of partner logos/labels.
 * Uses real SVG logos for partners when available.
 */
export const LogoTicker = () => {
  const items = [
    { label: 'Stability Nexus', Logo: StabilityNexusLogo },
    { label: 'Djed Alliance', Logo: DjedAllianceLogo },
    { label: 'Stability Nexus', Logo: StabilityNexusLogo },
    { label: 'Djed Alliance', Logo: DjedAllianceLogo },
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
            style={{ pointerEvents: 'none' }}
            aria-hidden="true"
            role="presentation"
          >
            {items.map((item, index) => {
              const LogoComp = item.Logo
              return (
                <div key={index} className="flex items-center gap-2 text-black dark:text-white transition-colors duration-500">
                  <LogoComp className="h-5 w-5 sm:h-6 sm:w-6 fill-current text-black dark:text-white transition-colors duration-500" />
                  <span className="text-xs sm:text-sm font-medium">{item.label}</span>
                </div>
              )
            })}
            {/* Repeat items for seamless looping */}
            {items.map((item, index) => {
              const LogoComp = item.Logo
              return (
                <div key={`${index}-repeat`} className="flex items-center gap-2 text-black dark:text-white transition-colors duration-500">
                  <LogoComp className="h-5 w-5 sm:h-6 sm:w-6 fill-current text-black dark:text-white transition-colors duration-500" />
                  <span className="text-xs sm:text-sm font-medium">{item.label}</span>
                </div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
