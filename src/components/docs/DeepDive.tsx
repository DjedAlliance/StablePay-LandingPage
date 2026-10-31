import type { ReactNode } from 'react'
import { ChevronDown, CircleHelp, FlaskConical, Puzzle } from 'lucide-react'

export const DeepDive = ({
  kind,
  summary,
  children,
}: {
  kind: 'deep-dive' | 'challenge' | 'question'
  summary: ReactNode
  children: ReactNode
}) => {
  const Icon = kind === 'challenge' ? Puzzle : kind === 'question' ? CircleHelp : FlaskConical
  return (
    <details className={`doc-details group is-${kind}`}>
      <summary>
        <span className="doc-details-icon">
          <Icon className="h-4 w-4" />
        </span>
        <span className="min-w-0 flex-1">{summary}</span>
        <ChevronDown className="h-4 w-4 shrink-0 text-ink-300 transition-transform duration-300 group-open:rotate-180" />
      </summary>
      <div className="doc-details-body">{children}</div>
    </details>
  )
}

export default DeepDive
