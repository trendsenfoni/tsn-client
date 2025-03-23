"use client"

import { TsnInput } from '@/components/ui216/tsn-input'
import { useLanguage } from '@/i18n'
import { useRouter } from 'next/navigation'
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
import { AddressField } from '@/types/AddressField'
import countryList from '@/lib/countryList.json'
interface Props {
  params: { id: string }
}
export default function EditPage({ params }: Props) {
  const [token, setToken] = useState('')
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { t } = useLanguage()
  const [firm, setFirm] = useState<Firm>()

  const load = () => {
    setLoading(true)
    getItem(`/db/firms/${params.id}`, token)
      .then(result => setFirm(result as Firm))
      .catch(err => toast({ title: t('Error'), description: t(err || ''), variant: 'destructive' }))
      .finally(() => setLoading(false))
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
  useEffect(() => { token && params.id != 'addnew' && load() }, [token])


  return (<StandartForm
    title={t('Firms')}
    onSaveClick={save}
    onCancelClick={() => router.back()}
  >
    {!loading && <>
      <TsnSelect title={t('Type')}
        defaultValue={firm?.type}
        list={firmTypeList.map(e => ({ _id: e._id, text: t(e.text) }))}
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
          <TsnSwitch title={'Individual Firm'} defaultChecked={firm?.billingInfo?.individual} onCheckedChange={e => setFirm({ ...firm, billingInfo: { ...firm?.billingInfo, individual: e } })} />
          <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-2'>
            <TsnInput title={'Company Name'} defaultValue={firm?.billingInfo?.companyName} onBlur={e => setFirm({ ...firm, billingInfo: { ...firm?.billingInfo, companyName: e.target.value } })} />
            <TsnInput title={'Tax Office'} defaultValue={firm?.billingInfo?.taxOffice} onBlur={e => setFirm({ ...firm, billingInfo: { ...firm?.billingInfo, taxOffice: e.target.value } })} />
            <TsnInput title={'Tax Number'} defaultValue={firm?.billingInfo?.taxNumber} onBlur={e => setFirm({ ...firm, billingInfo: { ...firm?.billingInfo, taxNumber: e.target.value } })} />
            {firm?.billingInfo?.individual && <>
              <TsnInput title={'First Name'} defaultValue={firm?.billingInfo?.firstName} onBlur={e => setFirm({ ...firm, billingInfo: { ...firm?.billingInfo, firstName: e.target.value } })} />
              <TsnInput title={'Last Name'} defaultValue={firm?.billingInfo?.lastName} onBlur={e => setFirm({ ...firm, billingInfo: { ...firm?.billingInfo, lastName: e.target.value } })} />
              <TsnInput title={'ID Card Number'} defaultValue={firm?.billingInfo?.idCardNo} onBlur={e => setFirm({ ...firm, billingInfo: { ...firm?.billingInfo, idCardNo: e.target.value } })} />
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

export interface TsnInputAddress {
  defaultValue?: AddressField
  onChange?: (e: AddressField) => void
}
export function TsnInputAddress({ defaultValue, onChange }: TsnInputAddress) {
  const [address, setAddress] = useState<AddressField>(defaultValue || {})
  const { t } = useLanguage()
  const clist = Object.keys(countryList as any).map(key => { return ({ _id: key, text: (countryList as any)[key] } as TsnListType) })

  useEffect(() => {
    JSON.stringify(address) != JSON.stringify(defaultValue) && onChange && onChange(address)
  }, [address])
  return (<>
    <div className='grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-2'>
      <TsnSelect title={t('Country')}
        // className='ms-2 my-2 '
        list={clist}
        defaultValue={address?.country?.identificationCode || 'tr'}
        onValueChange={e => {
          let countryName = (countryList as any)[e || 'tr'] || 'Türkiye'
          setAddress({ ...address, country: { identificationCode: e, name: countryName } })
        }}
      />
      <TsnInput title={t('Region/State')} defaultValue={address?.region} onBlur={e => setAddress({ ...address, region: e.target.value })} />
    </div>
    <div className='grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-2'>
      <TsnInput title={t('City')} defaultValue={address?.cityName} onBlur={e => setAddress({ ...address, cityName: e.target.value })} />
      {/* <TsnInput title={t('City Subdivision')} defaultValue={address?.citySubdivisionName} onBlur={e => setAddress({ ...address, citySubdivisionName: e.target.value })} /> */}
      <TsnInput title={t('District')} defaultValue={address?.district} onBlur={e => setAddress({ ...address, district: e.target.value })} />
      <TsnInput title={t('Street')} defaultValue={address?.streetName} onBlur={e => setAddress({ ...address, streetName: e.target.value })} />
      <TsnInput title={t('Building Number')} defaultValue={address?.buildingNumber} onBlur={e => setAddress({ ...address, buildingNumber: e.target.value })} />
      <TsnInput title={t('Building/Residence')} defaultValue={address?.buildingName} onBlur={e => setAddress({ ...address, buildingName: e.target.value })} />
      <TsnInput title={t('Block')} defaultValue={address?.blockName} onBlur={e => setAddress({ ...address, blockName: e.target.value })} />
      <TsnInput title={t('Room')} defaultValue={address?.room} onBlur={e => setAddress({ ...address, room: e.target.value })} />

    </div>
  </>)
}