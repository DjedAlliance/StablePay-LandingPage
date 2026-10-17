import StabilityNexusLogo from '@/assets/stability-nexus.svg'
import { site } from '@/lib/site'

export const TrustBar = () => (
  <section className="border-y border-line bg-surface-subtle">
    <div className="container">
      <div className="flex justify-center py-6">
        <a
          href={site.stabilityNexus}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 text-[0.9375rem] font-medium text-ink-500 transition hover:text-ink-900"
        >
          Built and maintained by Stability Nexus
          <StabilityNexusLogo className="h-8 w-auto shrink-0" aria-hidden="true" />
        </a>
      </div>
    </div>
  </section>
)

export default TrustBar
