import 'server-only'
import { createHighlighter, type Highlighter, type ThemeRegistration } from 'shiki'

const theme: ThemeRegistration = {
  name: 'stablepay-night',
  type: 'dark',
  colors: { 'editor.background': '#0B1730', 'editor.foreground': '#C9D4E8' },
  tokenColors: [
    { scope: ['comment', 'punctuation.definition.comment'], settings: { foreground: '#7C8CB2', fontStyle: 'italic' } },
    { scope: ['string', 'string.quoted', 'string.template', 'markup.inline.raw'], settings: { foreground: '#FFD84D' } },
    {
      scope: ['constant.numeric', 'constant.language', 'constant.language.boolean'],
      settings: { foreground: '#FF9A73' },
    },
    {
      scope: ['keyword', 'storage', 'storage.type', 'storage.modifier', 'keyword.control', 'keyword.operator.new'],
      settings: { foreground: '#8FADFF' },
    },
    {
      scope: ['entity.name.tag', 'support.class.component', 'punctuation.definition.tag'],
      settings: { foreground: '#7FD1A6' },
    },
    { scope: ['entity.other.attribute-name'], settings: { foreground: '#FFC3AB' } },
    { scope: ['entity.name.function', 'support.function', 'meta.function-call'], settings: { foreground: '#BCCEFF' } },
    {
      scope: ['entity.name.type', 'support.type', 'entity.name.class', 'support.class'],
      settings: { foreground: '#F2F5FB' },
    },
    { scope: ['variable.parameter'], settings: { foreground: '#FFE2D5' } },
    { scope: ['support.type.property-name', 'meta.object-literal.key'], settings: { foreground: '#DCE6FF' } },
    { scope: ['keyword.operator', 'punctuation'], settings: { foreground: '#93A0BA' } },
    { scope: ['variable.other.constant'], settings: { foreground: '#FFE68A' } },
  ],
}

const LANGS = [
  'javascript',
  'jsx',
  'typescript',
  'tsx',
  'json',
  'bash',
  'html',
  'css',
  'php',
  'python',
  'sql',
  'solidity',
] as const

const ALIASES: Record<string, string> = {
  js: 'javascript',
  mjs: 'javascript',
  ts: 'typescript',
  sh: 'bash',
  shell: 'bash',
  py: 'python',
  sol: 'solidity',
}

let highlighter: Promise<Highlighter> | null = null

function getHighlighter() {
  if (!highlighter) {
    highlighter = createHighlighter({ themes: [theme], langs: [...LANGS] })
  }
  return highlighter
}

export async function highlight(code: string, lang: string) {
  const resolved = ALIASES[lang] ?? lang
  if (!(LANGS as readonly string[]).includes(resolved)) return null
  const instance = await getHighlighter()
  return instance.codeToHtml(code, { lang: resolved, theme: 'stablepay-night' })
}
