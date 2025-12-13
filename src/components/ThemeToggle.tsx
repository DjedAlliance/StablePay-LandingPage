'use client'
import { motion } from 'framer-motion'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/context/ThemeContext'

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme()

    return (
        <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className="relative h-10 w-10 rounded-lg border border-border-primary/[var(--border-opacity)] inline-flex items-center justify-center bg-text-primary/5 hover:bg-text-primary/10 transition-colors"
            aria-label="Toggle theme"
        >
            <motion.div
                initial={false}
                animate={{
                    rotate: theme === 'dark' ? 0 : 180,
                    scale: theme === 'dark' ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="absolute"
            >
                <Moon className="h-5 w-5 text-text-secondary" />
            </motion.div>
            <motion.div
                initial={false}
                animate={{
                    rotate: theme === 'light' ? 0 : -180,
                    scale: theme === 'light' ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="absolute"
            >
                <Sun className="h-5 w-5 text-text-secondary" />
            </motion.div>
        </motion.button>
    )
}
