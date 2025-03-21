"use client"

import { InputText } from '@/components/ui216/input-text'
import { DataForm } from '@/components/ui216/data-form'
import { useLanguage } from '@/i18n'
import { ItemMainGroup } from '@/types/Item'
import { SelectRemote } from '@/components/ui216/select-remote'

interface Props {
  params: { id: string }
}
export default function EditPage({ params }: Props) {
  const { t } = useLanguage()
  return (<div>
    <DataForm
      apiPath='/db/itemGroups'
      id={params.id}
      onDataForm={(formData: ItemMainGroup, setData) => {
        return (<>
          <SelectRemote formData={formData} field='itemMainGroup' setData={setData}
            apiPath='/db/itemMainGroups'
          >{t('Main Group')}</SelectRemote>
          <InputText formData={formData} field='name' setData={setData}  >{t('Name')}</InputText>
          <InputText formData={formData} field='article' setData={setData} >{t('Article')}</InputText>
        </>)
      }}
    />
  </div>)
}

