"use client"

import { Button } from '@/components/ui/button'
import { useLanguage } from '@/i18n'
import { BoxesIcon, FolderTreeIcon, GroupIcon, UsersIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
export default function InventoryPage() {
  const router = useRouter()
  const { t } = useLanguage()

  return (<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
    <Button onClick={() => router.push('/defines/firms')} variant={'outline'} className='flex justify-start gap-4'>
      <UsersIcon />{t('Firms')}
    </Button>

  </div>)
}