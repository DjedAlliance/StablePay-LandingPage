import { CRITICAL, SAFE, SUPER_CRITICAL } from '@/components/docs/widgets/tectonicLive'

const MIN = 1
const MAX = 2.2

const position = (value: number) => `${((Math.min(Math.max(value, MIN), MAX) - MIN) / (MAX - MIN)) * 100}%`

const LEGEND = [
  { label: `Floor ${SUPER_CRITICAL}`, swatch: 'bg-ink-300/60' },
  { label: `Triggered redemptions < ${CRITICAL}`, swatch: 'bg-ember-300' },
  { label: `Stability fee ≤ ${SAFE}`, swatch: 'bg-gold-300' },
  { label: `Healthy > ${SAFE}`, swatch: 'bg-forest-400/70' },
]

export const RatioGauge = ({ ratio }: { ratio: number | null }) => (
  <div className="relative pt-7">
    <div className="relative flex h-3 overflow-hidden rounded-full ring-1 ring-inset ring-black/5">
      <span className="bg-ink-300/60" style={{ width: position(SUPER_CRITICAL) }} />
      <span className="bg-ember-300" style={{ width: `calc(${position(CRITICAL)} - ${position(SUPER_CRITICAL)})` }} />
      <span className="bg-gold-300" style={{ width: `calc(${position(SAFE)} - ${position(CRITICAL)})` }} />
      <span className="flex-1 bg-forest-400/70" />
    </div>
    {[CRITICAL, SAFE, 2].map((mark) => (
      <span
        key={mark}
        className="absolute top-[2.35rem] -translate-x-1/2 font-mono text-[0.65rem] text-ink-400"
        style={{ left: position(mark) }}
      >
        {mark.toFixed(1)}
      </span>
    ))}
    {ratio !== null && (
      <span
        className="absolute top-0 -translate-x-1/2 transition-[left] duration-500 ease-out"
        style={{ left: position(ratio) }}
      >
        <span className="block rounded-md bg-ink-900 px-1.5 py-0.5 font-mono text-[0.7rem] font-medium text-white shadow-card">
          {ratio.toFixed(3)}
        </span>
        <span className="mx-auto block h-0 w-0 border-x-[5px] border-t-[5px] border-x-transparent border-t-ink-900" />
      </span>
    )}
    <ul className="mt-7 flex flex-wrap gap-x-4 gap-y-1.5">
      {LEGEND.map((item) => (
        <li key={item.label} className="flex items-center gap-1.5 text-[0.6875rem] text-ink-400">
          <span className={`h-2 w-3 rounded-sm ${item.swatch}`} />
          {item.label}
        </li>
      ))}
    </ul>
    <div className="h-3" />
  </div>
)

export default RatioGauge
