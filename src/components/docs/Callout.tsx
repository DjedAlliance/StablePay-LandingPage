import type { ReactNode } from 'react'
import { AlertTriangle, Info, Lightbulb, OctagonAlert, Star } from 'lucide-react'
import { twMerge } from 'tailwind-merge'

export type CalloutKind = 'note' | 'tip' | 'important' | 'warning' | 'caution'

const styles: Record<CalloutKind, { label: string; icon: typeof Info; box: string; title: string }> = {
  note: { label: 'Note', icon: Info, box: 'border-brand-200 bg-brand-50/70', title: 'text-brand-700' },
  tip: { label: 'Tip', icon: Lightbulb, box: 'border-forest-100 bg-forest-50/70', title: 'text-forest-600' },
  important: { label: 'Important', icon: Star, box: 'border-brand-300 bg-surface-tint', title: 'text-brand-800' },
  warning: { label: 'Pitfall', icon: AlertTriangle, box: 'border-gold-200 bg-gold-50/80', title: 'text-gold-700' },
  caution: { label: 'Caution', icon: OctagonAlert, box: 'border-ember-200 bg-ember-50/80', title: 'text-ember-600' },
}

export const Callout = ({ kind, children }: { kind: CalloutKind; children: ReactNode }) => {
  const style = styles[kind]
  const Icon = style.icon
  return (
    <aside className={twMerge('doc-callout', style.box)}>
      <p className={twMerge('doc-callout-title', style.title)}>
        <Icon className="h-4 w-4" />
        {style.label}
      </p>
      <div className="doc-callout-body">{children}</div>
    </aside>
  )
}

export default Callout
