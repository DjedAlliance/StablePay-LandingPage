import type { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'
import Reveal from '@/components/Reveal'

export const SectionHeading = ({
  eyebrow,
  title,
  description,
  align = 'center',
  className,
}: {
  eyebrow?: string
  title: ReactNode
  description?: ReactNode
  align?: 'center' | 'left'
  className?: string
}) => (
  <Reveal className={twMerge(align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl', className)}>
    {eyebrow && (
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-brand-600">{eyebrow}</p>
    )}
    <h2 className="text-display-md">{title}</h2>
    {description && <p className="mt-4 text-lg leading-relaxed text-ink-500">{description}</p>}
  </Reveal>
)

export default SectionHeading
