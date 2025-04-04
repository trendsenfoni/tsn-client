"use client"

import { TsnInput } from '@/components/ui216/tsn-input'
import { useLanguage } from '@/i18n'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { getInvoiceTypeCodeList, getProfileIdList, Invoice, invoiceTypeName } from '@/types/Invoice'
import { getItem, postItem, putItem } from '@/lib/fetch'
import { StandartForm } from '@/components/ui216/standart-form'
import { TsnListType, TsnSelect } from '@/components/ui216/tsn-select'
import { TsnSwitch } from '@/components/ui216/tsn-switch'
import { TsnPanel } from '@/components/ui216/tsn-panel'
import { TsnTextarea } from '@/components/ui216/tsn-textarea'
import { TsnInputAddress } from '@/components/ui216/tsn-input-address'
import { TsnSelectRemote } from '@/components/ui216/tsn-select-remote'
import { GridInvoiceLine } from './invoice-lines'
import { Label } from '@/components/ui/label'
import { moneyFormat } from '@/lib/utils'
import { NotepadTextDashedIcon } from 'lucide-react'
import { currencyList, Settings } from '@/types/Settings'
interface Props {
  id: string
  ioType: number
}
export function InvoiceForm({ id, ioType }: Props) {
  const [token, setToken] = useState('')
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { t } = useLanguage()
  const settings = JSON.parse(Cookies.get('dbSettings') || '{}') as Settings
  const [invoiceId, setInvoiceId] = useState(id != 'addnew' ? id : '')
  const [invoice, setInvoice] = useState<Invoice>({})

  const load = () => {
    setLoading(true)
    getItem(`/db/invoices/${invoiceId}`, token)
      .then(result => setInvoice(result as Invoice))
      .catch(err => toast({ title: t('Error'), description: t(err || ''), variant: 'destructive' }))
      .finally(() => setLoading(false))
  }

  const save = () => {
    // o && setInvoice(o)
    setLoading(true)
    if (!invoice?._id) {
      postItem(`/db/invoices`, token, invoice)
        .then(result => router.back())
        .catch(err => toast({ title: t('Error'), description: t(err || ''), variant: 'destructive' }))
        .finally(() => setLoading(false))
    } else {
      putItem(`/db/invoices/${invoice._id}`, token, invoice)
        .then(result => router.back())
        .catch(err => toast({ title: t('Error'), description: t(err || ''), variant: 'destructive' }))
        .finally(() => setLoading(false))
    }

  }
  useEffect(() => { !token && setToken(Cookies.get('token') || '') }, [])
  useEffect(() => {
    if (token) {
      if (invoiceId != '') {
        load()
      } else {
        setLoading(true)

        setInvoice({
          issueDate: new Date().toISOString().substring(0, 10),
          draft: true,
          ioType: ioType,
          currency: settings.currency,
          profileId: settings.invoice?.profileId,
          invoiceTypeCode: 'SATIS'
        })
        setTimeout(() => setLoading(false), 100)
      }
    }
  }, [token])


  return (<StandartForm
    title={invoiceTypeName(invoice?.ioType || 0, t)}
    onSaveClick={() => save()}
    onCancelClick={() => router.back()}
  >
    {!loading && <div className='flex flex-col gap-2'>
      {/* <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
        <TsnSelect title={t('Type')}
          defaultValue={invoice?.ioType?.toString()}
          list={InvoiceTypeList.map(e => ({ _id: e._id, text: t(e.text) }))}
          onValueChange={e => setInvoice({ ...invoice, ioType: Number(e) })}
        />
      </div> */}
      <div className='grid grid-cols-1 lg:grid-cols-4 gap-4'>
        <TsnSelect
          title={t('Profile')}
          list={getProfileIdList(t)}
          defaultValue={invoice.profileId}
          onValueChange={e => setInvoice({ ...invoice, profileId: e })}
        />
        <TsnSelect
          title={t('Type')}
          list={getInvoiceTypeCodeList(t)}
          defaultValue={invoice.invoiceTypeCode}
          onValueChange={e => setInvoice({ ...invoice, invoiceTypeCode: e })}
        />
        <TsnInput type='date' title={t('Date')} defaultValue={invoice?.issueDate}
          onBlur={e => setInvoice({ ...invoice, issueDate: e.target.value })
          } />
        <TsnInput title={t('Invoice Number')} defaultValue={invoice?.ID}
          onBlur={e => setInvoice({ ...invoice, ID: e.target.value })} />
        <TsnSelect
          title={t('Currency')}
          list={currencyList}
          defaultValue={invoice.currency}
          onValueChange={e => setInvoice({ ...invoice, currency: e })}
        />
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-4 gap-4'>

        <TsnSelectRemote
          className='col-span-2'
          apiPath={`/db/firms?type=${invoice.ioType == 0 ? 'c' : 'v'}`}
          title={invoice.ioType == 0 ? t('Customer') : t('Vendor')}
          defaultValue={invoice.firm?._id}
          onValueChange={e => setInvoice({ ...invoice, firm: { ...invoice.firm, _id: e } })}
        />
      </div>
      <TsnPanel name='invoice_address' trigger={t('Address')}>
        {/* <TsnInputAddress defaultValue={invoice?.address} onChange={e => setInvoice({ ...invoice, address: e })} /> */}
      </TsnPanel>
      <TsnPanel name='invoice_note_passive' trigger={t('Notes')}>
        <TsnTextarea title={t('Note')} defaultValue={invoice?.note?.join('\n')} onBlur={e => setInvoice({ ...invoice, note: e.target.value.split('\n') })} />
      </TsnPanel>

      <GridInvoiceLine invoiceId={invoice._id} onAddNewInvoice={() =>
        postItem(`/db/invoices`, token, invoice)
          .then((result: Invoice) => {
            setInvoice(result)
            setInvoiceId(result._id || '')
          })
          .catch(err => toast({ title: t('Error'), description: t(err || ''), variant: 'destructive' }))
          .finally(() => setLoading(false))

      } />
      <div className='flex flex-col-reverse md:flex-row md:items-end justify-between'>
        <div className='my-4 flex flex-col gap-4'>
          <TsnSwitch title={t('Draft?')} defaultChecked={invoice?.draft} onCheckedChange={e => setInvoice({ ...invoice, draft: e })} />
        </div>
        <div className='ms-2 min-w-[320px] flex flex-col gap-2 font-mono'>
          <TotalElem title={t('Sub Total')} amount={moneyFormat(invoice.legalMonetaryTotal?.taxExclusiveAmount)} />
          <TotalElem title={t('VAT')} amount={moneyFormat(invoice.taxTotal?.taxAmount)} />
          {/* <TotalElem title={t('WHT')} amount={moneyFormat(invoice.withHoldingTaxAmount)} /> */}
          <TotalElem title={t('Discount')} amount={moneyFormat(invoice.legalMonetaryTotal?.allowanceTotalAmount)} />
          <TotalElem title={t('Charge')} amount={moneyFormat(invoice.taxTotal?.taxAmount)} />
          <TotalElem
            className='font-bold text-blue-800 dark:text-blue-500'
            labelClassName='text-lg md:text-xl'
            title={t('Net Total')} amount={moneyFormat(invoice.legalMonetaryTotal?.taxInclusiveAmount)}
          />

        </div>
      </div>

    </div>}
  </StandartForm>)
}
interface TotalElemProps {
  title?: string
  amount?: string
  className?: string
  labelClassName?: string
}

function TotalElem({ title, amount, className, labelClassName }: TotalElemProps) {
  return (<div className={`grid grid-cols-2 ${className}`}>
    <Label className={`text-xs md:text-lg ${labelClassName}`} >{title}</Label>
    <Label className={`text-xs md:text-lg text-end ${labelClassName}`}>{amount}</Label>
  </div>)
}