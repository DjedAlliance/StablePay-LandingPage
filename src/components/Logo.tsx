import LogoMark from '@/assets/logo.svg'
import { twMerge } from 'tailwind-merge'

export const Logo = ({ className, markClassName }: { className?: string; markClassName?: string }) => (
  <span className={twMerge('inline-flex items-center gap-2', className)}>
    <LogoMark className={twMerge('h-8 w-8 shrink-0', markClassName)} />
    <span className="text-[1.0625rem] font-semibold tracking-tight text-ink-900">StablePay</span>
  </span>
)

export default Logo
