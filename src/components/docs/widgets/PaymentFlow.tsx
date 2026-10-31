'use client'
import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { FileSignature, Landmark, MonitorSmartphone, Pause, Play, RotateCcw, Store } from 'lucide-react'
import { twMerge } from 'tailwind-merge'

type Mode = 'eth' | 'sc'

const NODES = [
  {
    label: 'StablePay widget',
    sub: 'in the browser',
    icon: MonitorSmartphone,
    tone: 'bg-brand-50 text-brand-600 ring-brand-100',
  },
  { label: 'Customer wallet', sub: 'signs once', icon: FileSignature, tone: 'bg-gold-50 text-gold-700 ring-gold-200' },
  { label: 'Tectonic', sub: 'SC contract', icon: Landmark, tone: 'bg-forest-50 text-forest-600 ring-forest-100' },
  { label: 'Your address', sub: 'merchant', icon: Store, tone: 'bg-ember-50 text-ember-600 ring-ember-200' },
]

type Step = { from: number; to: number; token: string; title: string; body: string }

const FLOWS: Record<Mode, Step[]> = {
  eth: [
    {
      from: 2,
      to: 0,
      token: 'price',
      title: 'Quote',
      body: 'The widget reads the oracle price and fees from Tectonic: 25 SC costs about 0.01117 ETH, rounded up.',
    },
    {
      from: 0,
      to: 1,
      token: 'sign?',
      title: 'Ask',
      body: 'It re-quotes, builds mint(merchant) with that ETH attached, and hands it to the wallet.',
    },
    {
      from: 1,
      to: 2,
      token: 'ETH',
      title: 'Pay',
      body: 'The customer signs. Their ETH goes into Tectonic’s reserve, which backs every SC.',
    },
    {
      from: 2,
      to: 3,
      token: 'SC',
      title: 'Mint',
      body: 'Tectonic mints 25 SC directly to your address, in the same transaction.',
    },
    {
      from: 3,
      to: 0,
      token: '✓',
      title: 'Check',
      body: 'The widget reads the Minted event, confirms you got the full 25 SC, and calls onTransactionComplete.',
    },
  ],
  sc: [
    {
      from: 2,
      to: 0,
      token: 'info',
      title: 'Prepare',
      body: 'The widget reads the token details. The Tectonic contract is the SC token itself.',
    },
    {
      from: 0,
      to: 1,
      token: 'sign?',
      title: 'Ask',
      body: 'It builds transfer(merchant, 25 SC) and hands it to the wallet.',
    },
    {
      from: 1,
      to: 2,
      token: 'SC',
      title: 'Send',
      body: 'The customer signs a plain ERC-20 transfer. No conversion, no protocol fee.',
    },
    { from: 2, to: 3, token: 'SC', title: 'Credit', body: '25 SC moves from the customer’s balance to yours.' },
    {
      from: 3,
      to: 0,
      token: '✓',
      title: 'Done',
      body: 'The receipt is confirmed and the widget calls onTransactionComplete.',
    },
  ],
}

const center = (index: number) => `${((index + 0.5) / NODES.length) * 100}%`

export default function PaymentFlow() {
  const [mode, setMode] = useState<Mode>('eth')
  const [step, setStep] = useState(0)
  const [playing, setPlaying] = useState(true)
  const reduceMotion = useReducedMotion()
  const steps = FLOWS[mode]
  const current = steps[step]

  useEffect(() => {
    if (!playing || reduceMotion) return
    const timer = setTimeout(() => setStep((value) => (value + 1) % steps.length), 2600)
    return () => clearTimeout(timer)
  }, [playing, step, steps.length, reduceMotion])

  const switchMode = (next: Mode) => {
    setMode(next)
    setStep(0)
    setPlaying(true)
  }

  return (
    <div className="doc-widget">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line-soft px-5 py-3">
        <div className="inline-flex rounded-full bg-surface-tint p-1" role="tablist" aria-label="Payment path">
          {(['eth', 'sc'] as const).map((value) => (
            <button
              key={value}
              type="button"
              role="tab"
              aria-selected={mode === value}
              onClick={() => switchMode(value)}
              className={twMerge(
                'rounded-full px-3.5 py-1.5 text-xs font-semibold transition',
                mode === value ? 'bg-white text-ink-900 shadow-xs' : 'text-ink-400 hover:text-ink-700'
              )}
            >
              {value === 'eth' ? 'Customer pays with ETH' : 'Customer pays with SC'}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setPlaying((value) => !value)}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full text-ink-400 transition hover:bg-surface-tint hover:text-ink-900"
            aria-label={playing ? 'Pause' : 'Play'}
          >
            {playing ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
          </button>
          <button
            type="button"
            onClick={() => setStep(0)}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full text-ink-400 transition hover:bg-surface-tint hover:text-ink-900"
            aria-label="Restart"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto px-3 pb-2 pt-6">
        <div className="relative min-w-[520px]">
          <div className="grid grid-cols-4 gap-2">
            {NODES.map((node, index) => {
              const active = index === current.from || index === current.to
              return (
                <div key={node.label} className="flex flex-col items-center text-center">
                  <span
                    className={twMerge(
                      'inline-flex h-12 w-12 items-center justify-center rounded-2xl ring-1 transition duration-300',
                      node.tone,
                      active ? 'scale-110 shadow-card' : 'opacity-60'
                    )}
                  >
                    <node.icon className="h-5 w-5" />
                  </span>
                  <p className="mt-2 text-xs font-semibold text-ink-900">{node.label}</p>
                  <p className="text-[0.6875rem] text-ink-400">{node.sub}</p>
                </div>
              )
            })}
          </div>

          <div className="relative mx-auto mt-4 h-10">
            <span
              className="absolute left-[12.5%] right-[12.5%] top-1/2 border-t-2 border-dashed border-line"
              aria-hidden="true"
            />
            <motion.span
              key={`${mode}-${step}`}
              className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink-900 px-2.5 py-1 font-mono text-[0.6875rem] font-semibold text-white shadow-lift"
              initial={{ left: center(current.from), opacity: 0, scale: 0.8 }}
              animate={{ left: center(current.to), opacity: 1, scale: 1 }}
              transition={{ duration: reduceMotion ? 0 : 1.1, ease: [0.22, 1, 0.36, 1] }}
            >
              {current.token}
            </motion.span>
          </div>
        </div>
      </div>

      <ol className="grid gap-1 border-t border-line-soft p-3 sm:grid-cols-5">
        {steps.map((item, index) => (
          <li key={item.title}>
            <button
              type="button"
              onClick={() => {
                setStep(index)
                setPlaying(false)
              }}
              className={twMerge(
                'h-full w-full rounded-xl px-3 py-2.5 text-left transition',
                index === step ? 'bg-brand-50 ring-1 ring-brand-100' : 'hover:bg-surface-subtle'
              )}
            >
              <span
                className={twMerge('font-mono text-[0.6875rem]', index === step ? 'text-brand-600' : 'text-ink-300')}
              >
                {String(index + 1).padStart(2, '0')}
              </span>
              <span
                className={twMerge('block text-sm font-semibold', index === step ? 'text-ink-900' : 'text-ink-500')}
              >
                {item.title}
              </span>
            </button>
          </li>
        ))}
      </ol>
      <p
        className="min-h-[3.5rem] border-t border-line-soft px-5 py-3 text-sm leading-relaxed text-ink-500"
        aria-live="polite"
      >
        {current.body}
      </p>
    </div>
  )
}
