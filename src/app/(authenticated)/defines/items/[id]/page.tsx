"use client"

import { TsnInput } from '@/components/ui216/tsn-input'
import { DataForm } from '@/components/ui216/data-form'
import { useLanguage } from '@/i18n'
import { ItemGroupMainGroup } from '../page'
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { Item, ItemMainGroup } from '@/types/Item'
import { getItem, postItem, putItem } from '@/lib/fetch'
import { StandartForm } from '@/components/ui216/standart-form'
import { TsnTextarea } from '@/components/ui216/tsn-textarea'
import { TsnSelectRemote } from '@/components/ui216/tsn-select-remote'
import { TsnSelect } from '@/components/ui216/tsn-select'
import { withholdingTaxRateList } from '@/lib/utils'
import { TsnSwitch } from '@/components/ui216/tsn-switch'
interface Props {
  params: { id: string }
}
export default function EditPage({ params }: Props) {
  const [token, setToken] = useState('')
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [groupLoading, setGroupLoading] = useState(false)
  const router = useRouter()
  const { t } = useLanguage()
  const [item, setItem] = useState<Item>()
  const [itemMainGroup, setItemMainGroup] = useState<string>()

  const load = () => {
    setLoading(true)
    getItem(`/db/items/${params.id}`, token)
      .then(result => {

        setItem(result as Item)
        setGroupLoading(true)
        setItemMainGroup((result as Item).itemGroup?.itemMainGroup?._id)
        setTimeout(() => setGroupLoading(false), 100)
      })
      .catch(err => toast({ title: t('Error'), description: t(err || ''), variant: 'destructive' }))
      .finally(() => setLoading(false))
  }
  const save = () => {
    setLoading(true)
    if (params.id == 'addnew') {
      postItem(`/db/items`, token, item)
        .then(result => router.back())
        .catch(err => toast({ title: t('Error'), description: t(err || ''), variant: 'destructive' }))
        .finally(() => setLoading(false))
    } else {
      putItem(`/db/items/${params.id}`, token, item)
        .then(result => router.back())
        .catch(err => toast({ title: t('Error'), description: t(err || ''), variant: 'destructive' }))
        .finally(() => setLoading(false))
    }

  }
  useEffect(() => { !token && setToken(Cookies.get('token') || '') }, [])
  useEffect(() => { token && params.id != 'addnew' && load() }, [token])


  return (<StandartForm
    title={t('Items')}
    onSaveClick={save}
    onCancelClick={() => router.back()}
  >
    {!loading && <>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <TsnSelectRemote
          apiPath='/db/itemMainGroups'
          title={t('Main Group')}
          defaultValue={itemMainGroup}
          onValueChange={e => {
            setGroupLoading(true)
            setItemMainGroup(e)
            setTimeout(() => setGroupLoading(false), 100)
          }}
        />
        {!groupLoading && itemMainGroup && <TsnSelectRemote
          apiPath={`/db/itemGroups?itemMainGroup=${itemMainGroup}`}
          title={t('Sub Group')}
          defaultValue={item && item.itemGroup?._id}
          onValueChange={e => setItem({ ...item, itemGroup: { _id: e } })}
        />}
      </div>

      <TsnInput title={t('Name')} defaultValue={item?.name} onBlur={e => setItem({ ...item, name: e.target.value })} />
      <TsnTextarea title={t('Description')} defaultValue={item?.description} onChange={e => setItem({ ...item, description: e.target.value })} />

      <div className='grid grid-cols-1 md:grid-cols-2 md:gap-4'>
        {/* TODO: buraya tax secimi gelecek */}
        {/* <TsnInput type='number' title={t('Vat Rate') + ' %'} defaultValue={item?.vatRate} min={0} max={100} onBlur={e => {
          let val = Number(e.target.value)
          setItem({ ...item, vatRate: isNaN(val) ? 0 : val })
        }} />
        <TsnSelect title={t('Withholding Vat Rate') + ' %'}
          list={withholdingTaxRateList}
          defaultValue={item?.withHoldingTaxRate?.toString()}
          onValueChange={e => {
            let val = Number(e)
            setItem({ ...item, withHoldingTaxRate: isNaN(val) ? 0 : val })
          }} /> */}
      </div>
      <TsnSwitch title={t('Passive?')} defaultChecked={item?.passive} onCheckedChange={e => setItem({ ...item, passive: e })} />
    </>}
  </StandartForm>)
}

