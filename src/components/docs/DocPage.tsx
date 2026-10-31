import Link from 'next/link'
import { ArrowLeft, ArrowRight, Clock, PencilLine } from 'lucide-react'
import type { Doc, DocMeta } from '@/lib/docs'
import { plainText } from '@/lib/docs'
import Markdown from '@/components/docs/Markdown'
import TableOfContents from '@/components/docs/TableOfContents'
import { site } from '@/lib/site'

function readingMinutes(doc: Doc) {
  const words = plainText(doc.tokens).split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 220))
}

export default function DocPage({ doc, previous, next }: { doc: Doc; previous: DocMeta | null; next: DocMeta | null }) {
  return (
    <div className="flex min-w-0 flex-1 gap-10">
      <article className="min-w-0 flex-1 pb-20 pt-8 lg:pt-10">
        <header className="mb-8 border-b border-line-soft pb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-600">{doc.section}</p>
          <h1 className="mt-3 text-display-md">{doc.title}</h1>
          {doc.description && <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-500">{doc.description}</p>}
          <p className="mt-5 flex items-center gap-1.5 text-xs text-ink-400">
            <Clock className="h-3.5 w-3.5" /> {readingMinutes(doc)} min read
          </p>
        </header>

        <Markdown tokens={doc.tokens} />

        <footer className="mt-16 space-y-8">
          <a
            href={`${site.landingRepo}/blob/main/src/content/docs/${doc.file}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-ink-400 transition hover:text-brand-600"
          >
            <PencilLine className="h-4 w-4" /> Edit this page on GitHub
          </a>

          <nav className="grid gap-3 sm:grid-cols-2" aria-label="Previous and next pages">
            {previous ? (
              <Link href={previous.href} className="card-lift group flex flex-col gap-1 p-5">
                <span className="flex items-center gap-1.5 text-xs font-medium text-ink-400">
                  <ArrowLeft className="h-3.5 w-3.5 transition group-hover:-translate-x-0.5" /> Previous
                </span>
                <span className="font-semibold text-ink-900 group-hover:text-brand-700">{previous.title}</span>
              </Link>
            ) : (
              <span />
            )}
            {next && (
              <Link href={next.href} className="card-lift group flex flex-col items-end gap-1 p-5 text-right">
                <span className="flex items-center gap-1.5 text-xs font-medium text-ink-400">
                  Next <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
                </span>
                <span className="font-semibold text-ink-900 group-hover:text-brand-700">{next.title}</span>
              </Link>
            )}
          </nav>
        </footer>
      </article>

      <aside className="sticky top-[72px] hidden h-[calc(100vh-72px)] w-56 shrink-0 overflow-y-auto py-10 xl:block">
        <TableOfContents items={doc.headings} />
      </aside>
    </div>
  )
}
