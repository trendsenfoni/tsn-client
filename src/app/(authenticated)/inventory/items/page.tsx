"use client"

import { useLanguage } from '@/i18n'
import { ListGrid } from '@/components/ui216/list-grid'
import { TableCell, TableHead } from '@/components/ui/table'
import { SelectRemote } from '@/components/ui216/select-remote'
import { useEffect, useState } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { TsnSelectRemote } from '@/components/ui216/tsn-select-remote'
import { ItemGroup } from '@/types/Item'
import { showWithholdingTax } from '@/lib/utils'
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
        </>)
      }}
      onRowPaint={(e, index) => {
        return (<>
          <TableCell className='lg:font-semibold flex flex-col'>
            {e.name}
            <div className='flex gap-1 font-normal'>
              <span className='text-[8pt] lg:text-sm text-wrap px-1 rounded-sm bg-amber-500 bg-opacity-50 t11ext-white'>{e.itemGroup?.itemMainGroup?.name}</span>
              <span className='text-[8pt] lg:text-sm text-wrap px-1 rounded-sm bg-stone-500 bg-opacity-50'>{e.itemGroup?.name}</span>
            </div>
          </TableCell>
          <TableCell className='text-sm flex items-center gap-2'>
            {e.vatRate > 0 && <span>%{e.vatRate}</span>}
            {e.withHoldingTaxRate > 0 &&
              <span className='text-xs rounded-sm p-1 bg-amber-400 text-gray-600'>w:{showWithholdingTax(e.withHoldingTaxRate)}</span>
            }

          </TableCell>
          <TableCell className='hidden lg:table-cell'>{e.description}</TableCell>
        </>)
      }}
      onFilterPanel={(filter, setFilter) => <ItemGroupMainGroup filter={filter} setFilter={setFilter} />}

    />
  )
}

interface ItemGroupMainGroupProps {
  filter: any
  setFilter: (e: ItemGroup) => void
  className?: string
}
export function ItemGroupMainGroup({
  filter, setFilter, className = 'grid grid-cols-1 md:grid-cols-4 gap-4'
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