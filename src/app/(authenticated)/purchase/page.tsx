"use client"

import { Button } from '@/components/ui/button'
import { MenuPage } from '@/components/ui216/menu-page'
import { useLanguage } from '@/i18n'
import { NotebookPenIcon, UsersIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
export default function PurchasePage() {
  const router = useRouter()
  const { t } = useLanguage()

  return (<MenuPage title={t('Purchase')}>
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
      <Button onClick={() => router.push('/defines/firms?type=v')} variant={'outline'} className='flex justify-start gap-4'>
        <UsersIcon />{t('Vendors')}
      </Button>
      <Button onClick={() => router.push('/bizdocs/orders?io=1')} variant={'outline'} className='flex justify-start gap-4'>
        <NotebookPenIcon />{t('Purchase Orders')}
      </Button>
    </div>
  </MenuPage>)
}