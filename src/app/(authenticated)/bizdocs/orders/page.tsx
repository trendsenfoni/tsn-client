"use client"

import { useLanguage } from '@/i18n'
import { ListGrid } from '@/components/ui216/list-grid'
import { TableCell, TableHead } from '@/components/ui/table'
import { Order } from '@/types/Order'

import { TsnSelect } from '@/components/ui216/tsn-select'
import { moneyFormat } from '@/lib/utils'
export default function ListPage() {
  const { t } = useLanguage()
  return (
    <ListGrid
      apiPath='/db/orders'
      options={{ type: 'Update' }}
      title={t('Orders')}
      onHeaderPaint={() => {
        return (<>
          <TableHead>{t('Date/Number')}</TableHead>
          <TableHead>{t('Firm')}</TableHead>
          <TableHead>{t('Total')}</TableHead>
          <TableHead>{t('Closed')}</TableHead>
        </>)
      }}
      onRowPaint={(e: Order, index) => {
        return (<>
          <TableCell className=''>
            <div className='flex flex-col'>
              <span className=''>{e.issueDate}</span>
              <span className=''>{e.documentNumber}</span>

            </div>
          </TableCell>
          <TableCell className=''>
            <div className='flex flex-col'>
              <span className=''>{e.firm?.name}</span>
              <span className=''>{e.firmDocumentNumber}</span>
            </div>
          </TableCell>
          <TableCell className=''>
            <div className='flex flex-col'>
              <span className=''>{moneyFormat(e.total)} {e.currency}</span>
              <span className='flex flex-col text-[80%]'>{moneyFormat(e.taxAmount)}
                {e.withHoldingTaxAmount! > 0 &&
                  <span>WHT:{moneyFormat(e.withHoldingTaxAmount)}</span>
                }
              </span>
            </div>
          </TableCell>
          <TableCell className='hidden lg:table-cell text-center'>
            {e.closed && <>✅</>}
          </TableCell>
        </>)
      }}
      defaultFilter={{ closed: false }}
      onFilterPanel={(filter, setFilter) => {

        return (<div className='flex flex-col lg:flex-row  gap-4 lg:items-center '>
          <TsnSelect title={t('Status')}
            className='mb-1 mt-1 lg:max-w-36'
            list={[{ _id: ' ', text: '*' }, { _id: 'false', text: t('Open') }, { _id: 'true', text: t('Closed') }]}
            defaultValue={filter.closed || 'false'}
            onValueChange={e => setFilter({ ...filter, passive: e })}
          />
          <TsnSelect title={t('Type')}
            className='mb-1 mt-1 lg:max-w-48'
            defaultValue={filter.type}
            list={[{ _id: '0', text: t('Sales Order') }, { _id: '1', text: t('Purchase Order') }]}
            onValueChange={e => setFilter({ ...filter, type: e })}
            all
          />
        </div>)
      }}

    />
  )
}
