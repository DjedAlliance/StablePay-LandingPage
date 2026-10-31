import WidgetMock from '@/components/WidgetMock'

export default function CheckoutPreview() {
  return (
    <div className="doc-widget relative isolate overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute -left-10 -top-16 h-56 w-56 rounded-full bg-brand-300/30 blur-3xl" />
        <div className="absolute -right-10 top-10 h-56 w-56 rounded-full bg-ember-200/40 blur-3xl" />
        <div className="absolute bottom-[-4rem] left-1/3 h-56 w-56 rounded-full bg-gold-200/40 blur-3xl" />
      </div>
      <div className="grid items-center gap-6 px-6 py-8 md:grid-cols-[minmax(0,1fr)_minmax(0,340px)] md:px-10">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-600">What your customer sees</p>
          <p className="mt-3 text-xl font-semibold tracking-tight text-ink-900">One dialog. One signature. Done.</p>
          <ul className="mt-4 space-y-2 text-sm text-ink-500">
            <li className="flex gap-2">
              <span className="text-forest-500">●</span> Pick a network and a token
            </li>
            <li className="flex gap-2">
              <span className="text-forest-500">●</span> See exactly what they pay and what you receive
            </li>
            <li className="flex gap-2">
              <span className="text-forest-500">●</span> Confirm in their own wallet
            </li>
          </ul>
        </div>
        <div className="scale-[0.92] md:scale-100">
          <WidgetMock />
        </div>
      </div>
    </div>
  )
}
