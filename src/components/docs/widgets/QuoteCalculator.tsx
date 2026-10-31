'use client'
import { useMemo, useState } from 'react'
import { ArrowRight, Calculator } from 'lucide-react'
import { D, ONE, ZERO, formatAmount, toNumber, useTectonicLive } from '@/components/docs/widgets/tectonicLive'

function parseAmount(input: string): bigint | null {
  const value = input.trim()
  if (!/^\d+(\.\d{0,18})?$/.test(value)) return null
  const [whole, fraction = ''] = value.split('.')
  const units = BigInt(whole) * D + BigInt(fraction.padEnd(18, '0') || '0')
  return units > ZERO ? units : null
}

const ceilDiv = (a: bigint, b: bigint) => (a + b - ONE) / b

export default function QuoteCalculator() {
  const { data, error } = useTectonicLive()
  const [input, setInput] = useState('25')
  const amount = parseAmount(input)

  const quote = useMemo(() => {
    if (!data || !amount) return null
    const net = D - data.fee - data.devFee
    const beforeFees = (amount * data.scPriceMint) / D
    const required = ceilDiv(amount * data.scPriceMint, net) + ONE
    return { beforeFees, required, fees: required - beforeFees }
  }, [data, amount])

  const feePercent = data ? (toNumber(data.fee) + toNumber(data.devFee)) * 100 : 0.2

  return (
    <div className="doc-widget">
      <div className="flex items-center gap-2 border-b border-line-soft px-5 py-3.5">
        <Calculator className="h-4 w-4 text-brand-500" />
        <p className="text-sm font-semibold text-ink-900">ETH quote calculator</p>
        <span className="ml-auto text-xs text-ink-400">
          {data ? 'live Sepolia price' : error ? 'offline' : 'loading…'}
        </span>
      </div>

      <div className="grid gap-5 px-5 py-5 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1.2fr)] md:items-center">
        <label className="block">
          <span className="text-xs font-medium text-ink-400">Your invoice</span>
          <span className="mt-1.5 flex items-center rounded-xl border border-line bg-white pr-3 focus-within:border-brand-400 focus-within:ring-2 focus-within:ring-brand-100">
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              inputMode="decimal"
              className="w-full min-w-0 rounded-xl bg-transparent px-3 py-2.5 font-mono text-lg font-medium text-ink-900 outline-none"
              aria-label="Invoice amount in SC"
            />
            <span className="font-medium text-ink-400">SC</span>
          </span>
          {!amount && (
            <span className="mt-1 block text-xs text-ember-500">Enter a positive amount, up to 18 decimals.</span>
          )}
        </label>

        <ArrowRight className="hidden h-5 w-5 text-ink-300 md:block" />

        <dl className="space-y-2 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-ink-400">Oracle price</dt>
            <dd className="font-mono tabular-nums text-ink-700">
              {data ? `${formatAmount(toNumber(data.scPriceMint), 8)} ETH / SC` : '…'}
            </dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-ink-400">Before fees</dt>
            <dd className="font-mono tabular-nums text-ink-700">
              {quote ? `${formatAmount(toNumber(quote.beforeFees), 8)} ETH` : '…'}
            </dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-ink-400">Protocol fees ({feePercent.toFixed(2)}%) + rounding</dt>
            <dd className="font-mono tabular-nums text-ink-700">
              {quote ? `${formatAmount(toNumber(quote.fees), 8)} ETH` : '…'}
            </dd>
          </div>
          <div className="flex justify-between gap-4 border-t border-dashed border-line pt-2">
            <dt className="font-medium text-ink-900">Customer pays</dt>
            <dd className="font-mono font-semibold tabular-nums text-ink-900">
              {quote ? `${formatAmount(toNumber(quote.required), 8)} ETH` : '…'}
            </dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="font-medium text-ink-900">Merchant receives</dt>
            <dd className="font-mono font-semibold tabular-nums text-forest-600">
              {amount ? `${input.trim()} SC` : '…'}
            </dd>
          </div>
        </dl>
      </div>
      {quote && (
        <p className="border-t border-line-soft px-5 py-2.5 font-mono text-[0.6875rem] text-ink-400">
          exact: {quote.required.toString()} wei
        </p>
      )}
    </div>
  )
}
