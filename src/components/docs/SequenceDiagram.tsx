type Participant = { id: string; label: string }
type Message = { from: string; to: string; text: string; dashed: boolean }

const TONES = [
  'border-brand-200 bg-brand-50 text-brand-700',
  'border-gold-200 bg-gold-50 text-gold-700',
  'border-ember-200 bg-ember-50 text-ember-600',
  'border-forest-100 bg-forest-50 text-forest-600',
  'border-line bg-surface-subtle text-ink-700',
]

function parse(source: string) {
  const participants: Participant[] = []
  const messages: Message[] = []
  const ensure = (id: string) => {
    if (!participants.some((p) => p.id === id)) participants.push({ id, label: id })
  }

  for (const rawLine of source.split('\n')) {
    const line = rawLine.trim()
    const participant = line.match(/^participant\s+(\S+)(?:\s+as\s+(.+))?$/)
    if (participant) {
      participants.push({ id: participant[1], label: participant[2] ?? participant[1] })
      continue
    }
    const message = line.match(/^(\S+?)\s*(-->>|->>)\s*(\S+?)\s*:\s*(.+)$/)
    if (message) {
      ensure(message[1])
      ensure(message[3])
      messages.push({ from: message[1], to: message[3], text: message[4], dashed: message[2] === '-->>' })
    }
  }
  return { participants, messages }
}

export default function SequenceDiagram({ source }: { source: string }) {
  const { participants, messages } = parse(source)
  const count = participants.length
  const center = (id: string) => ((participants.findIndex((p) => p.id === id) + 0.5) / count) * 100

  return (
    <figure className="doc-figure not-prose">
      <div className="overflow-x-auto">
        <div className="relative min-w-[560px] px-2 pb-4 pt-2">
          <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${count}, minmax(0, 1fr))` }}>
            {participants.map((participant, index) => (
              <div
                key={participant.id}
                className={`mx-auto rounded-xl border px-3 py-2 text-center text-xs font-semibold leading-tight shadow-xs ${TONES[index % TONES.length]}`}
              >
                {participant.label}
              </div>
            ))}
          </div>

          <div className="relative mt-3">
            {participants.map((participant) => (
              <span
                key={participant.id}
                className="absolute bottom-0 top-0 w-px border-l border-dashed border-ink-300/70"
                style={{ left: `${center(participant.id)}%` }}
                aria-hidden="true"
              />
            ))}

            <ol className="relative">
              {messages.map((message, index) => {
                const from = center(message.from)
                const to = center(message.to)
                const left = Math.min(from, to)
                const width = Math.abs(to - from)
                const rightward = to > from

                if (width === 0) {
                  return (
                    <li key={index} className="relative h-[4.75rem]">
                      <span
                        className="absolute top-1/2 inline-flex -translate-y-1/2 items-center gap-1.5 rounded-full border border-line bg-white px-2.5 py-1 text-[0.7rem] font-medium text-ink-500 shadow-xs"
                        style={{ left: `calc(${from}% + 10px)` }}
                      >
                        <span className="text-brand-500">↻</span> {message.text}
                      </span>
                    </li>
                  )
                }

                return (
                  <li key={index} className="relative h-[4.75rem]">
                    <span
                      className="absolute bottom-[1.55rem] -translate-x-1/2 rounded-md px-1.5 text-center text-[0.75rem] font-medium leading-snug text-ink-700"
                      style={{ left: `${left + width / 2}%`, width: `${Math.max(width - 4, 24)}%` }}
                    >
                      <span className="mr-1 font-mono text-[0.65rem] text-brand-500">{index + 1}</span>
                      {message.text}
                    </span>
                    <span
                      className={`absolute top-[3.6rem] h-0 border-t-2 ${message.dashed ? 'border-dashed border-ink-300' : 'border-brand-400'}`}
                      style={{ left: `${left}%`, width: `${width}%` }}
                      aria-hidden="true"
                    />
                    <svg
                      className={`absolute top-[3.6rem] ${message.dashed ? 'text-ink-300' : 'text-brand-400'}`}
                      style={{ left: rightward ? `calc(${to}% - 9px)` : `${to}%`, transform: 'translateY(-4px)' }}
                      width="9"
                      height="10"
                      viewBox="0 0 9 10"
                      aria-hidden="true"
                    >
                      <path d={rightward ? 'M0 0 L9 5 L0 10 Z' : 'M9 0 L0 5 L9 10 Z'} fill="currentColor" />
                    </svg>
                  </li>
                )
              })}
            </ol>
          </div>
        </div>
      </div>
      <figcaption className="sr-only">
        {messages.map((m, i) => `${i + 1}. ${m.from} to ${m.to}: ${m.text}`).join(' ')}
      </figcaption>
    </figure>
  )
}
