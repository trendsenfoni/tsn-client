"use client"

import { useLanguage } from '@/i18n'
import { ListGrid } from '@/components/ui216/list-grid'
import { TableCell, TableHead } from '@/components/ui/table'
import { useEffect, useState } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { TsnSelectRemote } from '@/components/ui216/tsn-select-remote'
import { Item, ItemGroup } from '@/types/Item'
import { showWithholdingTax } from '@/lib/utils'
import { TsnSelect } from '@/components/ui216/tsn-select'
export default function DatabasesPage() {
  const { t } = useLanguage()
  return (
    <ListGrid
      apiPath='/db/items'
      options={{ type: 'Update' }}
      title={t('Items')}
      onHeaderPaint={() => {
        return (<>
          <TableHead>{t('Name')}</TableHead>
          <TableHead>{t('Taxes')}</TableHead>
          <TableHead className='hidden lg:table-cell'>{t('Description')}</TableHead>
          <TableHead className='hidden lg:table-cell text-center'>{t('Passive?')}</TableHead>
        </>)
      }}
      onRowPaint={(e: Item, index) => {
        return (<>
          <TableCell className='lg:font-semibold flex flex-col'>
            {e.name}
            <div className='flex gap-1 text-[8pt] lg:text-xs text-wrap text-muted-foreground'>
              <span className='border border-dashed px-1 rounded-sm'>{e.itemGroup?.itemMainGroup?.name}</span>
              <span className='border border-dashed px-1 rounded-sm'>{e.itemGroup?.name}</span>
            </div>
          </TableCell>
          <TableCell className='text-sm lg:space-x-2'>
            <div className='flex flex-col '>
              {(e.vatRate || 0) > 0 && <span>%{e.vatRate}</span>}
              {(e.withHoldingTaxRate || 0) > 0 &&
                <span className='text-[8pt] text-nowrap text-muted-foreground'>wht:{showWithholdingTax(e.withHoldingTaxRate)}</span>
              }
            </div>
          </TableCell>

          <TableCell className='hidden lg:table-cell'>{e.description}</TableCell>
          <TableCell className='hidden lg:table-cell text-center'>
            {e.passive && <>✅</>}
          </TableCell>
        </>)
      }}
      onFilterPanel={(filter, setFilter) => {
        // useEffect(() => setFilter({ ...filter, passive: false }), [])
        return (<div className='flex flex-col lg:flex-row  gap-4 lg:items-center '>
          <TsnSelect title={t('Passive?')}
            className='mb-1 mt-1 lg:max-w-36'
            list={[{ _id: ' ', text: '*' }, { _id: 'false', text: t('Actives') }, { _id: 'true', text: t('Passives') }]}
            defaultValue={filter.passive || 'false'}
            onValueChange={e => setFilter({ ...filter, passive: e })}
          />
          <ItemGroupMainGroup filter={filter} setFilter={setFilter} />
        </div>)
      }}

    />
  )
}

interface ItemGroupMainGroupProps {
  filter: any
  setFilter: (e: ItemGroup) => void
  className?: string
}
export function ItemGroupMainGroup({
  filter, setFilter, className = 'w-full grid grid-cols-1 md:grid-cols-4 gap-4'
}: ItemGroupMainGroupProps) {
  const [loading, setLoading] = useState(false)
  const { t } = useLanguage()

  // useEffect(() => { }, [])
  // useEffect(() => { }, [])
  useEffect(() => {
    filter.itemMainGroup = ''
    filter.itemGroup = ''
  }, [filter._id])
  return (<div className={className}>

    <TsnSelectRemote
      className='mt-1 mb-1'
      title={t('Main Group')}
      defaultValue={filter.itemMainGroup}
      onValueChange={e => {
        setLoading(true)
        setFilter({ ...filter, itemMainGroup: e.trim(), itemGroup: '' })
        setTimeout(() => setLoading(false), 100)
      }}
      apiPath='/db/itemMainGroups'
      all
    >{t('Main Group')}</TsnSelectRemote>
    {!loading && filter.itemMainGroup &&
      <TsnSelectRemote
        className='mt-1 mb-1'
        title={t('Sub Group')}
        defaultValue={filter.itemGroup}
        onValueChange={e => setFilter({ ...filter, itemGroup: e })}
        apiPath={`/db/itemGroups?itemMainGroup=${filter.itemMainGroup}`}
        all
      >{t('Group')}</TsnSelectRemote>
    }
    {loading && <Skeleton className='w-full h-10 mt-4' />}
  </div>)
}