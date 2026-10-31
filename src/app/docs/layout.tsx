import type { ReactNode } from 'react'
import { Header } from '@/sections/Header'
import { Footer } from '@/sections/Footer'
import { DocsMobileNav, DocsSidebar } from '@/components/docs/DocsSidebar'
import DocSearch from '@/components/docs/DocSearch'
import { getSearchIndex, getSidebar } from '@/lib/docs'

export default function DocsLayout({ children }: { children: ReactNode }) {
  const groups = getSidebar()
  const searchIndex = getSearchIndex()

  return (
    <>
      <Header wide />
      <div className="mx-auto w-full max-w-[1400px] px-5 md:px-8">
        <DocsMobileNav groups={groups}>
          <DocSearch index={searchIndex} shortcut={false} />
        </DocsMobileNav>
        <div className="flex gap-10">
          <DocsSidebar groups={groups}>
            <DocSearch index={searchIndex} />
          </DocsSidebar>
          <main id="content" className="flex min-w-0 flex-1">
            {children}
          </main>
        </div>
      </div>
      <Footer />
    </>
  )
}
