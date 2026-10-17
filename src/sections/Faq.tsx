import { ChevronDown } from 'lucide-react'
import Reveal from '@/components/Reveal'
import SectionHeading from '@/components/SectionHeading'
import { site } from '@/lib/site'

const faqs = [
  {
    q: 'Do I need to run a backend?',
    a: 'No. The widget runs entirely in your customer’s browser and sends the transaction through their wallet. There is no StablePay server involved, so there is no StablePay outage that can stop you from getting paid. You set the price of what you sell. When a customer pays with the native coin, the exchange rate used to mint the stablecoins comes from the price oracle that Tectonic uses.',
  },
  {
    q: 'Does StablePay ever hold my funds?',
    a: 'Never. There is no account to open and no balance to withdraw. The payment moves from your customer’s wallet to the address you configured, inside the transaction they sign. StablePay is code on your page, not a counterparty.',
  },
  {
    q: 'What does my customer need?',
    a: 'An EVM wallet in their browser, such as MetaMask. If they are on the wrong network the widget asks them to switch, and if their wallet does not know the chain yet it offers to add it. They do not need a StablePay account.',
  },
  {
    q: 'What if the customer only holds the native coin?',
    a: 'They can still pay without swapping first. Your price stays in stablecoins. The widget works out how much of the native coin that costs using the Tectonic oracle, and Tectonic mints the stablecoins directly to your address in the same transaction. You never hold the volatile asset.',
  },
  {
    q: 'Are there chargebacks?',
    a: 'No. On-chain settlement is final, so a payment cannot be reversed against you weeks later. The flip side is that refunds are yours to issue deliberately, by sending funds back.',
  },
  {
    q: 'Is this production-ready?',
    a: 'The widget and SDK are complete and tested end to end against a local Tectonic deployment. The Tectonic contracts themselves are still pre-audit and not yet deployed on a public network. You can integrate and pilot StablePay today, and the networks table above shows which public deployment comes first.',
  },
]

export const Faq = () => (
  <section id="faq" className="scroll-mt-24 border-t border-line bg-surface-subtle py-20 md:py-28">
    <div className="container">
      <SectionHeading eyebrow="FAQ" title="The questions merchants actually ask." />

      <div className="mx-auto mt-14 max-w-3xl space-y-3">
        {faqs.map((faq, i) => (
          <Reveal key={faq.q} delay={Math.min(i, 3) * 0.05}>
            <details className="group card overflow-hidden [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-[1.0625rem] font-medium text-ink-900 transition hover:bg-surface-tint md:px-6 md:py-5">
                {faq.q}
                <ChevronDown className="h-5 w-5 shrink-0 text-ink-300 transition-transform duration-300 group-open:rotate-180" />
              </summary>
              <div className="px-5 pb-5 md:px-6 md:pb-6">
                <p className="max-w-2xl text-[0.9375rem] leading-relaxed text-ink-500">{faq.a}</p>
              </div>
            </details>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1}>
        <p className="mt-10 text-center text-[0.9375rem] text-ink-400">
          Still have a question?{' '}
          <a
            href={`${site.repo}/issues`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-brand-600 underline-offset-4 transition hover:text-brand-700 hover:underline"
          >
            Open an issue on GitHub
          </a>{' '}
          and we will answer it there.
        </p>
      </Reveal>
    </div>
  </section>
)

export default Faq
