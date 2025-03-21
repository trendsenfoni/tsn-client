"use client"

import { InputText } from '@/components/ui216/input-text'
import { DataForm } from '@/components/ui216/data-form'
import { useLanguage } from '@/i18n'
import { ItemGroupMainGroup } from '../page'

interface Props {
  params: { id: string }
}
export default function EditPage({ params }: Props) {
  const { t } = useLanguage()
  return (<div>
    <DataForm
      apiPath='/db/items'
      id={params.id}
      onDataForm={(formData: any, setData) => {
        return (<>
          <ItemGroupMainGroup filter={formData} setFilter={setData} className='grid grid-cols-2 gap-4 my-4' />
          <InputText formData={formData} field='name' setData={setData}>{t('Name')}</InputText>
          <InputText formData={formData} field='description' setData={setData}>{t('Description')}</InputText>
        </>)
      }}
    />
  </div>)
}

