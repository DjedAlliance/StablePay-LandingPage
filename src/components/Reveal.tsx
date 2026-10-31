'use client'
import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

/**
 * One reveal primitive for the whole page, so every section enters with the
 * same timing curve instead of each one inventing its own.
 */
export const Reveal = ({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode
  delay?: number
  className?: string
}) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-80px' }}
    transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
)

export default Reveal
