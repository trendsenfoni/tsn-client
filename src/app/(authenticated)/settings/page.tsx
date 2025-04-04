"use client"

import { useEffect, useState } from 'react'
import { getItem, putItem } from '@/lib/fetch'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import { currencyList, Settings } from '@/types/Settings'
import { useToast } from '@/components/ui/use-toast'
import { TsnSelect } from '@/components/ui216/tsn-select'
import { useLanguage } from '@/i18n'
import { StandartForm } from '@/components/ui216/standart-form'
import { TsnInput } from '@/components/ui216/tsn-input'
import { Label } from '@/components/ui/label'
import { TsnPanel } from '@/components/ui216/tsn-panel'

interface Props {
}
export default function SettingsPage({ }: Props) {
  const [settings, setSettings] = useState<Settings>({})
  const [token, setToken] = useState('')
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { t } = useLanguage()

  const load = () => {
    setLoading(true)
    getItem(`/db/settings`, token)
      .then(result => {
        setSettings(result as Settings)
      })
      .catch(err => toast({ title: 'Error', description: err || '', variant: 'destructive' }))
      .finally(() => setLoading(false))
  }

  const save = () => {
    setLoading(true)
    putItem(`/db/settings`, token, settings)
      .then(result => router.back())
      .catch(err => toast({ title: t('Error'), description: t(err || ''), variant: 'destructive' }))
      .finally(() => setLoading(false))

  }

  useEffect(() => { !token && setToken(Cookies.get('token') || '') }, [])
  useEffect(() => { token && load() }, [token])

  return (
    <StandartForm
      title={t('Settings')}
      onSaveClick={save}
      onCancelClick={() => router.back()}
    >
      {!loading && <>
        <div className='grid grid-cols-1 lg:grid-cols-4 gap-4'>
          <TsnSelect
            list={currencyList}
            title={t('Currency')}
            defaultValue={settings.currency}
            onValueChange={e => setSettings({ ...settings, currency: e })}
          />
          <div className='flex justify-between items-center gap-2'>
            <TsnInput title={t('Invoice Prefix')}
              maxLength={3}
              defaultValue={settings.invoiceNumberPrefix}
              onChange={e => {
                e.target.value = (e.target.value || '').toUpperCase()
                e.target.value = (e.target.value || '').toUpperCase()
                setSettings({ ...settings, invoiceNumberPrefix: e.target.value })
              }}
            />
            <Label className='font-mono text-nowrap mt-4 flex'>
              <span>{settings.invoiceNumberPrefix}</span>
              <span className='text-blue-600'>{new Date().getFullYear()}</span>
              <span className='text-green-600'>000000001</span>
            </Label>
          </div>
        </div>
        <TsnPanel name='party' trigger={t('Our Firm Info')}>
          <TsnSelect
            list={[{ _id: 'VKN', name: 'VKN' }, { _id: 'TCKN', name: 'TCKN' }]}
            title={t('Tax Scheme')}
            defaultValue={settings.taxScheme}
            onValueChange={e => setSettings({ ...settings, taxScheme: e })}
          />
          <TsnInput title={t('Tax Office')}
            defaultValue={settings.taxOffice}
            onChange={e => setSettings({ ...settings, taxOffice: e.target.value })}
          />
          <TsnInput title={t('Tax Number')}
            defaultValue={settings.taxNumber}
            onChange={e => setSettings({ ...settings, taxNumber: e.target.value })}
          />
        </TsnPanel>
      </>}
    </StandartForm>
  )
}