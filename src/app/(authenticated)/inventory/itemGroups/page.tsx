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
      apiPath='/db/itemGroups'
      options={{ type: 'Update' }}
      title="Ana Gruplar"
      onHeaderPaint={() => {
        return (<>
          <TableHead>Main Group</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Article</TableHead>
        </>)
      }}
      onRowPaint={(e, index) => {
        return (<>
          <TableCell className=''>{e.itemMainGroup.name}</TableCell>
          <TableCell className=''>{e.name}</TableCell>
          <TableCell className=''>{e.article}</TableCell>
        </>)
      }}

    />
  )
}

