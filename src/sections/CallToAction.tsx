import { ArrowRight, Github } from 'lucide-react'
import Button from '@/components/Button'
import Reveal from '@/components/Reveal'
import { site } from '@/lib/site'

export const CallToAction = () => (
  <section className="py-20 md:py-28">
    <div className="container">
      <Reveal>
        <div className="relative isolate overflow-hidden rounded-4xl border border-line bg-white px-6 py-16 text-center shadow-card md:px-12 md:py-20">
          {/* the logo's three circles again, this time as the closing note */}
          <div className="brand-wash" aria-hidden="true">
            <div className="absolute left-1/2 top-[-9rem] h-[26rem] w-[26rem] -translate-x-[75%] rounded-full bg-brand-400/25 blur-[80px]" />
            <div className="absolute left-1/2 top-[-4rem] h-[24rem] w-[24rem] -translate-x-[20%] rounded-full bg-gold-300/30 blur-[80px]" />
            <div className="absolute left-1/2 top-[2rem] h-[24rem] w-[24rem] -translate-x-[55%] rounded-full bg-ember-300/25 blur-[80px]" />
          </div>
          <div
            className="absolute inset-0 -z-10 rule-grid [mask-image:radial-gradient(60%_60%_at_50%_40%,black,transparent)]"
            aria-hidden="true"
          />

          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-display-md">Put a payment widget on your site this week.</h2>
            <p className="mt-5 text-lg leading-relaxed text-ink-500">
              It is open source and needs no sign-up. You can have it running against a local
              Tectonic deployment today.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button as="a" href={site.repo} target="_blank" rel="noopener noreferrer" size="lg">
                Start integrating <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                as="a"
                href={site.repo}
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
                size="lg"
              >
                <Github className="h-4 w-4" /> View the source
              </Button>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
)

export default CallToAction
