import 'server-only'
import fs from 'node:fs'
import path from 'node:path'
import { marked, type Token, type Tokens } from 'marked'

export type DocMeta = {
  slug: string
  file: string
  title: string
  description: string
  section: string
  order: number
  href: string
}

export type DocHeading = { id: string; text: string; depth: number }

export type Doc = DocMeta & { tokens: Token[]; headings: DocHeading[] }

export type SearchEntry = {
  href: string
  title: string
  section: string
  description: string
  headings: { id: string; text: string }[]
}

const DOCS_DIR = path.join(process.cwd(), 'src/content/docs')
const INDEX_SLUG = 'introduction'

export const SECTION_ORDER = ['Get started', 'Learn', 'Guides', 'Reference']

function parseFrontMatter(source: string) {
  const match = source.match(/^---\n([\s\S]*?)\n---\n?/)
  if (!match) return { data: {} as Record<string, string>, body: source }
  const data: Record<string, string> = {}
  for (const line of match[1].split('\n')) {
    const pair = line.match(/^(\w+):\s*(.*)$/)
    if (!pair) continue
    let value = pair[2].trim()
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1)
    }
    data[pair[1]] = value
  }
  return { data, body: source.slice(match[0].length) }
}

function slugFromFile(file: string) {
  return file.replace(/\.md$/, '').replace(/^\d+-/, '')
}

function hrefFromSlug(slug: string) {
  return slug === INDEX_SLUG ? '/docs' : `/docs/${slug}`
}

let cache: DocMeta[] | null = null

export function getAllDocs(): DocMeta[] {
  if (cache) return cache
  cache = fs
    .readdirSync(DOCS_DIR)
    .filter((file) => /^\d+-.*\.md$/.test(file))
    .sort()
    .map((file) => {
      const { data } = parseFrontMatter(fs.readFileSync(path.join(DOCS_DIR, file), 'utf8'))
      const slug = slugFromFile(file)
      return {
        slug,
        file,
        title: data.title ?? slug,
        description: data.description ?? '',
        section: data.section ?? 'Guides',
        order: Number.parseInt(file, 10),
        href: hrefFromSlug(slug),
      }
    })
  return cache
}

export function getSidebar() {
  const docs = getAllDocs()
  return SECTION_ORDER.map((section) => ({
    section,
    items: docs.filter((doc) => doc.section === section).map(({ title, href }) => ({ title, href })),
  })).filter((group) => group.items.length > 0)
}

export function slugify(text: string) {
  return text.toLowerCase().trim().replace(new RegExp('[^\\p{L}\\p{N}\\s_-]', 'gu'), '').replace(/\s/g, '-')
}

export function plainText(tokens: Token[] | undefined): string {
  if (!tokens) return ''
  return tokens
    .map((token) => {
      if ('tokens' in token && Array.isArray(token.tokens)) return plainText(token.tokens as Token[])
      if (token.type === 'codespan') return (token as Tokens.Codespan).text
      if (token.type === 'html') return ''
      return 'text' in token ? String(token.text) : ''
    })
    .join('')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
}

export function resolveDocHref(href: string): string {
  if (/^(https?:|mailto:|#)/.test(href)) return href
  const match = href.match(/^(?:\.\/)?([^/#]+\.md)(#.*)?$/)
  if (!match) return href
  return hrefFromSlug(slugFromFile(match[1])) + (match[2] ?? '')
}

export function getDoc(slug: string): Doc | null {
  const meta = getAllDocs().find((doc) => doc.slug === slug)
  if (!meta) return null
  const { body } = parseFrontMatter(fs.readFileSync(path.join(DOCS_DIR, meta.file), 'utf8'))
  const tokens = marked.lexer(body, { gfm: true })

  const seen = new Map<string, number>()
  const headings: DocHeading[] = []
  for (const token of tokens) {
    if (token.type !== 'heading') continue
    const heading = token as Tokens.Heading
    const text = plainText(heading.tokens)
    const base = slugify(text)
    const count = seen.get(base) ?? 0
    seen.set(base, count + 1)
    const id = count === 0 ? base : `${base}-${count}`
    ;(heading as Tokens.Heading & { id?: string }).id = id
    if (heading.depth >= 2 && heading.depth <= 3 && text !== 'You will learn') {
      headings.push({ id, text, depth: heading.depth })
    }
  }

  return { ...meta, tokens, headings }
}

export function getIndexSlug() {
  return INDEX_SLUG
}

export function getNeighbours(slug: string) {
  const docs = getAllDocs()
  const index = docs.findIndex((doc) => doc.slug === slug)
  return {
    previous: index > 0 ? docs[index - 1] : null,
    next: index >= 0 && index < docs.length - 1 ? docs[index + 1] : null,
  }
}

export function getSearchIndex(): SearchEntry[] {
  return getAllDocs().map((meta) => {
    const doc = getDoc(meta.slug)
    return {
      href: meta.href,
      title: meta.title,
      section: meta.section,
      description: meta.description,
      headings: (doc?.headings ?? []).map(({ id, text }) => ({ id, text })),
    }
  })
}
