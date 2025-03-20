"use client"

import { DataForm, InputBox } from '@/app/(authenticated)/(components)/data-form'
import { useLanguage } from '@/i18n'
import { ItemMainGroup } from '@/types/Item'

interface Props {
  params: { id: string }
}
export default function EditPage({ params }: Props) {
  const { t } = useLanguage()
  return (<div>
    <DataForm
      apiPath='/db/itemMainGroups'
      id={params.id}
      onDataForm={(e: ItemMainGroup, setData) => {
        return (<>

          <InputBox formData={e} field='name' setData={setData}  >Isim</InputBox>
          <InputBox formData={e} field='article' setData={setData} >Artikel</InputBox>
        </>)
      }}
    />
  </div>)
}

