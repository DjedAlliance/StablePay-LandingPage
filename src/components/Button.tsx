/**
 * Button — small styled button used throughout the site.
 * Accepts children to be rendered inside the button element.
 */
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

function Button(props: ButtonProps) {
  const { children, className = '', type = 'button', style, ...rest } = props

  const baseClass = 'relative py-1.5 px-2.5 sm:py-2 sm:px-3 md:py-3 md:px-4 rounded-lg font-medium text-xs sm:text-sm md:text-base bg-gradient-to-b from-[#331500] to-[#FF863B] text-white transform-gpu transition-transform duration-200 hover:scale-105 active:scale-95 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-400'
  const mergedStyle = Object.assign({ boxShadow: '0 0 12px #FF863B' }, style || {})

  return (
    <button type={type} className={`${baseClass} ${className}`} style={mergedStyle} {...rest}>
      <div className="absolute inset-0 rounded-lg pointer-events-none">
        <div className="rounded-lg border border-white/20 absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent)] pointer-events-none"></div>
        <div className="rounded-lg border absolute inset-0 border-white/40 [mask-image:linear-gradient(to_top,black,transparent)] pointer-events-none"></div>
        <div className="absolute inset-0 shadow-[0px_0px_10px_0px_rgba(255,134,59,0.7)_inset] rounded-lg pointer-events-none"></div>
      </div>
      <span>{children}</span>
    </button>
  )
}

export default Button
