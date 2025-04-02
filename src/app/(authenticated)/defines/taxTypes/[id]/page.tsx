"use client"

import { TsnInput } from '@/components/ui216/tsn-input'
import { useLanguage } from '@/i18n'
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { TaxType } from '@/types/Item'
import { getItem, postItem, putItem } from '@/lib/fetch'
import { StandartForm } from '@/components/ui216/standart-form'
import { Label } from '@/components/ui/label'
import { TaxSubTotalPopup } from './taxSubTotal-popup'
import { Button } from '@/components/ui/button'
import { PlusCircleIcon, PlusSquareIcon, Trash2Icon } from 'lucide-react'
import { ButtonConfirm } from '@/components/button-confirm'
interface Props {
  params: { id: string }
}
export default function EditPage({ params }: Props) {
  const [token, setToken] = useState('')
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { t } = useLanguage()
  const [taxType, setTaxType] = useState<TaxType>({
    taxTotal: {
      taxSubtotal: []
    },
    withholdingTaxTotal: [{
      taxSubtotal: []
    }]
  })

  const load = () => {
    setLoading(true)
    getItem(`/db/taxTypes/${params.id}`, token)
      .then(result => setTaxType(result as TaxType))
      .catch(err => toast({ title: t('Error'), description: t(err || ''), variant: 'destructive' }))
      .finally(() => setLoading(false))
  }
  const save = () => {
    setLoading(true)
    if (params.id == 'addnew') {
      postItem(`/db/taxTypes`, token, taxType)
        .then(result => router.back())
        .catch(err => toast({ title: t('Error'), description: t(err || ''), variant: 'destructive' }))
        .finally(() => setLoading(false))
    } else {
      putItem(`/db/taxTypes/${params.id}`, token, taxType)
        .then(result => router.back())
        .catch(err => toast({ title: t('Error'), description: t(err || ''), variant: 'destructive' }))
        .finally(() => setLoading(false))
    }

  }
  useEffect(() => { !token && setToken(Cookies.get('token') || '') }, [])
  useEffect(() => { token && params.id != 'addnew' && load() }, [token])


  return (<StandartForm
    title={t('Tax Type')}
    onSaveClick={save}
    onCancelClick={() => router.back()}
  >
    {!loading && <>
      <TsnInput title={t('Name')} defaultValue={taxType?.name} onBlur={e => setTaxType({ ...taxType, name: e.target.value })} />
      {/* <TsnInput title={t('Article')} defaultValue={taxType?.article} onBlur={e => setTaxType({ ...taxType, article: e.target.value })} /> */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div className='flex flex-col'>
          <div className='flex justify-between items-center py-2 border border-dashed rounded-lg p-2 '>
            <Label className='font-bold'>{t('Tax')}</Label>
            <TaxSubTotalPopup
              onChange={e => {
                console.log(`e:`, e)
                let l = taxType?.taxTotal?.taxSubtotal || []
                l.push(e)
                setTaxType({
                  ...taxType,
                  taxTotal: {
                    ...taxType?.taxTotal,
                    taxSubtotal: l
                  }
                })
              }}
              title={t('Add New')}
              trigger={<div className='cursor-pointer px-2' >
                <PlusSquareIcon size={'24px'} />
              </div>}
            >
            </TaxSubTotalPopup>
          </div>
          <div className='border border-dashed rounded-lg p-0 text-sm'>
            <div key={'taxTotal-a'} className={`grid grid-cols-6 gap-2 px-2 py-2 bg-orange-600 bg-opacity-20`}>
              <div>{t('Sequence')}</div>
              <div>{t('Percent')}</div>
              <div className='col-span-3'>{t('Tax Code')}</div>
              <div>#</div>
            </div>
            {taxType && taxType.taxTotal && taxType.taxTotal?.taxSubtotal?.map((e, index) =>
              <div key={'taxTotal-' + index} className={`grid grid-cols-6 gap-2 px-2 py-2 ${index % 2 == 0 ? 'bg-slate-300 bg-opacity-25' : ''} `}>
                <div>#{e.calculationSequenceNumeric}</div>
                <div>%{e.percent}</div>
                <div className='col-span-3 flex flex-col'>
                  <span>{e.taxCategory?.taxScheme?.taxTypeCode}</span>
                  <span className='text-[90%] text-muted-foreground'>{e.taxCategory?.taxScheme?.name}</span>
                </div>
                <div
                  className='flex justify-end cursor-pointer'

                >
                  <ButtonConfirm
                    text={t('Do you want to remove tax detail?')}
                  >

                    <Trash2Icon color='red' size={'20px'} />
                  </ButtonConfirm>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className='flex flex-col'>
          <div className='flex justify-between items-center py-2 border border-dashed rounded-lg p-2 '>
            <Label className='font-bold'>{t('Withholding Tax')}</Label>
            <TaxSubTotalPopup
              onChange={e => {
                console.log(`e:`, e)
                let l = taxType?.taxTotal?.taxSubtotal || []
                l.push(e)
                setTaxType({
                  ...taxType,
                  taxTotal: {
                    ...taxType?.taxTotal,
                    taxSubtotal: l
                  }
                })
              }}
              title={t('Add New')}
              trigger={<div className='cursor-pointer px-2' >
                <PlusSquareIcon size={'24px'} />
              </div>}
            >
            </TaxSubTotalPopup>
          </div>
          <div className='border border-dashed rounded-lg p-0 text-sm'>
            {taxType && taxType.taxTotal && taxType.taxTotal?.taxSubtotal?.map((e, index) =>
              <div key={'taxTotal-' + index} className={`grid grid-cols-6 gap-2 px-2 py-2 ${index % 2 == 0 ? 'bg-slate-300 bg-opacity-25' : ''} `}>
                <div>#{e.calculationSequenceNumeric}</div>
                <div>%{e.percent}</div>
                <div className='col-span-3 flex flex-col'>
                  <span>{e.taxCategory?.taxScheme?.taxTypeCode}</span>
                  <span className='text-[90%] text-muted-foreground'>{e.taxCategory?.taxScheme?.name}</span>
                </div>
                <div
                  className='flex justify-end cursor-pointer'

                >
                  <ButtonConfirm
                    text={t('Do you want to remove tax detail?')}
                  >

                    <Trash2Icon color='red' size={'20px'} />
                  </ButtonConfirm>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* <pre>
        {JSON.stringify(taxType, null, 2)}
      </pre> */}
    </>}
  </StandartForm>)
}


