'use client'
import { useState } from 'react'
import { Check, Copy } from 'lucide-react'

export const CopyButton = ({ code }: { code: string }) => {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      setCopied(false)
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex shrink-0 items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium text-white/55 transition hover:bg-white/10 hover:text-white"
      aria-label="Copy code"
    >
      {copied ? <Check className="h-3.5 w-3.5 text-forest-400" /> : <Copy className="h-3.5 w-3.5" />}
      <span>{copied ? 'Copied' : 'Copy'}</span>
    </button>
  )
}

export default CopyButton
