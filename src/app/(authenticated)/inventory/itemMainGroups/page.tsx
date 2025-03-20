"use client"

import { useLanguage } from '@/i18n'
import { ListGrid } from '../../(components)/list-grid'
import { TableCell, TableHead } from '@/components/ui/table'
import { ItemMainGroup } from '@/types/Item'
export default function DatabasesPage() {
  const { t } = useLanguage()
  return (
    <ListGrid
      apiPath='/db/itemMainGroups'
      showSearch={true}
      showAddNew={true}
      showEdit={true}
      showDelete={true}
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

