"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

/**
 * ThemeToggle — client component that toggles between light and dark themes.
 * Persists selection to `localStorage` and applies the `dark` class to the root element.
 */
export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [mounted, setMounted] = useState(false);

  // Read initial theme and apply classes
  useEffect(() => {
    setMounted(true);
    const storedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const initialTheme = storedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    setTheme(initialTheme);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme, mounted]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  if (!mounted) {
    // Prevent hydration mismatch by rendering a placeholder of the exact same size
    return <div className="w-[60px] h-[32px] rounded-full bg-white/10" />;
  }

  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-pressed={isDark}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      className={`relative flex items-center w-[60px] h-[32px] rounded-full p-1 transition-colors duration-500 ease-in-out border border-white/10
        ${isDark ? 'bg-white/10 shadow-[inset_0px_0px_10px_rgba(255,255,255,0.1)]' : 'bg-black/5 shadow-[inset_0px_0px_10px_rgba(0,0,0,0.05)]'}`}
      style={{
        WebkitTapHighlightColor: 'transparent',
      }}
    >
      <motion.div
        className={`absolute flex items-center justify-center w-6 h-6 rounded-full shadow-md z-10
          ${isDark ? 'bg-[#331500]' : 'bg-white'} border border-white/20`}
        layout
        transition={{ type: 'spring', stiffness: 700, damping: 30 }}
        initial={false}
        animate={{
          x: isDark ? 26 : 0,
        }}
      >
        {isDark ? (
          <Moon className="w-3.5 h-3.5 text-[#FF863B]" />
        ) : (
          <Sun className="w-3.5 h-3.5 text-amber-500" />
        )}
      </motion.div>
      
      {/* Background Icons */}
      <div className="absolute inset-x-2 flex justify-between pointer-events-none text-black/30 dark:text-white/30 text-xs">
        <Sun className={`w-3.5 h-3.5 transition-opacity duration-300 ${!isDark ? 'opacity-0' : 'opacity-100'}`} />
        <Moon className={`w-3.5 h-3.5 transition-opacity duration-300 ${isDark ? 'opacity-0' : 'opacity-100'}`} />
      </div>
    </button>
  );
}
