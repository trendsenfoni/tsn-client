"use client"

import { InputText } from '@/components/ui216/input-text'
import { DataForm } from '@/components/ui216/data-form'
import { useLanguage } from '@/i18n'
import { ItemMainGroup } from '@/types/Item'

interface Props {
  params: { id: string }
}
export default function EditPage({ params }: Props) {
  const { t } = useLanguage()
  return (<div>
    <DataForm
      apiPath='/databases'
      id={params.id}
      onDataForm={(formData: ItemMainGroup, setData) => {
        return (<>
          <InputText formData={formData} field='name' setData={setData}  >Isim</InputText>
          <InputText formData={formData} field='article' setData={setData} >Artikel</InputText>
        </>)
      }}
    />
  </div>)
}

