function Button(props: React.PropsWithChildren) {
  return (
    <button
      className="relative py-2 px-3 rounded-lg font-medium text-sm bg-gradient-to-b from-accent-secondary/20 to-accent-primary transition-all hover:shadow-lg text-white"
      style={{
        boxShadow: '0 0 12px hsl(var(--accent-glow) / 0.5)'
      }}
    >
      <div className="absolute inset-0 rounded-lg">
        <div className="rounded-lg border border-border-primary/20 absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent)]"></div>
        <div className="rounded-lg border absolute inset-0 border-border-primary/40 [mask-image:linear-gradient(to_top,black,transparent)]"></div>
        <div className="absolute inset-0 shadow-[0px_0px_10px_0px_hsl(var(--accent-glow)/0.7)_inset] rounded-lg"></div>
      </div>
      <span>{props.children}</span>
    </button>
  )
}

export default Button
