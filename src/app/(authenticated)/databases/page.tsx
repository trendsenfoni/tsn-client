"use client"

import { useLanguage } from '@/i18n'
import { ListGrid } from '@/components/ui216/list-grid'
import { TableCell, TableHead } from '@/components/ui/table'
import { Database } from '@/types/Database'

export default function DatabasesPage() {
  const { t } = useLanguage()
  return (
    <ListGrid
      apiPath='/databases'
      title={t('Database List')}
      onHeaderPaint={() => {
        return (<>
          <TableHead>{t('Name')}</TableHead>
          <TableHead>{t('Identifier')}</TableHead>
        </>)
      }}
      onRowPaint={(e: Database, index) => {
        return (<>
          <TableCell className='font-bold'>{e.name}</TableCell>
          <TableCell className='font-mono'>{e.identifier}</TableCell>
        </>)
      }}
    />
  )
}

