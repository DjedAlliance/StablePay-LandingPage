import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import DocPage from '@/components/docs/DocPage'
import { getAllDocs, getDoc, getIndexSlug, getNeighbours } from '@/lib/docs'

export const dynamicParams = false

export function generateStaticParams() {
  return getAllDocs()
    .filter((doc) => doc.slug !== getIndexSlug())
    .map((doc) => ({ slug: doc.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const doc = getDoc(params.slug)
  if (!doc) return {}
  return { title: doc.title, description: doc.description }
}

export default function DocSlugPage({ params }: { params: { slug: string } }) {
  const doc = getDoc(params.slug)
  if (!doc) notFound()
  const { previous, next } = getNeighbours(params.slug)
  return <DocPage doc={doc} previous={previous} next={next} />
}
