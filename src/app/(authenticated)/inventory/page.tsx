"use client"

import { Button } from '@/components/ui/button'
import { useLanguage } from '@/i18n'
import { BoxesIcon, GroupIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
export default function InventoryPage() {
  const router = useRouter()
  const { t } = useLanguage()

  return (<div className='grid grid-cols-1 lg:grid-cols-4 gap-4'>
    <Button variant={'outline'} className='flex gap-4'>
      <BoxesIcon />{t('Items')}
    </Button>
    <Button onClick={() => router.push('/inventory/itemMainGroups')} variant={'outline'} className='flex gap-4'>
      <GroupIcon />{t('Item Main Groups')}
    </Button>
    <Button onClick={() => router.push('/inventory/itemGroups')} variant={'outline'} className='flex gap-4'>
      <GroupIcon />{t('Item Groups')}
    </Button>
  </div>)
}