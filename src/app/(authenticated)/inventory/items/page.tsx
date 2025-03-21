"use client"

import { useLanguage } from '@/i18n'
import { ListGrid } from '../../../../components/ui216/list-grid'
import { TableCell, TableHead } from '@/components/ui/table'

export default function DatabasesPage() {
  const { t } = useLanguage()
  return (
    <ListGrid
      apiPath='/db/items'
      showSearch={true}
      showAddNew={true}
      showEdit={true}
      showDelete={true}
      onHeaderPaint={() => {
        return (<>
          <TableHead>Name</TableHead>
          <TableHead>Identifier</TableHead>
        </>)
      }}
      onRowPaint={(e, index) => {
        return (<>
          <TableCell className='font-bold'>{e.name}</TableCell>
          <TableCell className='font-mono'>{e.identifier}</TableCell>
        </>)
      }}
    />
  )
}

