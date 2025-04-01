"use client"

import { useLanguage } from '@/i18n'
import { ListGrid } from '@/components/ui216/list-grid'
import { TableCell, TableHead } from '@/components/ui/table'
import { TaxType } from '@/types/Item'
export default function DatabasesPage() {
  const { t } = useLanguage()
  return (
    <ListGrid
      apiPath='/db/taxTypes'
      options={{ type: 'Update' }}
      title={t('Tax Types')}
      onHeaderPaint={() => {
        return (<>
          <TableHead>{t('Name')}</TableHead>
          <TableHead>{t('Tax Total')}</TableHead>
          <TableHead>{t('Withholding Tax')}</TableHead>
        </>)
      }}
      onRowPaint={(e: TaxType, index) => {
        return (<>
          <TableCell className='font-bold'>{e.name}</TableCell>
          <TableCell className=''>tax total..</TableCell>
          <TableCell className=''>withholding</TableCell>
        </>)
      }}

    />
  )
}

