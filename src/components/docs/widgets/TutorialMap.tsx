'use client'
import { useEffect, useState } from 'react'
import { Check, Flag } from 'lucide-react'
import { twMerge } from 'tailwind-merge'

const STEPS = [
  'Check your tools',
  'Create the store (or open yours)',
  'Install StablePay',
  'Create the checkout component',
  'Put it on the page',
  'Take your first payment',
  'Let the server create orders',
  'Verify payments against the chain',
  'Connect the widget to your server',
  'Test the whole flow',
]

const anchor = (index: number, title: string) =>
  `step-${index + 1}-${title}`.toLowerCase().replace(new RegExp('[^\\p{L}\\p{N}\\s_-]', 'gu'), '').replace(/\s/g, '-')

const STORAGE_KEY = 'stablepay-docs:tutorial-progress'

export default function TutorialMap() {
  const [done, setDone] = useState<boolean[]>(() => STEPS.map(() => false))

  useEffect(() => {
    try {
      const saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? '[]')
      if (Array.isArray(saved) && saved.length === STEPS.length) setDone(saved.map(Boolean))
    } catch {
      setDone(STEPS.map(() => false))
    }
  }, [])

  const toggle = (index: number) => {
    setDone((previous) => {
      const next = previous.map((value, i) => (i === index ? !value : value))
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      } catch {
        return next
      }
      return next
    })
  }

  const completed = done.filter(Boolean).length
  const percent = Math.round((completed / STEPS.length) * 100)

  return (
    <div className="doc-widget">
      <div className="flex items-center justify-between gap-3 border-b border-line-soft px-5 py-3.5">
        <p className="flex items-center gap-2 text-sm font-semibold text-ink-900">
          <Flag className="h-4 w-4 text-brand-500" /> Your progress
        </p>
        <p className="font-mono text-xs text-ink-400">
          {completed}/{STEPS.length} steps
        </p>
      </div>
      <div className="px-5 pt-4">
        <div className="h-1.5 overflow-hidden rounded-full bg-surface-tint">
          <div
            className="h-full rounded-full bg-gradient-to-r from-brand-500 via-gold-400 to-forest-500 transition-[width] duration-500"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
      <ol className="grid gap-1 p-3 sm:grid-cols-2">
        {STEPS.map((title, index) => (
          <li key={title} className="flex items-center gap-2 rounded-xl px-2 py-1.5 transition hover:bg-surface-subtle">
            <button
              type="button"
              onClick={() => toggle(index)}
              className={twMerge(
                'inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[0.6875rem] font-semibold transition',
                done[index]
                  ? 'border-forest-500 bg-forest-500 text-white'
                  : 'border-line bg-white text-ink-400 hover:border-ink-300'
              )}
              aria-label={done[index] ? `Mark step ${index + 1} as not done` : `Mark step ${index + 1} as done`}
              aria-pressed={done[index]}
            >
              {done[index] ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : index + 1}
            </button>
            <a
              href={`#${anchor(index, title)}`}
              className={twMerge(
                'min-w-0 text-sm transition hover:text-brand-600',
                done[index] ? 'text-ink-400 line-through' : 'text-ink-700'
              )}
            >
              {title}
            </a>
          </li>
        ))}
      </ol>
      <p className="border-t border-line-soft px-5 py-2.5 text-xs text-ink-400">
        {completed === STEPS.length
          ? '🎉 All done. Your checkout is production-shaped.'
          : 'Tick steps off as you go. Your progress is saved in this browser.'}
      </p>
    </div>
  )
}
