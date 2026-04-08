import { twMerge } from 'tailwind-merge'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
}

export function Button({
  children,
  className,
  variant = 'primary',
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={twMerge(
        'relative py-1.5 px-2.5 sm:py-2 sm:px-3 rounded-lg font-medium text-xs sm:text-sm bg-gradient-to-b from-[#331500] to-[#FF863B] transition-transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100',
        className
      )}
      style={{ boxShadow: '0 0 12px #FF863B' }}
      {...props}
    >
      <div className="absolute inset-0 rounded-lg">
        <div className="rounded-lg border border-white/20 absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent)]"></div>
        <div className="rounded-lg border absolute inset-0 border-white/40 [mask-image:linear-gradient(to_top,black,transparent)]"></div>
        <div className="absolute inset-0 shadow-[0px_0px_10px_0px_rgba(255,134,59,0.7)_inset] rounded-lg"></div>
      </div>
      <span className="relative">{children}</span>
    </button>
  )
}

export default Button
