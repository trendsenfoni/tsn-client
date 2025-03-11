"use client"
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { StoreType } from '@/types/StoreType'
import { useRouter } from 'next/navigation'
import { FC, useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { getItem, postItem, putItem } from '@/lib/fetch'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import CustomLink from '@/components/custom-link'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ManagerType } from '@/types/ManagerType'
import { GenderSelect } from '@/components/gender-select'
interface Props {
  params: {
    id?: string
  }
}
export default function PageEdit({ params }: Props) {
  const router = useRouter()
  const { toast } = useToast()
  const [admintoken, setAdmintoken] = useState('')
  const [store, setStore] = useState<StoreType>({})
  const [inUseIdentifier, setInUseIdentifier] = useState(-1)

  const save = () => {
    if (params.id == 'addnew') {
      postItem(`/admin/stores/${params.id}`, admintoken, store)
        .then(result => {
          toast({ description: 'Kayit basarili' })
          setTimeout(() => router.push('/stores'), 1000)
        })
        .catch(err => toast({ title: 'Error', description: err, variant: 'destructive' }))

    } else {
      putItem(`/admin/stores/${params.id}`, admintoken, store)
        .then(result => {
          toast({ description: 'Kayit basarili' })
          setTimeout(() => router.push('/stores'), 1000)
        })
        .catch(err => toast({ title: 'Error', description: err, variant: 'destructive' }))

    }
  }

  useEffect(() => { !admintoken && setAdmintoken(Cookies.get('admintoken') || '') }, [])
  useEffect(() => {
    if (admintoken) {
      if (params.id != 'addnew') {
        getItem(`/admin/stores/${params.id}`, admintoken)
          .then(result => {
            setStore(result as StoreType)
          })
          .catch(err => toast({ title: 'Error', description: err || '', variant: 'destructive' }))
      }
    }
  }, [admintoken])
  return (<div>
    <div className="w-full max-w-4xl flex flex-col justify-center mx-auto py-8 px-0 md:px-6 space-y-2">
      <div className="flex items-center gap-4 mb-6 w-full max-w-4xl">
        <Avatar className="h-24 w-24">
          <AvatarImage src={store.logo || '/img/store-icon.png'} alt="@shadcn" />
          <AvatarFallback>{store.name}</AvatarFallback>
        </Avatar>
        <div className='flex flex-col gap-4 w-full max-w-4xl'>
          <div className='max-w-lg'>
            <Label>Magaza Ismi</Label>
            <Input defaultValue={store.name} placeholder='Magaza ismi'
              onChange={e => {
                setStore({ ...store, name: e.target.value })
              }} />
          </div>
          <div>
            <Label>Slogan</Label>
            <Input defaultValue={store.slogan} placeholder='Slogan'
              onChange={e => setStore({ ...store, slogan: e.target.value })} />
          </div>

        </div>
      </div>
      <div className="grid  max-w-4xl gap-4">
        <div>
          <Label>identifier</Label>
          <div className='flex flex-col'>
            <Input
              defaultValue={store.identifier} placeholder='Identifier'

              onBlur={e => {
                e.target.value = e.target.value.toLocaleLowerCase().replaceAll(' ', '_')
                setStore({ ...store, identifier: e.target.value })
                getItem(`/admin/stores/check/${e.target.value}`, admintoken)
                  .then(result => {
                    if (result.inUse) {
                      setInUseIdentifier(1)
                    } else {
                      setInUseIdentifier(0)
                    }
                  })
                  .catch(err => {
                    setInUseIdentifier(-1)
                    toast({ title: 'Error', description: err || '', variant: 'destructive' })
                  })

              }} />
            {inUseIdentifier == 1 && <>
              <Label className='text-red-600'>Kullanımda</Label>
            </>}
            {inUseIdentifier == 0 && <>
              <Label className='text-blue-600'>Uygun</Label>
            </>}
          </div>
        </div>
        <div>
          <Label>Domain <span className='text-gray-500'>{`(don't type http:// or https://)`}</span></Label>
          <div className='flex flex-col'>
            <Input
              defaultValue={store.domain} placeholder='domain'
              onChange={e => setStore({ ...store, domain: e.target.value })} />

          </div>
        </div>

      </div >
      <div className="grid max-w-4xl gap-4 border border-dashed rounded-md p-4">
        <h2 className='text-2xl' >Mağaza Sahip Bilgileri</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div>
            <Label>İsim</Label>
            <Input defaultValue={store.owner?.firstName} onChange={e => setStore({ ...store, owner: { ...store.owner, firstName: e.target.value } })} />
          </div>
          <div>
            <Label>Soyad</Label>
            <Input defaultValue={store.owner?.lastName} onChange={e => setStore({ ...store, owner: { ...store.owner, lastName: e.target.value } })} />
          </div>
          <div>
            <Label>Email</Label>
            <Input defaultValue={store.owner?.email} onChange={e => setStore({ ...store, owner: { ...store.owner, email: e.target.value } })} />
          </div>
          <div>
            <Label>Parola</Label>
            <Input defaultValue={store.owner?.password} onChange={e => setStore({ ...store, owner: { ...store.owner, password: e.target.value } })} />
          </div>
          <div>
            <Label>Cinsiyet</Label>
            <GenderSelect defaultValue={store.owner?.gender} onChange={e => setStore({ ...store, owner: { ...store.owner, gender: e } })} />
          </div>
        </div>

      </div >
      <div className='w-full flex flex-row justify-end gap-4 mt-4'>
        <Button className="text-2xl" variant={'secondary'} onClick={() => router.back()}><i className="fa-solid fa-angle-left"></i></Button>
        <Button className="text-2xl" onClick={save}><i className="fa-solid fa-cloud-arrow-up"></i> </Button>
      </div>
    </div>

  </div>)
}