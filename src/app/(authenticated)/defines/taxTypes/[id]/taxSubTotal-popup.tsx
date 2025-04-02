"use client"

import { useEffect, useState } from 'react'
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
import { TaxSubtotal } from '@/types/Invoice'
import Cookies from 'js-cookie'
import { getList } from '@/lib/fetch'
import { TsnSelect } from '@/components/ui216/tsn-select'

interface Props {
  trigger?: any
  defaultValue?: TaxSubtotal
  onChange?: (e: TaxSubtotal) => void
  title?: any
  description?: any
}
export function TaxSubTotalPopup({
  trigger, defaultValue, onChange, title, description
}: Props) {
  const [taxSubTotal, setTaxSubTotal] = useState<TaxSubtotal>(defaultValue || {

  })
  const [token, setToken] = useState('')
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const { t } = useLanguage()
  const [taxTypeCodeList, setTaxTypeCodeList] = useState([])

  const load = () => {
    setLoading(true)
    getList(`/db/constants/taxTypeCodes`, token)
      .then(result => {
        const l = (result || []).map((e: any) => ({ _id: e._id, name: (e._id + ' - ' + e.name) }))
        setTaxTypeCodeList(l)
      })
      .catch(err => toast({ title: 'Error', description: err || '', variant: 'destructive' }))
      .finally(() => setLoading(false))
  }

  useEffect(() => { !token && setToken(Cookies.get('token') || '') }, [])
  useEffect(() => { token && load() }, [token])

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



          <TsnInput title={t('Calculation Sequence')} type='number' min={0} max={100} defaultValue={taxSubTotal.calculationSequenceNumeric} onBlur={e => setTaxSubTotal({ ...taxSubTotal, calculationSequenceNumeric: Number(e.target.value) })} />
          <TsnInput title={t('Percent')} type='number' min={0} max={100} defaultValue={taxSubTotal.percent} onBlur={e => setTaxSubTotal({ ...taxSubTotal, percent: Number(e.target.value) })} />
          <TsnSelect
            // apiPath='/db/constants/taxTypeCodes'
            list={taxTypeCodeList}
            title={t('Tax Type Codes')}
            defaultValue={taxSubTotal.taxCategory?.taxScheme?.taxTypeCode || ''}
            onValueChange={(e, text) => {
              setTaxSubTotal({
                ...taxSubTotal,
                taxCategory: {
                  ...taxSubTotal.taxCategory,
                  taxScheme: { ...taxSubTotal.taxCategory?.taxScheme, name: text?.split(' - ')[1], taxTypeCode: e }
                }
              })
            }}
          />
          {/* <div>name: {taxSubTotal.taxCategory?.taxScheme?.name}</div>
          <div>taxTypeCode: {taxSubTotal.taxCategory?.taxScheme?.taxTypeCode}</div> */}
        </div>

        <AlertDialogFooter className='flex justify-end items-center gap-4'>
          <div className='flex justify-start'>

          </div>
          <div className='flex flex-row justify-end items-center'>
            <AlertDialogAction onClick={e => {
              // if (!orderLine.item) {
              //   e.preventDefault()
              //   toast({ title: t('Item required'), variant: 'destructive' })
              //   return
              // }
              onChange && onChange(taxSubTotal)
            }}><CheckIcon /></AlertDialogAction>
            <AlertDialogCancel className='mt-0'><XIcon /></AlertDialogCancel>
          </div>

        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </>)
}