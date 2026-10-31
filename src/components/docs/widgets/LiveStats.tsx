'use client'
import { ExternalLink, RefreshCw, Radio } from 'lucide-react'
import RatioGauge from '@/components/docs/widgets/RatioGauge'
import {
  BAND_INFO,
  SEPOLIA,
  bandForRatio,
  formatAmount,
  toNumber,
  useTectonicLive,
} from '@/components/docs/widgets/tectonicLive'

const Stat = ({ label, value, hint }: { label: string; value: string; hint?: string }) => (
  <div className="rounded-xl border border-line-soft bg-surface-subtle px-3.5 py-3">
    <p className="text-[0.6875rem] font-medium uppercase tracking-wider text-ink-400">{label}</p>
    <p className="mt-1 font-mono text-[0.9375rem] font-medium tabular-nums text-ink-900">{value}</p>
    {hint && <p className="mt-0.5 text-xs text-ink-400">{hint}</p>}
  </div>
)

export default function LiveStats() {
  const { data, error, loading, refresh } = useTectonicLive()

  const ratio = data ? toNumber(data.ratio) : null
  const band = ratio !== null ? bandForRatio(ratio) : null
  const priceEth = data ? toNumber(data.scPriceMint) : null
  const ethUsd = priceEth ? 1 / priceEth : null
  const feePercent = data ? (toNumber(data.fee) + toNumber(data.devFee)) * 100 : null
  const dailyStability = data ? toNumber(data.stabilityFee) * 100 : null

  return (
    <div className="doc-widget">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line-soft px-5 py-3.5">
        <p className="flex items-center gap-2 text-sm font-semibold text-ink-900">
          <span className="relative flex h-2.5 w-2.5">
            <span
              className={`absolute inline-flex h-full w-full rounded-full ${error ? 'bg-ink-300' : 'animate-ping bg-forest-400 opacity-60'}`}
            />
            <span
              className={`relative inline-flex h-2.5 w-2.5 rounded-full ${error ? 'bg-ink-300' : 'bg-forest-500'}`}
            />
          </span>
          Tectonic on Sepolia, live
        </p>
        <div className="flex items-center gap-1">
          <a
            href={SEPOLIA.explorer}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-8 items-center gap-1.5 rounded-full px-3 text-xs font-medium text-ink-500 transition hover:bg-surface-tint hover:text-ink-900"
          >
            Etherscan <ExternalLink className="h-3 w-3" />
          </a>
          <button
            type="button"
            onClick={refresh}
            disabled={loading}
            className="inline-flex h-8 items-center gap-1.5 rounded-full px-3 text-xs font-medium text-ink-500 transition hover:bg-surface-tint hover:text-ink-900 disabled:opacity-50"
          >
            <RefreshCw className={`h-3 w-3 ${loading ? 'animate-spin' : ''}`} /> Refresh
          </button>
        </div>
      </div>

      {error ? (
        <div className="flex items-start gap-3 px-5 py-6 text-sm text-ink-500">
          <Radio className="mt-0.5 h-4 w-4 shrink-0 text-ink-300" />
          <p>
            We couldn&rsquo;t reach Sepolia from your browser just now. The numbers on this page still apply; try
            <button type="button" onClick={refresh} className="mx-1 font-medium text-brand-600 hover:underline">
              refreshing
            </button>
            in a moment, or open the contract on Etherscan.
          </p>
        </div>
      ) : (
        <div className="px-5 pb-5 pt-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium text-ink-400">Reserve ratio</span>
            {band && (
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ${BAND_INFO[band].pill}`}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${BAND_INFO[band].dot}`} />
                {BAND_INFO[band].label}
              </span>
            )}
          </div>
          <RatioGauge ratio={ratio} />
          {band && <p className="-mt-1 mb-4 text-sm text-ink-500">{BAND_INFO[band].summary}</p>}

          <div className="grid grid-cols-2 gap-2.5 md:grid-cols-4">
            <Stat
              label="1 SC costs"
              value={priceEth ? `${formatAmount(priceEth, 7)} ETH` : '…'}
              hint={ethUsd ? `1 ETH ≈ $${formatAmount(ethUsd, 2)}` : undefined}
            />
            <Stat label="Reserve" value={data ? `${formatAmount(toNumber(data.reserve), 5)} ETH` : '…'} />
            <Stat label="SC supply" value={data ? formatAmount(toNumber(data.totalSupply), 2) : '…'} />
            <Stat
              label="Mint fee"
              value={feePercent !== null ? `${feePercent.toFixed(2)}%` : '…'}
              hint={dailyStability !== null ? `Stability fee ${dailyStability.toFixed(4)}%/day` : undefined}
            />
          </div>
          {data && (
            <p className="mt-3 text-right text-[0.6875rem] text-ink-300">
              Read directly from the contract at {data.fetchedAt.toLocaleTimeString()}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
