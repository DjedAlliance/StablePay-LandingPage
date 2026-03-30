/**
 * Button — small styled button used throughout the site.
 * Accepts children to be rendered inside the button element.
 */
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

function Button(props: ButtonProps) {
  const { children, className = '', type = 'button', style, ...rest } = props

  const baseClass = 'relative py-1.5 px-2.5 sm:py-2 sm:px-3 rounded-lg font-medium text-xs sm:text-sm bg-gradient-to-b from-[#331500] to-[#FF863B] text-white'
  const mergedStyle = Object.assign({ boxShadow: '0 0 12px #FF863B' }, style || {})

  return (
    <button type={type} className={`${baseClass} ${className}`} style={mergedStyle} {...rest}>
      <div className="absolute inset-0 rounded-lg">
        <div className="rounded-lg border border-white/20 absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent)]"></div>
        <div className="rounded-lg border absolute inset-0 border-white/40 [mask-image:linear-gradient(to_top,black,transparent)]"></div>
        <div className="absolute inset-0 shadow-[0px_0px_10px_0px_rgba(255,134,59,0.7)_inset] rounded-lg"></div>
      </div>
      <span>{children}</span>
    </button>
  )
}

export default Button
