"use client"

import { useLanguage } from '@/i18n'
import { ListGrid } from '@/components/ui216/list-grid'
import { TableCell, TableHead } from '@/components/ui/table'
import { SelectRemote } from '@/components/ui216/select-remote'
import { useEffect, useState } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
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
          <TableHead>{t('Description')}</TableHead>
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
          <TableCell className=''>{e.description}</TableCell>
        </>)
      }}
      onFilterPanel={(filter, setFilter) => <ItemGroupMainGroup filter={filter} setFilter={setFilter} />}

    />
  )
}

interface ItemGroupMainGroupProps {
  filter?: any
  setFilter?: (e: any) => void
  className?: string
}
export function ItemGroupMainGroup({
  filter, setFilter, className = 'grid grid-cols-1 md:grid-cols-4 gap-4'
}: ItemGroupMainGroupProps) {
  const [loading, setLoading] = useState(false)
  const { t } = useLanguage()

  useEffect(() => { }, [])
  useEffect(() => { }, [])
  useEffect(() => {
    if (filter && setFilter) {
      if (filter.itemGroup?.itemMainGroup) {
        setLoading(true)
        filter.itemMainGroup = filter.itemGroup?.itemMainGroup
        // setFilter(filter)
        setFilter({ ...filter, itemMainGroup: filter.itemGroup?.itemMainGroup })
        if (filter.itemGroup) {
          setFilter({ ...filter, itemGroup: filter.itemGroup })
          // filter.itemGroup = filter.itemGroup?._id
          // setFilter(filter)
          console.log(`filter:`, filter)
          setTimeout(() => setLoading(false), 1000)
        }
      }
    }

  }, [filter._id])
  return (<div className={className}>
    <SelectRemote
      formData={filter} field='itemMainGroup' setData={e => {
        setLoading(true)
        setFilter && setFilter({ ...filter, itemMainGroup: e.itemMainGroup.trim(), itemGroup: '' })
        setTimeout(() => setLoading(false), 100)
      }}
      apiPath='/db/itemMainGroups'
      all
    >{t('Main Group')}</SelectRemote>
    {filter.itemMainGroup && !loading &&
      <SelectRemote
        formData={filter.itemGroup} field='itemGroup' setData={setFilter}
        apiPath={`/db/itemGroups?itemMainGroup=${filter.itemMainGroup._id}`}
        all
      >{t('Group')}</SelectRemote>
    }
    {loading && <Skeleton className='w-full h-10 mt-4' />}
  </div>)
}