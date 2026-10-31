import CheckoutPreview from '@/components/docs/widgets/CheckoutPreview'
import LiveStats from '@/components/docs/widgets/LiveStats'
import PaymentFlow from '@/components/docs/widgets/PaymentFlow'
import QuoteCalculator from '@/components/docs/widgets/QuoteCalculator'
import ReservePlayground from '@/components/docs/widgets/ReservePlayground'
import TutorialMap from '@/components/docs/widgets/TutorialMap'

const WIDGETS = {
  'checkout-preview': CheckoutPreview,
  'live-stats': LiveStats,
  'payment-flow': PaymentFlow,
  'quote-calculator': QuoteCalculator,
  'reserve-playground': ReservePlayground,
  'tutorial-map': TutorialMap,
} as const

export type WidgetName = keyof typeof WIDGETS

export const isWidgetName = (name: string): name is WidgetName => name in WIDGETS

export const DocWidget = ({ name }: { name: WidgetName }) => {
  const Component = WIDGETS[name]
  return (
    <div className="not-prose my-8">
      <Component />
    </div>
  )
}
