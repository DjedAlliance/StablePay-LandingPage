'use client'
import { useState } from 'react'
import { Ban, CheckCircle2, Flame, Repeat } from 'lucide-react'
import RatioGauge from '@/components/docs/widgets/RatioGauge'
import {
  BAND_INFO,
  CRITICAL,
  SAFE,
  SUPER_CRITICAL,
  bandForRatio,
  dailyFeeForRatio,
  formatAmount,
  loadLive,
  toNumber,
} from '@/components/docs/widgets/tectonicLive'

const PRESETS = [
  { label: 'Comfortable', value: 1.9 },
  { label: 'Getting tight', value: 1.35 },
  { label: 'Critical', value: 1.08 },
]

export default function ReservePlayground() {
  const [ratio, setRatio] = useState(1.4)
  const [holding, setHolding] = useState(1000)
  const [days, setDays] = useState(30)
  const [liveNote, setLiveNote] = useState('')

  const band = bandForRatio(ratio)
  const daily = dailyFeeForRatio(ratio)
  const remaining = Math.max(0, holding - holding * daily * days)
  const lost = holding - remaining

  const useLive = async () => {
    setLiveNote('Reading Sepolia…')
    try {
      const live = await loadLive()
      setRatio(Math.round(Math.min(Math.max(toNumber(live.ratio), SUPER_CRITICAL), 2.2) * 100) / 100)
      setLiveNote('Set to the live Sepolia ratio')
    } catch {
      setLiveNote('Couldn’t reach Sepolia right now')
    }
  }

  return (
    <div className="doc-widget">
      <div className="border-b border-line-soft px-5 py-3.5">
        <p className="text-sm font-semibold text-ink-900">Reserve ratio playground</p>
        <p className="text-xs text-ink-400">Move the ratio and see what happens to an SC balance.</p>
      </div>

      <div className="px-5 pb-5 pt-4">
        <label htmlFor="ratio-slider" className="flex items-baseline justify-between gap-3">
          <span className="text-xs font-medium text-ink-400">Reserve ratio r = R / L</span>
          <span className="font-mono text-2xl font-semibold tabular-nums text-ink-900">{ratio.toFixed(2)}</span>
        </label>
        <input
          id="ratio-slider"
          type="range"
          min={SUPER_CRITICAL}
          max={2.2}
          step={0.01}
          value={ratio}
          onChange={(event) => setRatio(Number(event.target.value))}
          className="doc-range mt-3 w-full"
        />
        <RatioGauge ratio={ratio} />

        <div className="mt-3 flex flex-wrap gap-2">
          {PRESETS.map((preset) => (
            <button
              key={preset.label}
              type="button"
              onClick={() => setRatio(preset.value)}
              className="rounded-full border border-line bg-white px-3 py-1 text-xs font-medium text-ink-500 transition hover:border-ink-300 hover:text-ink-900"
            >
              {preset.label}
            </button>
          ))}
          <button
            type="button"
            onClick={useLive}
            className="rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700 transition hover:border-brand-300"
          >
            Use live value
          </button>
          {liveNote && <span className="self-center text-xs text-ink-400">{liveNote}</span>}
        </div>

        <div className={`mt-5 rounded-xl px-4 py-3 ring-1 ${BAND_INFO[band].pill}`}>
          <p className="text-sm font-semibold">{BAND_INFO[band].label}</p>
          <p className="mt-0.5 text-sm opacity-90">{BAND_INFO[band].summary}</p>
        </div>

        <div className="mt-4 grid gap-2.5 sm:grid-cols-3">
          <div className="rounded-xl border border-line-soft bg-surface-subtle px-3.5 py-3">
            <p className="flex items-center gap-1.5 text-[0.6875rem] font-medium uppercase tracking-wider text-ink-400">
              <CheckCircle2 className="h-3.5 w-3.5 text-forest-500" /> Payments
            </p>
            <p className="mt-1 text-sm font-medium text-ink-900">Always accepted</p>
          </div>
          <div className="rounded-xl border border-line-soft bg-surface-subtle px-3.5 py-3">
            <p className="flex items-center gap-1.5 text-[0.6875rem] font-medium uppercase tracking-wider text-ink-400">
              <Flame className="h-3.5 w-3.5 text-gold-600" /> Stability fee
            </p>
            <p className="mt-1 font-mono text-sm font-medium tabular-nums text-ink-900">
              {(daily * 100).toFixed(4)}% / day
            </p>
          </div>
          <div className="rounded-xl border border-line-soft bg-surface-subtle px-3.5 py-3">
            <p className="flex items-center gap-1.5 text-[0.6875rem] font-medium uppercase tracking-wider text-ink-400">
              {ratio < CRITICAL ? (
                <Repeat className="h-3.5 w-3.5 text-ember-500" />
              ) : (
                <Ban className="h-3.5 w-3.5 text-ink-300" />
              )}
              Triggered redemptions
            </p>
            <p className="mt-1 text-sm font-medium text-ink-900">{ratio < CRITICAL ? 'Active before mints' : 'Off'}</p>
          </div>
        </div>

        <div className="mt-4 rounded-xl border border-dashed border-line px-4 py-3 text-sm text-ink-500">
          If you hold{' '}
          <input
            type="number"
            min={0}
            value={holding}
            onChange={(event) => setHolding(Math.max(0, Number(event.target.value)))}
            className="doc-inline-input w-24"
            aria-label="SC held"
          />{' '}
          SC for{' '}
          <input
            type="number"
            min={0}
            max={365}
            value={days}
            onChange={(event) => setDays(Math.min(365, Math.max(0, Number(event.target.value))))}
            className="doc-inline-input w-16"
            aria-label="Days held"
          />{' '}
          days at this ratio, you keep{' '}
          <strong className="font-mono text-ink-900">{formatAmount(remaining, 2)} SC</strong>
          {lost > 0 ? (
            <>
              {' '}
              (<span className="text-gold-700">−{formatAmount(lost, 2)}</span> in stability fees).
            </>
          ) : (
            <> (no fees above {SAFE}).</>
          )}
        </div>
        <p className="mt-2 text-[0.6875rem] text-ink-300">
          A model, not a forecast: real ratios move with the ETH price and with activity, and the fee is charged on each
          holder&rsquo;s next transfer.
        </p>
      </div>
    </div>
  )
}
