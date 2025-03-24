"use client"

import { TsnInput } from '@/components/ui216/tsn-input'
import { useLanguage } from '@/i18n'
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { Order, OrderTypeList } from '@/types/Order'
import { getItem, postItem, putItem } from '@/lib/fetch'
import { StandartForm } from '@/components/ui216/standart-form'
import { TsnListType, TsnSelect } from '@/components/ui216/tsn-select'
import { TsnSwitch } from '@/components/ui216/tsn-switch'
import { TsnPanel } from '@/components/ui216/tsn-panel'
import { TsnTextarea } from '@/components/ui216/tsn-textarea'
import { TsnInputAddress } from '@/components/ui216/tsn-input-address'
import { TsnSelectRemote } from '@/components/ui216/tsn-select-remote'
import { GridOrderLine } from './order-lines'
interface Props {
  params: { id: string }
}
export default function EditPage({ params }: Props) {
  const [token, setToken] = useState('')
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { t } = useLanguage()
  const [order, setOrder] = useState<Order>({
    issueDate: new Date().toISOString().substring(0, 10),
    closed: false,
    draft: true
  })

  const load = () => {
    setLoading(true)
    getItem(`/db/orders/${params.id}`, token)
      .then(result => setOrder(result as Order))
      .catch(err => toast({ title: t('Error'), description: t(err || ''), variant: 'destructive' }))
      .finally(() => setLoading(false))
  }
  const save = () => {
    setLoading(true)
    if (params.id == 'addnew') {
      postItem(`/db/orders`, token, order)
        .then(result => router.back())
        .catch(err => toast({ title: t('Error'), description: t(err || ''), variant: 'destructive' }))
        .finally(() => setLoading(false))
    } else {
      putItem(`/db/orders/${params.id}`, token, order)
        .then(result => router.back())
        .catch(err => toast({ title: t('Error'), description: t(err || ''), variant: 'destructive' }))
        .finally(() => setLoading(false))
    }

  }
  useEffect(() => { !token && setToken(Cookies.get('token') || '') }, [])
  useEffect(() => { token && params.id != 'addnew' && load() }, [token])


  return (<StandartForm
    title={t('Orders')}
    onSaveClick={save}
    onCancelClick={() => router.back()}
  >
    {!loading && <>
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
        <TsnSelect title={t('Type')}
          defaultValue={order?.ioType?.toString()}
          list={OrderTypeList.map(e => ({ _id: e._id, text: t(e.text) }))}
          onValueChange={e => setOrder({ ...order, ioType: Number(e) })}
        />

        <TsnInput type='date' title={t('Date')} defaultValue={order?.issueDate} onBlur={e => setOrder({ ...order, issueDate: e.target.value })} />
        <TsnInput title={t('Document Number')} defaultValue={order?.documentNumber} onBlur={e => setOrder({ ...order, documentNumber: e.target.value })} />
      </div>
      <TsnSelectRemote
        apiPath='/db/firms'
        title={t('Firm')}
        defaultValue={order.firm?._id}
        onValueChange={e => setOrder({ ...order, firm: { ...order.firm, _id: e } })}
      />
      <TsnPanel name='order_address' trigger={t('Address')}>
        <TsnInputAddress defaultValue={order?.address} onChange={e => setOrder({ ...order, address: e })} />
      </TsnPanel>
      {order._id && <GridOrderLine orderId={order._id} />}
      <TsnPanel name='order_note_passive' trigger={t('Notes')}>
        <TsnTextarea title={t('Note')} defaultValue={order?.note} onBlur={e => setOrder({ ...order, note: e.target.value })} />
        <TsnSwitch title={t('Closed?')} defaultChecked={order?.closed} onCheckedChange={e => setOrder({ ...order, closed: e })} />
        <TsnSwitch title={t('Draft?')} defaultChecked={order?.draft} onCheckedChange={e => setOrder({ ...order, draft: e })} />
      </TsnPanel>
    </>}
  </StandartForm>)
}

