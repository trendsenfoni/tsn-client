"use client"

import { useLanguage } from '@/i18n'
import { ListGrid } from '@/components/ui216/list-grid'
import { TableCell, TableHead } from '@/components/ui/table'
import { Firm } from '@/types/Firm'
import { firmTypeList } from '@/lib/utils'
import { TsnSelect } from '@/components/ui216/tsn-select'
export default function ListPage() {
  const { t } = useLanguage()
  return (
    <ListGrid
      apiPath='/db/firms'
      options={{ type: 'Update' }}
      title={t('Firms')}
      onHeaderPaint={() => {
        return (<>
          <TableHead>{t('Name')}</TableHead>
          <TableHead className='hidden lg:table-cell text-center'>{t('Passive?')}</TableHead>
        </>)
      }}
      onRowPaint={(e: Firm, index) => {
        return (<>
          <TableCell className=''>
            <div className='flex flex-col'>
              <span className='lg:font-semibold'>{e.name}</span>
              <span className='text-[8pt] text-muted-foreground'>{t(firmTypeList.find(f => f._id == e.type)?.text || '')}</span>
            </div>
          </TableCell>
          <TableCell className='hidden lg:table-cell text-center'>
            {e.passive && <>✅</>}
          </TableCell>
        </>)
      }}
      defaultFilter={{ passive: false }}
      onFilterPanel={(filter, setFilter) => {

        return (<div className='flex flex-col lg:flex-row  gap-4 lg:items-center '>
          <TsnSelect title={t('Passive?')}
            className='mb-1 mt-1 lg:max-w-36'
            list={[{ _id: ' ', text: '*' }, { _id: 'false', text: t('Actives') }, { _id: 'true', text: t('Passives') }]}
            defaultValue={filter.passive || 'false'}
            onValueChange={e => setFilter({ ...filter, passive: e })}
          />
          <TsnSelect title={t('Type')}
            className='mb-1 mt-1 lg:max-w-48'
            defaultValue={filter.type}
            list={firmTypeList.map(e => ({ _id: e._id, text: t(e.text) }))}
            onValueChange={e => setFilter({ ...filter, type: e })}
            all
          />
        </div>)
      }}

    />
  )
}
