import { FileCode2, Terminal } from 'lucide-react'
import { highlight } from '@/lib/highlight'
import CopyButton from '@/components/docs/CopyButton'

const LANG_LABELS: Record<string, string> = {
  js: 'JavaScript',
  javascript: 'JavaScript',
  jsx: 'JSX',
  ts: 'TypeScript',
  tsx: 'TSX',
  json: 'JSON',
  bash: 'Terminal',
  html: 'HTML',
  css: 'CSS',
  php: 'PHP',
  python: 'Python',
  sql: 'SQL',
  solidity: 'Solidity',
  text: 'Text',
  mermaid: 'Diagram',
}

const escapeHtml = (text: string) => text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

export default async function CodeBlock({ code, lang, title }: { code: string; lang: string; title?: string }) {
  const html = (await highlight(code, lang)) ?? `<pre class="shiki"><code>${escapeHtml(code)}</code></pre>`
  const label = title ?? LANG_LABELS[lang] ?? lang
  const isTerminal = lang === 'bash' || lang === 'sh'
  const Icon = isTerminal ? Terminal : FileCode2

  return (
    <figure className="doc-code">
      <figcaption className="doc-code-bar">
        <span className="flex min-w-0 items-center gap-2">
          <Icon className="h-3.5 w-3.5 shrink-0 text-white/40" />
          <span className="truncate font-mono text-[0.75rem] text-white/60">{label}</span>
        </span>
        <CopyButton code={code} />
      </figcaption>
      <div className="doc-code-body" dangerouslySetInnerHTML={{ __html: html }} />
    </figure>
  )
}
