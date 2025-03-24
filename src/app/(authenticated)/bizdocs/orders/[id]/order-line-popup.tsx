"use client"

import { useEffect, useState } from 'react'
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
  const [token, setToken] = useState('')
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const { t } = useLanguage()

  // const load = () => {
  //   setLoading(true)
  //   getItem(`/`, token)
  //     .then(result => {
  //       setObj(result as OrderLine)
  //     })
  //     .catch(err => toast({ title: 'Error', description: err || '', variant: 'destructive' }))
  //     .finally(() => setLoading(false))
  // }

  // useEffect(() => { !token && setToken(Cookies.get('token') || '') }, [])
  // useEffect(() => { token && load() }, [token])

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

          <TsnInput type={'number'} title={t('Quantity')} defaultValue={orderLine.quantity} onBlur={e => {
            let val = Number(e.target.value)
            setOrderLine({ ...orderLine, quantity: isNaN(val) ? 0 : val })
          }} />
          <TsnInput type={'number'} title={t('Price')} defaultValue={orderLine.price} onBlur={e => {
            let val = Number(e.target.value)
            setOrderLine({ ...orderLine, price: isNaN(val) ? 0 : val })
          }} />

          <TsnInput type={'number'} title={t('Total')} defaultValue={orderLine.total} onBlur={e => {
            let val = Number(e.target.value)
            setOrderLine({ ...orderLine, total: isNaN(val) ? 0 : val })
          }} />
          <TsnInput title={t('Description')} defaultValue={orderLine.description} onBlur={e => setOrderLine({ ...orderLine, description: e.target.value })} />
        </div>
        <AlertDialogFooter className='flex flex-row justify-end items-center gap-4'>
          <AlertDialogAction onClick={e => {
            if (!orderLine.item) {
              e.preventDefault()
              toast({ title: t('Item required'), variant: 'destructive' })
              return
            }
            if ((orderLine.quantity || 0) <= 0) {
              e.preventDefault()
              toast({ title: t('Quantity must be greater then zero'), variant: 'destructive' })
              return
            }
            onChange && onChange(orderLine)
          }}><CheckIcon /></AlertDialogAction>
          <AlertDialogCancel className='mt-0'><XIcon /></AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </>)
}