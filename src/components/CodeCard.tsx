'use client'
import { useState, Fragment } from 'react'
import { Check, Copy } from 'lucide-react'
import { twMerge } from 'tailwind-merge'

export type Snippet = { id: string; label: string; file: string; lang: 'bash' | 'jsx'; code: string }

/* A deliberately small highlighter. It covers the handful of token kinds these
   snippets actually contain, which is cheaper and more predictable than pulling
   a full syntax-highlighting dependency into a landing page. */
const PATTERN = new RegExp(
  [
    '(\\/\\/[^\\n]*|#[^\\n]*)', // 1 comment
    "('(?:[^'\\\\]|\\\\.)*'|\"(?:[^\"\\\\]|\\\\.)*\"|`(?:[^`\\\\]|\\\\.)*`)", // 2 string
    '(<\\/?[A-Za-z][\\w.]*|\\/?>)', // 3 jsx tag
    '\\b(import|from|const|let|new|return|export|default|function|async|await)\\b', // 4 keyword
    '\\b(\\d+(?:\\.\\d+)?)\\b', // 5 number
    '\\b([A-Z][A-Za-z0-9_]*)\\b', // 6 type-ish identifier
  ].join('|'),
  'g'
)

const CLASSES = [
  '', // full match placeholder
  'text-[#7C8CB2] italic', // comment
  'text-[#FFD84D]', // string
  'text-[#7FD1A6]', // jsx tag
  'text-[#8FADFF]', // keyword
  'text-[#FF9A73]', // number
  'text-[#F2F5FB]', // type
]

function highlight(code: string) {
  const out: React.ReactNode[] = []
  let last = 0
  let match: RegExpExecArray | null
  PATTERN.lastIndex = 0

  while ((match = PATTERN.exec(code)) !== null) {
    if (match.index > last) out.push(code.slice(last, match.index))
    const group = match.slice(1).findIndex((g) => g !== undefined) + 1
    out.push(
      <span key={`${match.index}-${group}`} className={CLASSES[group]}>
        {match[0]}
      </span>
    )
    last = match.index + match[0].length
  }
  if (last < code.length) out.push(code.slice(last))

  return out.map((node, i) => <Fragment key={i}>{node}</Fragment>)
}

export const CodeCard = ({ snippets }: { snippets: Snippet[] }) => {
  const [active, setActive] = useState(0)
  const [copied, setCopied] = useState(false)
  const snippet = snippets[active]

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(snippet.code)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      /* clipboard blocked; the code is selectable either way */
    }
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-brand-900/40 bg-[#0B1730] shadow-lift">
      {/* window chrome + tabs */}
      <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
        <span className="hidden gap-1.5 sm:flex" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-ember-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-gold-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-forest-400/70" />
        </span>
        <div className="flex flex-1 gap-1 overflow-x-auto" role="tablist" aria-label="Integration steps">
          {snippets.map((s, i) => (
            <button
              key={s.id}
              type="button"
              role="tab"
              aria-selected={i === active}
              onClick={() => setActive(i)}
              className={twMerge(
                'whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-medium transition',
                i === active ? 'bg-white/10 text-white' : 'text-white/50 hover:bg-white/5 hover:text-white/80'
              )}
            >
              {s.label}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={copy}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-white/60 transition hover:bg-white/10 hover:text-white"
          aria-label={`Copy ${snippet.label} snippet`}
        >
          {copied ? <Check className="h-3.5 w-3.5 text-forest-400" /> : <Copy className="h-3.5 w-3.5" />}
          <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>

      <div className="flex items-center justify-between border-b border-white/5 px-5 py-2">
        <span className="font-mono text-[0.6875rem] text-white/35">{snippet.file}</span>
      </div>

      <div className="min-h-[16rem] overflow-x-auto px-5 py-5">
        <pre className="font-mono text-[0.8125rem] leading-[1.75] text-[#C9D4E8]">
          <code>{highlight(snippet.code)}</code>
        </pre>
      </div>
    </div>
  )
}

export default CodeCard
