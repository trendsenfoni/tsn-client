"use client"

import { useLanguage } from '@/i18n'
import { ListGrid } from '@/components/ui216/list-grid'
import { TableCell, TableHead } from '@/components/ui/table'
import { Invoice } from '@/types/Invoice'

import { TsnSelect } from '@/components/ui216/tsn-select'
import { moneyFormat } from '@/lib/utils'
import { useSearchParams } from 'next/dist/client/components/navigation'

interface Props {
  ioType?: number
  title?: string
}
export function InvoiceList({ ioType, title }: Props) {
  const { t } = useLanguage()
  return (
    <ListGrid
      apiPath={`/db/invoices?ioType=${ioType}`}
      options={{ type: 'Update' }}
      title={title}
      onHeaderPaint={() => {
        return (<>
          <TableHead>{t('Date/Number')}</TableHead>
          <TableHead>{t('Firm')}</TableHead>
          <TableHead>{t('Total')}</TableHead>
          <TableHead className='text-center'>qwerty</TableHead>
        </>)
      }}
      onRowPaint={(e: Invoice, index) => {
        return (<>
          <TableCell className=''>
            <div className='flex flex-col'>
              <span className=''>{e.issueDate}</span>
              <span className=''>{e.issueTime}</span>

            </div>
          </TableCell>
          <TableCell className=''>
            <div className='flex flex-col'>
              <span className=''>{e.firm?.name}</span>
              <span className=''>{e.ID}</span>
            </div>
          </TableCell>
          <TableCell className=''>
            <div className='flex flex-col'>
              <span className=''>{moneyFormat(e.legalMonetaryTotal?.taxInclusiveAmount)} {e.currency}</span>
              <span className='flex flex-col text-[80%]'>{moneyFormat(e.taxTotal?.taxAmount)}
                {/* {e.withHoldingTaxAmount! > 0 &&
                  <span>WHT:{moneyFormat(e.withHoldingTaxAmount)}</span>
                } */}
              </span>
            </div>
          </TableCell>
          <TableCell className='text-center'>
            qwerty
          </TableCell>
        </>)
      }}
      defaultFilter={{ closed: false }}
      onFilterPanel={(filter, setFilter) => {

        return (<div className='flex flex-col lg:flex-row  gap-4 lg:items-center '>
          <TsnSelect title={t('Draft?')}
            className='mb-1 mt-1 lg:max-w-36'
            list={[{ _id: ' ', text: '*' }, { _id: 'false', text: t('Normal') }, { _id: 'true', text: t('Draft') }]}
            defaultValue={filter.draft || ' '}
            onValueChange={e => setFilter({ ...filter, draft: e })}
          />

        </div>)
      }}

    />
  )
}
