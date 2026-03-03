import { type GetStaticProps } from 'next'

import type { PageProps } from '@/lib/types'
import { NotionPage } from '@/components/NotionPage'
import { domain } from '@/lib/config'
import { resolveNotionPage } from '@/lib/resolve-notion-page'

export const getStaticProps: GetStaticProps<PageProps> = async (context) => {
  try {
    const props = await resolveNotionPage(domain)

    return { props, revalidate: 10 }
  } catch (err) {
    console.error('page error', domain, err)
    if (context.revalidateReason === 'build') {
      return { notFound: true, revalidate: 10 }
    }

    // preserve previously generated pages during ISR errors
    throw err
  }
}

export default function NotionDomainPage(props: PageProps) {
  return <NotionPage {...props} />
}
