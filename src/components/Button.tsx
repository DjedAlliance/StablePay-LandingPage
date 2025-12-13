function Button(props: React.PropsWithChildren) {
  return (
    <button
      className="relative py-2 px-4 sm:px-5 rounded-lg font-medium text-xs sm:text-sm bg-gradient-to-b from-[#331500] to-[#FF863B] text-white w-full sm:w-auto"
      style={{ boxShadow: '0 0 12px #FF863B' }}
    >
      <div className="absolute inset-0 rounded-lg">
        <div className="rounded-lg border border-white/20 absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent)]"></div>
        <div className="rounded-lg border absolute inset-0 border-white/40 [mask-image:linear-gradient(to_top,black,transparent)]"></div>
        <div className="absolute inset-0 shadow-[0px_0px_10px_0px_rgba(255,134,59,0.7)_inset] rounded-lg"></div>
      </div>
      <span className="relative z-10">{props.children}</span>
    </button>
  )
}

export default Button
