import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import DocPage from '@/components/docs/DocPage'
import { getDoc, getIndexSlug, getNeighbours } from '@/lib/docs'

export function generateMetadata(): Metadata {
  const doc = getDoc(getIndexSlug())
  return {
    title: 'Docs',
    description: doc?.description,
  }
}

export default function DocsIndexPage() {
  const slug = getIndexSlug()
  const doc = getDoc(slug)
  if (!doc) notFound()
  const { previous, next } = getNeighbours(slug)
  return <DocPage doc={doc} previous={previous} next={next} />
}
