import Link from 'next/link'
import { Fragment, type ReactNode } from 'react'
import { marked, type Token, type Tokens } from 'marked'
import { Check, ListChecks, Sparkles } from 'lucide-react'
import { plainText, resolveDocHref, slugify } from '@/lib/docs'
import CodeBlock from '@/components/docs/CodeBlock'
import Callout, { type CalloutKind } from '@/components/docs/Callout'
import DeepDive from '@/components/docs/DeepDive'
import SequenceDiagram from '@/components/docs/SequenceDiagram'
import { DocWidget, isWidgetName } from '@/components/docs/widgets'

const ENTITIES: Record<string, string> = { '&lt;': '<', '&gt;': '>', '&amp;': '&', '&quot;': '"', '&#39;': "'" }

const decode = (text: string) => text.replace(/&(lt|gt|amp|quot|#39);/g, (entity) => ENTITIES[entity] ?? entity)

const WIDGET_COMMENT = /^<!--\s*widget:([a-z-]+)\s*-->\s*$/
const ALERT = /^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*\n?/

type HeadingToken = Tokens.Heading & { id?: string }

function renderInline(tokens: Token[] | undefined, keyPrefix = 'i'): ReactNode[] {
  if (!tokens) return []
  return tokens.map((token, index) => {
    const key = `${keyPrefix}-${index}`
    switch (token.type) {
      case 'text': {
        const text = token as Tokens.Text
        if (text.tokens && text.tokens.length > 0) {
          return <Fragment key={key}>{renderInline(text.tokens, key)}</Fragment>
        }
        return <Fragment key={key}>{decode(text.text)}</Fragment>
      }
      case 'escape':
        return <Fragment key={key}>{decode((token as Tokens.Escape).text)}</Fragment>
      case 'strong':
        return (
          <strong key={key} className="font-semibold text-ink-900">
            {renderInline((token as Tokens.Strong).tokens, key)}
          </strong>
        )
      case 'em':
        return <em key={key}>{renderInline((token as Tokens.Em).tokens, key)}</em>
      case 'del':
        return <del key={key}>{renderInline((token as Tokens.Del).tokens, key)}</del>
      case 'codespan':
        return (
          <code key={key} className="doc-inline-code">
            {decode((token as Tokens.Codespan).text)}
          </code>
        )
      case 'br':
        return <br key={key} />
      case 'link': {
        const link = token as Tokens.Link
        const href = resolveDocHref(link.href)
        const children = renderInline(link.tokens, key)
        if (/^https?:/.test(href)) {
          return (
            <a key={key} href={href} target="_blank" rel="noopener noreferrer" className="doc-link">
              {children}
            </a>
          )
        }
        if (href.startsWith('#')) {
          return (
            <a key={key} href={href} className="doc-link">
              {children}
            </a>
          )
        }
        return (
          <Link key={key} href={href} className="doc-link">
            {children}
          </Link>
        )
      }
      default:
        return null
    }
  })
}

function summaryToTokens(summaryHtml: string) {
  const markdown = summaryHtml
    .replace(/<\/?b>/g, '**')
    .replace(/<\/?strong>/g, '**')
    .replace(/<code>(.*?)<\/code>/g, '`$1`')
    .replace(/<[^>]+>/g, '')
  return marked.Lexer.lexInline(markdown)
}

function parseCodeInfo(info: string | undefined) {
  const value = info ?? ''
  const lang = value.split(/\s+/)[0] || 'text'
  const title = value.match(/title="([^"]+)"/)?.[1]
  return { lang, title }
}

function Heading({ token }: { token: HeadingToken }) {
  const id = token.id ?? slugify(plainText(token.tokens))
  const content = renderInline(token.tokens, id)
  const anchor = (
    <a href={`#${id}`} className="doc-anchor" aria-label="Link to this section">
      #
    </a>
  )

  if (token.depth === 2) {
    return (
      <h2 id={id} className="doc-h2 group">
        {content}
        {anchor}
      </h2>
    )
  }

  if (token.depth === 3) {
    const text = plainText(token.tokens)
    const step = text.match(/^Step (\d+):\s*(.*)$/)
    if (step) {
      return (
        <h3 id={id} className="doc-step group">
          <span className="doc-step-number">{step[1]}</span>
          <span>{step[2]}</span>
          {anchor}
        </h3>
      )
    }
    return (
      <h3 id={id} className="doc-h3 group">
        {content}
        {anchor}
      </h3>
    )
  }

  return (
    <h4 id={id} className="doc-h4">
      {content}
    </h4>
  )
}

function List({ token }: { token: Tokens.List }) {
  const isTaskList = token.items.some((item) => item.task)
  const Tag = token.ordered ? 'ol' : 'ul'
  const start = token.ordered && typeof token.start === 'number' && token.start !== 1 ? token.start : undefined

  return (
    <Tag start={start} className={isTaskList ? 'doc-tasks' : token.ordered ? 'doc-ol' : 'doc-ul'}>
      {token.items.map((item, index) => (
        <li key={index} className={item.task ? 'doc-task' : undefined}>
          {item.task && (
            <span className={item.checked ? 'doc-task-box checked' : 'doc-task-box'} aria-hidden="true">
              {item.checked && <Check className="h-3 w-3" strokeWidth={3} />}
            </span>
          )}
          <div className="min-w-0 flex-1">{renderBlocks(item.tokens, item.loose)}</div>
        </li>
      ))}
    </Tag>
  )
}

function Table({ token }: { token: Tokens.Table }) {
  const hasHeader = token.header.some((cell) => cell.text.trim() !== '')
  return (
    <div className="doc-table-wrap">
      <table className="doc-table">
        <thead className={hasHeader ? undefined : 'sr-only'}>
          <tr>
            {token.header.map((cell, index) => (
              <th key={index} style={{ textAlign: token.align[index] ?? undefined }}>
                {renderInline(cell.tokens, `th-${index}`)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {token.rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} style={{ textAlign: token.align[cellIndex] ?? undefined }}>
                  {renderInline(cell.tokens, `td-${rowIndex}-${cellIndex}`)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function nextContentIndex(tokens: Token[], from: number) {
  let index = from
  while (index < tokens.length && tokens[index].type === 'space') index++
  return index
}

export function renderBlocks(tokens: Token[], loose = true): ReactNode[] {
  const out: ReactNode[] = []
  let skipNextMermaid = false

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i]
    const key = `b-${i}`

    switch (token.type) {
      case 'space':
        break

      case 'heading': {
        const heading = token as HeadingToken
        const text = plainText(heading.tokens)
        if (heading.depth === 1) break

        if (heading.depth === 2 && text === 'You will learn') {
          const listIndex = nextContentIndex(tokens, i + 1)
          const list = tokens[listIndex]
          if (list?.type === 'list') {
            out.push(
              <aside key={key} className="doc-learn" aria-label="You will learn">
                <p className="doc-learn-title">
                  <Sparkles className="h-4 w-4" /> You will learn
                </p>
                <ul>
                  {(list as Tokens.List).items.map((item, index) => (
                    <li key={index}>{renderBlocks(item.tokens, false)}</li>
                  ))}
                </ul>
              </aside>
            )
            i = listIndex
            break
          }
        }

        if (heading.depth === 2 && text === 'Recap') {
          let end = i + 1
          while (end < tokens.length && !(tokens[end].type === 'heading' && (tokens[end] as Tokens.Heading).depth <= 2))
            end++
          out.push(
            <section key={key} id={heading.id} className="doc-recap">
              <p className="doc-recap-title">
                <ListChecks className="h-4 w-4" /> Recap
              </p>
              {renderBlocks(tokens.slice(i + 1, end))}
            </section>
          )
          i = end - 1
          break
        }

        out.push(<Heading key={key} token={heading} />)
        break
      }

      case 'paragraph': {
        const paragraph = token as Tokens.Paragraph
        out.push(<p key={key}>{renderInline(paragraph.tokens, key)}</p>)
        break
      }

      case 'text': {
        const text = token as Tokens.Text
        const content = text.tokens ? renderInline(text.tokens, key) : decode(text.text)
        out.push(loose ? <p key={key}>{content}</p> : <Fragment key={key}>{content}</Fragment>)
        break
      }

      case 'code': {
        const code = token as Tokens.Code
        const { lang, title } = parseCodeInfo(code.lang)
        if (lang === 'mermaid') {
          if (skipNextMermaid) {
            skipNextMermaid = false
            break
          }
          if (/^\s*sequenceDiagram/.test(code.text)) {
            out.push(<SequenceDiagram key={key} source={code.text} />)
            break
          }
        }
        out.push(<CodeBlock key={key} code={code.text} lang={lang} title={title} />)
        break
      }

      case 'blockquote': {
        const quote = token as Tokens.Blockquote
        const alert = quote.text.match(ALERT)
        if (alert) {
          const inner = marked.lexer(quote.text.replace(ALERT, ''), { gfm: true })
          out.push(
            <Callout key={key} kind={alert[1].toLowerCase() as CalloutKind}>
              {renderBlocks(inner)}
            </Callout>
          )
        } else {
          out.push(
            <blockquote key={key} className="doc-quote">
              {renderBlocks(quote.tokens)}
            </blockquote>
          )
        }
        break
      }

      case 'list':
        out.push(<List key={key} token={token as Tokens.List} />)
        break

      case 'table':
        out.push(<Table key={key} token={token as Tokens.Table} />)
        break

      case 'hr': {
        const following = tokens[nextContentIndex(tokens, i + 1)]
        if (following?.type === 'heading' && (following as Tokens.Heading).depth === 2) break
        out.push(<hr key={key} className="doc-hr" />)
        break
      }

      case 'html': {
        const raw = (token as Tokens.HTML).raw.trim()
        const widget = raw.match(WIDGET_COMMENT)
        if (widget) {
          if (isWidgetName(widget[1])) out.push(<DocWidget key={key} name={widget[1]} />)
          const following = tokens[nextContentIndex(tokens, i + 1)]
          skipNextMermaid =
            following?.type === 'code' && parseCodeInfo((following as Tokens.Code).lang).lang === 'mermaid'
          break
        }

        const details = raw.match(/^<details>\s*<summary>([\s\S]*?)<\/summary>/)
        if (details) {
          let end = i + 1
          while (
            end < tokens.length &&
            !(tokens[end].type === 'html' && /^<\/details>/.test((tokens[end] as Tokens.HTML).raw.trim()))
          )
            end++
          const summaryTokens = summaryToTokens(details[1])
          const label = plainText(summaryTokens)
          const kind = /^Challenge/i.test(label) ? 'challenge' : /^Deep dive/i.test(label) ? 'deep-dive' : 'question'
          out.push(
            <DeepDive key={key} kind={kind} summary={renderInline(summaryTokens, key)}>
              {renderBlocks(tokens.slice(i + 1, end))}
            </DeepDive>
          )
          i = end
        }
        break
      }

      default:
        break
    }
  }

  return out
}

export function Markdown({ tokens }: { tokens: Token[] }) {
  return <div className="doc-prose">{renderBlocks(tokens)}</div>
}

export default Markdown
