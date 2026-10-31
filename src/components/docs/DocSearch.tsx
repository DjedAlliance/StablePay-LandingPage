'use client'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createPortal } from 'react-dom'
import { CornerDownLeft, FileText, Hash, Search } from 'lucide-react'
import { twMerge } from 'tailwind-merge'

export type SearchEntry = {
  href: string
  title: string
  section: string
  description: string
  headings: { id: string; text: string }[]
}

type Result = { href: string; title: string; context: string; kind: 'page' | 'heading'; score: number }

function score(text: string, terms: string[]) {
  const value = text.toLowerCase()
  let total = 0
  for (const term of terms) {
    const index = value.indexOf(term)
    if (index === -1) return 0
    total += index === 0 ? 3 : value[index - 1] === ' ' ? 2 : 1
  }
  return total
}

export default function DocSearch({ index, shortcut = true }: { index: SearchEntry[]; shortcut?: boolean }) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [cursor, setCursor] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!shortcut) return
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setOpen((value) => !value)
      } else if (
        event.key === '/' &&
        !(event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement)
      ) {
        event.preventDefault()
        setOpen(true)
      } else if (event.key === 'Escape') {
        setOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [shortcut])

  useEffect(() => {
    if (open) {
      setQuery('')
      setCursor(0)
      setTimeout(() => inputRef.current?.focus(), 10)
    }
  }, [open])

  const results = useMemo<Result[]>(() => {
    const terms = query.toLowerCase().split(/\s+/).filter(Boolean)
    if (terms.length === 0) {
      return index
        .slice(0, 7)
        .map((entry) => ({ href: entry.href, title: entry.title, context: entry.section, kind: 'page', score: 1 }))
    }
    const found: Result[] = []
    for (const entry of index) {
      const pageScore = score(`${entry.title} ${entry.description}`, terms)
      if (pageScore)
        found.push({
          href: entry.href,
          title: entry.title,
          context: entry.description,
          kind: 'page',
          score: pageScore + 2,
        })
      for (const heading of entry.headings) {
        const headingScore = score(heading.text, terms)
        if (headingScore) {
          found.push({
            href: `${entry.href}#${heading.id}`,
            title: heading.text,
            context: entry.title,
            kind: 'heading',
            score: headingScore,
          })
        }
      }
    }
    return found.sort((a, b) => b.score - a.score).slice(0, 12)
  }, [index, query])

  const go = (result: Result | undefined) => {
    if (!result) return
    setOpen(false)
    router.push(result.href)
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Search documentation"
        className="flex w-full items-center gap-2.5 rounded-xl border border-line bg-surface-subtle px-3 py-2 text-left text-sm text-ink-400 transition hover:border-ink-300 hover:bg-white"
      >
        <Search className="h-4 w-4" />
        <span className="flex-1">Search docs</span>
        <kbd className="hidden rounded-md border border-line bg-white px-1.5 font-mono text-[0.6875rem] text-ink-400 sm:inline">
          ⌘K
        </kbd>
      </button>

      {open &&
        createPortal(
          <div
            className="fixed inset-0 z-[80] flex items-start justify-center px-4 pt-[12vh]"
            role="dialog"
            aria-modal="true"
            aria-label="Search documentation"
          >
            <button
              type="button"
              className="absolute inset-0 bg-ink-900/30 backdrop-blur-sm"
              onClick={() => setOpen(false)}
              aria-label="Close search"
            />
            <div className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-line bg-white shadow-lift">
              <div className="flex items-center gap-3 border-b border-line-soft px-4">
                <Search className="h-4 w-4 text-ink-400" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(event) => {
                    setQuery(event.target.value)
                    setCursor(0)
                  }}
                  onKeyDown={(event) => {
                    if (event.key === 'ArrowDown') {
                      event.preventDefault()
                      setCursor((value) => Math.min(value + 1, results.length - 1))
                    } else if (event.key === 'ArrowUp') {
                      event.preventDefault()
                      setCursor((value) => Math.max(value - 1, 0))
                    } else if (event.key === 'Enter') {
                      go(results[cursor])
                    }
                  }}
                  placeholder="Search: verify, Next.js, stability fee…"
                  className="h-14 flex-1 bg-transparent text-[0.9375rem] text-ink-900 outline-none placeholder:text-ink-300"
                />
                <kbd className="rounded-md border border-line px-1.5 font-mono text-[0.6875rem] text-ink-400">esc</kbd>
              </div>
              <ul className="max-h-[50vh] overflow-y-auto p-2">
                {results.length === 0 && (
                  <li className="px-3 py-8 text-center text-sm text-ink-400">No results for &ldquo;{query}&rdquo;</li>
                )}
                {results.map((result, i) => (
                  <li key={result.href}>
                    <button
                      type="button"
                      onMouseEnter={() => setCursor(i)}
                      onClick={() => go(result)}
                      className={twMerge(
                        'flex w-full items-start gap-3 rounded-xl px-3 py-2.5 text-left transition',
                        i === cursor ? 'bg-brand-50' : 'hover:bg-surface-subtle'
                      )}
                    >
                      {result.kind === 'page' ? (
                        <FileText className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
                      ) : (
                        <Hash className="mt-0.5 h-4 w-4 shrink-0 text-ink-300" />
                      )}
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-medium text-ink-900">{result.title}</span>
                        <span className="block truncate text-xs text-ink-400">{result.context}</span>
                      </span>
                      {i === cursor && <CornerDownLeft className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ink-300" />}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>,
          document.body
        )}
    </>
  )
}
