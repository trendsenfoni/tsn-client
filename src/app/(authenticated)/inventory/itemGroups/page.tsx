"use client"

import { useLanguage } from '@/i18n'
import { ListGrid } from '@/components/ui216/list-grid'
import { TableCell, TableHead } from '@/components/ui/table'
import { SelectRemote } from '@/components/ui216/select-remote'
export default function DatabasesPage() {
  const { t } = useLanguage()
  return (
    <ListGrid
      apiPath='/db/itemGroups'
      options={{ type: 'Update' }}
      title={t('Item Groups')}
      onHeaderPaint={() => {
        return (<>
          <TableHead>{t('Main Group')}</TableHead>
          <TableHead>{t('Name')}</TableHead>
          <TableHead>{t('Article')}</TableHead>
        </>)
      }}
      onRowPaint={(e, index) => {
        return (<>
          <TableCell className=''>{e.itemMainGroup.name}</TableCell>
          <TableCell className=''>{e.name}</TableCell>
          <TableCell className=''>{e.article}</TableCell>
        </>)
      }}
      onFilterPanel={(e, setFilter) => {
        return (<div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5'>
          <SelectRemote
            formData={e} field='itemMainGroup' setData={setFilter}
            apiPath='/db/itemMainGroups'
            all
          >{t('Main Group')}</SelectRemote>
        </div>)
      }}
    />
  )
}

