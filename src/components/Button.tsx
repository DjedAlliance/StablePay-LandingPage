import { twMerge } from 'tailwind-merge'
import type { ComponentPropsWithoutRef, ElementType } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap transition duration-200 ' +
  'disabled:pointer-events-none disabled:opacity-50'

const variants: Record<Variant, string> = {
  primary:
    'bg-brand-500 text-white shadow-brand hover:bg-brand-600 hover:-translate-y-px hover:shadow-[0_10px_24px_-8px_rgba(35,94,254,0.65)] active:translate-y-0',
  secondary:
    'bg-white text-ink-900 border border-line shadow-xs hover:border-ink-300 hover:-translate-y-px hover:shadow-card active:translate-y-0',
  ghost: 'text-brand-600 hover:text-brand-700 hover:bg-brand-50',
}

const sizes: Record<Size, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-5 text-[0.9375rem]',
  lg: 'h-12 px-6 text-base',
}

type ButtonProps<T extends ElementType> = {
  as?: T
  variant?: Variant
  size?: Size
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'size'>

export default function Button<T extends ElementType = 'button'>({
  as,
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...rest
}: ButtonProps<T>) {
  const Component = (as || 'button') as ElementType
  return (
    <Component className={twMerge(base, variants[variant], sizes[size], className)} {...rest}>
      {children}
    </Component>
  )
}
