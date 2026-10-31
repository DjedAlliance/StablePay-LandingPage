'use client'
import { motion } from 'framer-motion'
import { ChevronDown, Wallet } from 'lucide-react'
import LogoMark from '@/assets/logo.svg'

const Row = ({ label, value, dotClass }: { label: string; value: string; dotClass: string }) => (
  <div className="flex items-center justify-between rounded-xl border border-line bg-white px-3.5 py-3 transition hover:border-ink-300">
    <div className="min-w-0">
      <p className="text-[0.6875rem] font-medium uppercase tracking-wider text-ink-400">{label}</p>
      <p className="mt-1 flex items-center gap-2 text-sm font-medium text-ink-900">
        <span className={`h-2 w-2 shrink-0 rounded-full ${dotClass}`} />
        {value}
      </p>
    </div>
    <ChevronDown className="h-4 w-4 shrink-0 text-ink-300" />
  </div>
)

/**
 * A static illustration of the StablePay checkout dialog. Not interactive:
 * it exists to show the shape of the product, not to take a payment.
 */
export const WidgetMock = () => (
  <div className="relative mx-auto w-full max-w-[380px]" aria-hidden="true">
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      className="relative rounded-3xl border border-line bg-white shadow-lift"
    >
      {/* dialog chrome */}
      <div className="flex items-center justify-between border-b border-line-soft px-5 py-3.5">
        <span className="inline-flex items-center gap-2">
          <LogoMark className="h-6 w-6" />
          <span className="text-sm font-semibold tracking-tight text-ink-900">StablePay</span>
        </span>
        <span className="rounded-full bg-forest-50 px-2 py-0.5 text-[0.6875rem] font-semibold text-forest-600">
          Secure
        </span>
      </div>

      <div className="px-5 py-5">
        <p className="text-xs font-medium text-ink-400">Paying</p>
        <div className="mt-1 flex items-baseline justify-between gap-3">
          <p className="truncate text-[0.9375rem] font-medium text-ink-700">northwind.store</p>
          <p className="text-2xl font-semibold tracking-tight text-ink-900">
            25.00 <span className="text-base font-medium text-ink-400">SC</span>
          </p>
        </div>

        <div className="mt-5 space-y-2.5">
          <Row label="Network" value="Ethereum" dotClass="bg-brand-500" />
          <Row label="Pay with" value="ETH · balance 1.284" dotClass="bg-ember-400" />
        </div>

        <dl className="mt-5 space-y-2 border-t border-dashed border-line pt-4 text-sm">
          <div className="flex items-center justify-between">
            <dt className="text-ink-400">You pay</dt>
            <dd className="font-mono text-[0.8125rem] font-medium text-ink-900">0.0127551 ETH</dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-ink-400">Merchant receives</dt>
            <dd className="font-mono text-[0.8125rem] font-medium text-ink-900">25.00 SC</dd>
          </div>
        </dl>

        <div className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-brand-500 text-[0.9375rem] font-medium text-white shadow-brand">
          <Wallet className="h-[18px] w-[18px]" />
          Confirm in wallet
        </div>
        <p className="mt-3 text-center text-xs text-ink-400">
          Settles on-chain · no account, no redirect
        </p>
      </div>
    </motion.div>

  </div>
)

export default WidgetMock
