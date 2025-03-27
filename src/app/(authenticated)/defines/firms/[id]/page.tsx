"use client"

import { TsnInput } from '@/components/ui216/tsn-input'
import { useLanguage } from '@/i18n'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { Firm } from '@/types/Firm'
import { getItem, postItem, putItem } from '@/lib/fetch'
import { StandartForm } from '@/components/ui216/standart-form'
import { TsnListType, TsnSelect } from '@/components/ui216/tsn-select'
import { firmTypeList } from '@/lib/utils'
import { TsnSwitch } from '@/components/ui216/tsn-switch'
import { TsnPanel } from '@/components/ui216/tsn-panel'
import { TsnInputAddress } from '@/components/ui216/tsn-input-address'

interface Props {
  params: { id: string }
}
export default function EditPage({ params }: Props) {
  const [token, setToken] = useState('')
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { t } = useLanguage()
  const searchParams = useSearchParams()
  // const [firmType,setFirmType] = useState(params.id=='addnew'?searchParams.get('type') || 'cv':'cv')
  const [firm, setFirm] = useState<Firm>({
    type: searchParams.get('type') || 'cv'
  })
  // const [firmCVList, setFirmCVList] = useState<TsnListType[]>([])
  // const title = firm.type == 'c' ? t('Curstomer') : (firm.type == 'v' ? t('Vendor') : (firm.type == 'cv' ? t('Customer & Vendor') : 'Customer Candidate'))
  const [title, setTitle] = useState('')


  const load = () => {
    setLoading(true)
    return new Promise<Firm>((resolve, reject) => {
      getItem(`/db/firms/${params.id}`, token)
        .then(result => {
          setFirm(result as Firm)
          resolve(result as Firm)
        })
        .catch(err => {
          toast({ title: t('Error'), description: t(err || ''), variant: 'destructive' })
          reject(err)
        })
        .finally(() => setLoading(false))
    })

  }
  const save = () => {
    setLoading(true)
    if (params.id == 'addnew') {
      postItem(`/db/firms`, token, firm)
        .then(result => router.back())
        .catch(err => toast({ title: t('Error'), description: t(err || ''), variant: 'destructive' }))
        .finally(() => setLoading(false))
    } else {
      putItem(`/db/firms/${params.id}`, token, firm)
        .then(result => router.back())
        .catch(err => toast({ title: t('Error'), description: t(err || ''), variant: 'destructive' }))
        .finally(() => setLoading(false))
    }

  }
  useEffect(() => { !token && setToken(Cookies.get('token') || '') }, [])
  useEffect(() => {
    if (token) {
      if (params.id == 'addnew') {
        const firmType = searchParams.get('type') || 'cv'
        setFirm({ type: firmType })

      } else {
        load()
          .then(result => {
            switch (result.type) {
              case 'c': setTitle(t('Curstomer'))
                break
              case 'v': setTitle(t('Vendor'))
                break
              case 'cv': setTitle(t('Customer & Vendor'))
                break
              case 'cv': setTitle(t('Customer Candidates'))
                break
            }

          })
          .catch()

      }
    }


  }, [token])


  return (<StandartForm
    title={title}
    onSaveClick={save}
    onCancelClick={() => router.back()}
  >
    {!loading && <>
      <TsnSelect title={t('Type')}
        defaultValue={firm.type}
        list={firmTypeList(searchParams.get('type') || firm?.type || '', t)}
        onValueChange={e => setFirm({ ...firm, type: e })}
      />

      <TsnInput title={t('Name')} defaultValue={firm?.name} onBlur={e => setFirm({ ...firm, name: e.target.value })} />
      <TsnInput title={t('Article')} defaultValue={firm?.article} onBlur={e => setFirm({ ...firm, article: e.target.value })} />

      <TsnSwitch title={t('Passive?')} defaultChecked={firm?.passive} onCheckedChange={e => setFirm({ ...firm, passive: e })} />
      <div className='grid grid-cols-1 gap-4'>
        <TsnPanel
          name='firm_billing_info'
          trigger={t('Billing Info')}
        >
          <TsnSwitch title={t('Individual Firm')} defaultChecked={firm?.billingInfo?.individual} onCheckedChange={e => setFirm({ ...firm, billingInfo: { ...firm?.billingInfo, individual: e } })} />
          <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-2'>
            <TsnInput title={t('Company Name')} defaultValue={firm?.billingInfo?.companyName} onBlur={e => setFirm({ ...firm, billingInfo: { ...firm?.billingInfo, companyName: e.target.value } })} />
            <TsnInput title={t('Tax Office')} defaultValue={firm?.billingInfo?.taxOffice} onBlur={e => setFirm({ ...firm, billingInfo: { ...firm?.billingInfo, taxOffice: e.target.value } })} />
            <TsnInput title={t('Tax Number')} defaultValue={firm?.billingInfo?.taxNumber} onBlur={e => setFirm({ ...firm, billingInfo: { ...firm?.billingInfo, taxNumber: e.target.value } })} />
            {firm?.billingInfo?.individual && <>
              <TsnInput title={t('First Name')} defaultValue={firm?.billingInfo?.firstName} onBlur={e => setFirm({ ...firm, billingInfo: { ...firm?.billingInfo, firstName: e.target.value } })} />
              <TsnInput title={t('Last Name')} defaultValue={firm?.billingInfo?.lastName} onBlur={e => setFirm({ ...firm, billingInfo: { ...firm?.billingInfo, lastName: e.target.value } })} />
              <TsnInput title={t('ID Card Number')} defaultValue={firm?.billingInfo?.idCardNo} onBlur={e => setFirm({ ...firm, billingInfo: { ...firm?.billingInfo, idCardNo: e.target.value } })} />
            </>}
          </div>
        </TsnPanel>
        <TsnPanel
          name='firm_address'
          trigger={t('Address')}
        >
          <TsnInputAddress defaultValue={firm?.address} onChange={e => setFirm({ ...firm, address: e })} />
        </TsnPanel>
      </div>
    </>}
  </StandartForm>)
}

