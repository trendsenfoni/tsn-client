import pageMeta from '@/lib/meta-info'
import { Metadata } from 'next/types'

export const metadata: Metadata = pageMeta('Mağazalar')

export default function PageLayout({ children }: { children: any }) {
  return (<>{children}</>)
}
