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
import { TsnSelect } from '@/components/ui216/tsn-select'
import { firmTypeList } from '@/lib/utils'
import { TsnSwitch } from '@/components/ui216/tsn-switch'
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
    </>}
  </StandartForm>)
}

