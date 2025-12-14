"use client"

import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')

  useEffect(() => {
    try {
      const stored = localStorage.getItem('theme') as 'dark' | 'light' | null
      const prefers =
        typeof window !== 'undefined' &&
        window.matchMedia?.('(prefers-color-scheme: light)').matches

      const initial = stored ?? (prefers ? 'light' : 'dark')
      setTheme(initial)
      if (initial === 'light') document.body.classList.add('light')
      else document.body.classList.remove('light')
    } catch (e) {}
  }, [])

  function toggle() {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    try {
      localStorage.setItem('theme', next)
    } catch (e) {}
    if (next === 'light') document.body.classList.add('light')
    else document.body.classList.remove('light')
  }

  return (
    <button
      aria-label="Toggle theme"
      onClick={toggle}
      className="fixed top-4 right-4 z-50 inline-flex items-center gap-2 rounded-md bg-white/5 px-3 py-1 text-sm backdrop-blur-sm hover:bg-white/10"
      style={{
        color: 'inherit',
      }}
    >
      {theme === 'dark' ? (
        <span>🌙</span>
      ) : (
        <span>☀️</span>
      )}
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}
