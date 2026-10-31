import Link from 'next/link'
import { Terminal } from 'lucide-react'
import Reveal from '@/components/Reveal'
import SectionHeading from '@/components/SectionHeading'
import { site } from '@/lib/site'

type Status = 'live' | 'planned'

const statusStyles: Record<Status, { label: string; className: string }> = {
  live: { label: 'Live on testnet', className: 'bg-forest-50 text-forest-600 ring-forest-100' },
  planned: { label: 'Planned', className: 'bg-surface-tint text-ink-500 ring-line' },
}

const networks: { name: string; chainId: string; coin: string; status: Status }[] = [
  { name: 'Ethereum Sepolia', chainId: '11155111', coin: 'ETH', status: 'live' },
  { name: 'Ethereum Classic', chainId: '61', coin: 'ETC', status: 'planned' },
  { name: 'Base', chainId: '8453', coin: 'ETH', status: 'planned' },
]

const Pill = ({ status }: { status: Status }) => {
  const s = statusStyles[status]
  return (
    <span className={`inline-flex items-center whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium ring-1 ${s.className}`}>
      {s.label}
    </span>
  )
}

export const Networks = () => (
  <section id="networks" className="scroll-mt-24 py-20 md:py-28">
    <div className="container">
      <SectionHeading
        eyebrow="Networks"
        title="Where StablePay runs."
        description="The widget already supports wallet connection, network switching, pricing and both payment flows on each of these chains."
      />

      <div className="mt-14 grid gap-5 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        <Reveal className="min-w-0">
          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[32rem] text-left">
                <thead>
                  <tr className="border-b border-line bg-surface-subtle">
                    <th scope="col" className="whitespace-nowrap px-5 py-3 text-xs font-semibold uppercase tracking-wider text-ink-400">
                      Network
                    </th>
                    <th scope="col" className="whitespace-nowrap px-5 py-3 text-xs font-semibold uppercase tracking-wider text-ink-400">
                      Chain ID
                    </th>
                    <th scope="col" className="whitespace-nowrap px-5 py-3 text-xs font-semibold uppercase tracking-wider text-ink-400">
                      Native coin
                    </th>
                    <th scope="col" className="whitespace-nowrap px-5 py-3 text-xs font-semibold uppercase tracking-wider text-ink-400">
                      Tectonic
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {networks.map((network) => (
                    <tr key={network.chainId} className="border-b border-line-soft last:border-0">
                      <td className="px-5 py-4 text-[0.9375rem] font-medium text-ink-900">{network.name}</td>
                      <td className="px-5 py-4 font-mono text-[0.8125rem] tabular-nums text-ink-500">{network.chainId}</td>
                      <td className="px-5 py-4 text-[0.9375rem] text-ink-500">{network.coin}</td>
                      <td className="px-5 py-4">
                        <Pill status={network.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="min-w-0">
          <div className="card-lift h-full bg-white p-6">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
              <Terminal className="h-[22px] w-[22px]" />
            </span>
            <h3 className="mt-5 text-[1.0625rem] font-semibold">You can try it today</h3>
            <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-500">
              Run the demo shop against the live Tectonic deployment on Sepolia and pay yourself with
              free testnet ETH. Both payment flows work, end to end, in about five minutes.
            </p>
            <div className="mt-5 rounded-xl bg-[#0B1730] px-4 py-3">
              <pre className="overflow-x-auto font-mono text-[0.75rem] leading-6 text-[#C9D4E8]">
                <code>
                  {'git clone ' + site.repo + '.git\n'}
                  {'cd StablePay/stablepay-sdk && npm install\n'}
                  {'cd example && npm install\n'}
                  {'npm run dev'}
                </code>
              </pre>
            </div>
            <Link
              href={site.quickStart}
              className="mt-5 inline-flex text-sm font-medium text-brand-600 transition hover:text-brand-700"
            >
              Follow the quick start →
            </Link>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
)

export default Networks
