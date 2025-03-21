"use client"

import { useLanguage } from '@/i18n'
import { ListGrid } from '../../../../components/ui216/list-grid'
import { TableCell, TableHead } from '@/components/ui/table'
import { ItemMainGroup } from '@/types/Item'
import { FormItemText } from '../../../../components/ui216/data-form'
export default function DatabasesPage() {
  const { t } = useLanguage()
  return (
    <ListGrid
      apiPath='/db/itemMainGroups'
      options={{ type: 'Update' }}
      title="Ana Gruplar"
      onHeaderPaint={() => {
        return (<>
          <TableHead>Name</TableHead>
          <TableHead>Article</TableHead>
        </>)
      }}
      onRowPaint={(e, index) => {
        return (<>
          <TableCell className='font-bold'>{e.name}</TableCell>
          <TableCell className='font-mono'>{e.article}</TableCell>
        </>)
      }}

    />
  )
}

