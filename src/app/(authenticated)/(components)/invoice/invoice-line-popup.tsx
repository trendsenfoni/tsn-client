"use client"

import { useEffect, useState } from 'react'
import { getItem } from '@/lib/fetch'
import Cookies from 'js-cookie'
import { InvoiceLine } from '@/types/Invoice'
import { useToast } from '@/components/ui/use-toast'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { ButtonCancel, ButtonOK } from '@/components/icon-buttons'
import { CheckIcon, XIcon } from 'lucide-react'
import { TsnSelectRemote } from '@/components/ui216/tsn-select-remote'
import { useLanguage } from '@/i18n'
import { TsnInput } from '@/components/ui216/tsn-input'
import { TsnSwitch } from '@/components/ui216/tsn-switch'
import { Item } from '@/types/Item'
import { moneyFormat } from '@/lib/utils'

interface Props {
  trigger?: any
  defaultValue?: InvoiceLine
  onChange?: (e: InvoiceLine) => void
  title?: any
  description?: any
}
export function InvoiceLinePopup({
  trigger, defaultValue, onChange, title, description
}: Props) {
  const [invoiceLine, setInvoiceLine] = useState<InvoiceLine>(defaultValue || {

  })
  const [quantity, setQuantity] = useState(defaultValue?.invoicedQuantity || 0)
  const [price, setPrice] = useState(defaultValue?.price || 0)
  const [total, setTotal] = useState(defaultValue?.lineExtensionAmount || 0)
  const { toast } = useToast()
  const { t } = useLanguage()
  const [token, setToken] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => { !token && setToken(Cookies.get('token') || '') }, [])
  return (<>
    <AlertDialog>
      <AlertDialogTrigger asChild className='cursor-pointer'>
        {trigger}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <div className='grid grid-cols-2'>
          <div>
            <TsnSelectRemote
              apiPath='/db/items'
              title={t('Item')}
              defaultValue={invoiceLine.item?._id}
              onValueChange={e => {
                getItem(`/db/items/${e}`, token)
                  .then((result: Item) => {
                    setInvoiceLine({
                      ...invoiceLine,
                      item: { ...invoiceLine.item, _id: e },
                      taxTotal: result.taxType?.taxTotal,
                      withholdingTaxTotal: result.taxType?.withholdingTaxTotal,
                    })
                  })
                  .catch(err => toast({ title: t('Error'), description: t(err || ''), variant: 'destructive' }))
                // .finally(() => setLoading(false))
                // console.log(`e:`, e)

              }}
            />

            <TsnInput id='txtQuantity' type={'number'} title={t('Quantity')} defaultValue={quantity}

              onFocus={e => {
                setQuantity(isNaN(Number(e.target.value)) ? 0 : Number(e.target.value))
                e.target.select()
              }}
              onBlur={e => {
                if (e.target.value != quantity.toString()) {
                  const q = isNaN(Number(e.target.value)) ? 0 : Number(e.target.value)
                  setQuantity(q)
                  const t = Math.round(100 * price * q) / 100
                  const txtTotal = document.getElementById('txtTotal') as HTMLInputElement
                  setTotal(t)
                  txtTotal.value = t.toString()
                }
              }}
            />
            <TsnInput id='txtPrice' type={'number'} title={t('Price')} defaultValue={price}
              onFocus={e => {
                setPrice(isNaN(Number(e.target.value)) ? 0 : Number(e.target.value))
                e.target.select()
              }}
              onBlur={e => {
                if (e.target.value != price.toString()) {
                  const p = isNaN(Number(e.target.value)) ? 0 : Number(e.target.value)
                  setPrice(p)
                  const t = Math.round(100 * p * quantity) / 100
                  const txtTotal = document.getElementById('txtTotal') as HTMLInputElement
                  setTotal(t)
                  txtTotal.value = t.toString()
                }
              }}
            />

            <TsnInput id='txtTotal' type={'number'} title={t('Total')} defaultValue={total}
              onFocus={e => {
                setTotal(isNaN(Number(e.target.value)) ? 0 : Number(e.target.value))
                e.target.select()
              }}
              onBlur={async e => {
                if (e.target.value != total.toString()) {
                  const t = isNaN(Number(e.target.value)) ? 0 : Number(e.target.value)
                  setTotal(t)
                  const p = quantity > 0 ? Math.round(10000 * t / quantity) / 10000 : 0
                  const txtPrice = document.getElementById('txtPrice') as HTMLInputElement
                  setPrice(p)
                  txtPrice.value = p.toString()
                }
              }}
            />
            <TsnInput title={t('Description')} defaultValue={invoiceLine.note?.join('\n')} onBlur={e => setInvoiceLine({ ...invoiceLine, note: e.target.value.split('\n') })} />
          </div>
          <div>
            {invoiceLine.taxTotal?.taxSubtotal && invoiceLine.taxTotal.taxSubtotal.map((e, index) => <>
              {e.taxCategory?.taxScheme?.taxTypeCode == '0015' &&
                <div>KDV %{e.percent} : {moneyFormat(e.taxAmount)}</div>
              }
            </>)}
            {/* <pre>{JSON.stringify(invoiceLine.withholdingTaxTotal, null, 2)}</pre> */}
          </div>
        </div>
        <AlertDialogFooter className='flex justify-end items-center gap-4'>
          <div className='flex justify-start'>

          </div>
          <div className='flex flex-row justify-end items-center'>
            <AlertDialogAction onClick={e => {
              if (!invoiceLine.item) {
                e.preventDefault()
                toast({ title: t('Item required'), variant: 'destructive' })
                return
              }
              onChange && onChange({ ...invoiceLine, invoicedQuantity: quantity, price: price, lineExtensionAmount: total })
            }}><CheckIcon /></AlertDialogAction>
            <AlertDialogCancel className='mt-0'><XIcon /></AlertDialogCancel>
          </div>

        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </>)
}