import XSocial from '@/assets/social-x.svg'
import YTSocial from '@/assets/social-youtube.svg'
import GitHubSvg from '@/assets/github.svg'
import Link from 'next/link'
import Logo from '@/components/Logo'
import { site } from '@/lib/site'

const columns = [
  {
    heading: 'Product',
    links: [
      { label: 'How it works', href: '/#how-it-works' },
      { label: 'Features', href: '/#features' },
      { label: 'Networks', href: '/#networks' },
      { label: 'FAQ', href: '/#faq' },
    ],
  },
  {
    heading: 'Developers',
    links: [
      { label: 'Documentation', href: site.docs },
      { label: 'Integration tutorial', href: site.tutorial },
      { label: 'GitHub repository', href: site.repo, external: true },
      { label: 'StablePay SDK', href: site.sdkRepo, external: true },
      { label: 'Tectonic contracts', href: site.tectonicContracts, external: true },
      { label: 'Tectonic app', href: site.tectonicApp, external: true },
    ],
  },
  {
    heading: 'Community',
    links: [
      { label: 'Stability Nexus', href: site.stabilityNexus, external: true },
      { label: 'Djed Alliance', href: site.djedAlliance, external: true },
      { label: 'X / Twitter', href: site.x, external: true },
      { label: 'YouTube', href: site.youtube, external: true },
    ],
  },
]

const legal = [
  { label: 'Terms of Use', href: site.termsOfUse },
  { label: 'Privacy Notice', href: site.privacyNotice },
]

const socials = [
  { Icon: GitHubSvg, href: site.repo, label: 'GitHub' },
  { Icon: XSocial, href: site.x, label: 'X' },
  { Icon: YTSocial, href: site.youtube, label: 'YouTube' },
]

export const Footer = () => (
  <footer className="border-t border-line bg-white">
    <div className="container">
      <div className="grid gap-10 py-14 md:grid-cols-[minmax(0,1.4fr)_repeat(3,minmax(0,1fr))] md:gap-8">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-400">
            An open-source widget that lets merchants accept Tectonic stablecoin payments directly
            from their customers&rsquo; wallets.
          </p>
          <div className="mt-6 flex gap-2">
            {socials.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full text-ink-300 transition hover:bg-surface-tint hover:text-ink-900"
              >
                <Icon className="h-[18px] w-[18px]" />
              </a>
            ))}
          </div>
        </div>

        {columns.map((column) => (
          <div key={column.heading}>
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-400">{column.heading}</h3>
            <ul className="mt-4 space-y-2.5">
              {column.links.map((link) => (
                <li key={link.label}>
                  {'external' in link && link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-ink-500 transition hover:text-ink-900"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link href={link.href} className="text-sm text-ink-500 transition hover:text-ink-900">
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center justify-between gap-3 border-t border-line-soft py-6 text-xs text-ink-400 sm:flex-row">
        <div className="flex flex-col items-center gap-x-5 gap-y-2 sm:flex-row">
          <p>© {new Date().getFullYear()} Stability Nexus</p>
          <ul className="flex items-center gap-5">
            {legal.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition hover:text-ink-900"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <p>Tectonic contracts are pre-audit and currently live on the Sepolia testnet.</p>
      </div>
    </div>
  </footer>
)

export default Footer
