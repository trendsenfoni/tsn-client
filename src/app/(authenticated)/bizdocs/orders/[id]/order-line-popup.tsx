"use client"

import { useEffect, useRef, useState } from 'react'
import { getItem } from '@/lib/fetch'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import { OrderLine } from '@/types/Order'
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

interface Props {
  trigger?: any
  defaultValue?: OrderLine
  onChange?: (e: OrderLine) => void
  title?: any
  description?: any
}
export function OrderLinePopup({
  trigger, defaultValue, onChange, title, description
}: Props) {
  const [orderLine, setOrderLine] = useState<OrderLine>(defaultValue || {})
  const [quantity, setQuantity] = useState(defaultValue?.quantity || 0)
  const [price, setPrice] = useState(defaultValue?.price || 0)
  const [total, setTotal] = useState(defaultValue?.total || 0)
  const [calc, setCalc] = useState(false)
  const [token, setToken] = useState('')
  const { toast } = useToast()
  const { t } = useLanguage()

  // useEffect(() => {
  //   if (calc) return
  //   setCalc(true)
  //   setTotal(price * quantity)
  //   const txtTotal = document.getElementById('txtTotal') as HTMLInputElement
  //   if (txtTotal) txtTotal.value = (Math.round(100 * price * quantity) / 100).toString()
  //   setCalc(false)

  // }, [quantity, price])

  // useEffect(() => {
  //   if (calc) return
  //   setCalc(true)
  //   setTimeout(() => {
  //     quantity > 0 && setPrice(Math.round(10000 * total / quantity) / 10000)
  //     quantity <= 0 && setPrice(0)
  //     setCalc(false)
  //   }, 500)
  // }, [total])
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
        <div>
          <TsnSelectRemote
            apiPath='/db/items'
            title={t('Item')}
            defaultValue={orderLine.item?._id}
            onValueChange={e => setOrderLine({ ...orderLine, item: { ...orderLine.item, _id: e } })}
          />

          <TsnInput id='txtQuantity' type={'number'} title={t('Quantity')} defaultValue={quantity}
            onFocus={e => setQuantity(isNaN(Number(e.target.value)) ? 0 : Number(e.target.value))}
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
            onFocus={e => setPrice(isNaN(Number(e.target.value)) ? 0 : Number(e.target.value))}
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
            onFocus={e => setTotal(isNaN(Number(e.target.value)) ? 0 : Number(e.target.value))}
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
          <TsnInput title={t('Description')} defaultValue={orderLine.description} onBlur={e => setOrderLine({ ...orderLine, description: e.target.value })} />
        </div>
        <div className='flex gap-4'>
          <div>Quantity: {quantity}</div>
          <div>Price: {price}</div>
          <div>Total: {total}</div>
        </div>
        <AlertDialogFooter className='flex flex-row justify-end items-center gap-4'>

          <AlertDialogAction onClick={e => {
            if (!orderLine.item) {
              e.preventDefault()
              toast({ title: t('Item required'), variant: 'destructive' })
              return
            }
            // if ((orderLine.quantity || 0) <= 0) {
            //   e.preventDefault()
            //   toast({ title: t('Quantity must be greater then zero'), variant: 'destructive' })
            //   return
            // }
            // setOrderLine({ ...orderLine, quantity: quantity, price: price, total: total })
            onChange && onChange({ ...orderLine, quantity: quantity, price: price, total: total })
          }}><CheckIcon /></AlertDialogAction>4545
          <AlertDialogCancel className='mt-0'><XIcon /></AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </>)
}