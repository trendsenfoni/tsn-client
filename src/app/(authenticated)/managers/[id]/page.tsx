"use client"
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { ManagerType } from '@/types/ManagerType'
import { useRouter } from 'next/navigation'
import { FC, useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { getItem, putItem } from '@/lib/fetch'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import CustomLink from '@/components/custom-link'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
interface Props {
  params: {
    id?: string
  }
}
export default function PageEdit({ params }: Props) {
  const router = useRouter()
  const { toast } = useToast()
  const [admintoken, setAdmintoken] = useState('')
  const [manager, setManager] = useState<ManagerType>({})


  const save = () => {
    putItem(`/admin/managers/${params.id}`, admintoken, manager)
      .then(result => {
        toast({ description: 'Kayit basarili' })
        setTimeout(() => router.push('/managers'), 1000)
      })
      .catch(err => toast({ title: 'Error', description: err, variant: 'destructive' }))
  }

  useEffect(() => { !admintoken && setAdmintoken(Cookies.get('admintoken') || '') }, [])
  useEffect(() => {
    if (admintoken) {
      getItem(`/admin/managers/${params.id}`, admintoken)
        .then(result => setManager(result as ManagerType))
        .catch(err => toast({ title: 'Error', description: err || '', variant: 'destructive' }))
    }
  }, [admintoken])
  return (<div>
    <div className="w-fu11ll m11ax-w-3xl mx-auto py-8 px-0 md:px-6">
      <div className="flex items-center gap-4 mb-6">
        <Avatar className="h-24 w-24">
          <AvatarImage src={manager.image || '/placeholder-user.jpg'} alt="@shadcn" />
          <AvatarFallback>{manager.fullName}</AvatarFallback>
        </Avatar>
        <div>
          <div className='flex flex-row gap-2'>
            <Input className="text-2xl font-bold" placeholder='First Name'
              defaultValue={manager.firstName} onChange={e => setManager({ ...manager, firstName: e.target.value })} />
            <Input className="text-2xl font-bold" placeholder='Last Name'
              defaultValue={manager.lastName} onChange={e => setManager({ ...manager, lastName: e.target.value })} />
          </div>

          <Input defaultValue={manager.title} placeholder='Title'
            onChange={e => setManager({ ...manager, title: e.target.value })} />
        </div>
      </div>
      <div className="grid gap-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className=''>
            <Label>Email</Label>
            <Input type='email' defaultValue={manager.email} onChange={e => setManager({ ...manager, email: e.target.value })} />
          </div>
          <div className=''>
            <Label>Password</Label>
            <Input defaultValue={manager.password} onChange={e => setManager({ ...manager, password: e.target.value })} />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className=''>
            <Label>Phone Number</Label>
            <Input type='tel' defaultValue={manager.phoneNumber} onChange={e => setManager({ ...manager, phoneNumber: e.target.value })} />
          </div>
          <div className=''>
            <Label>Location</Label>
            <Input defaultValue={manager.location} onChange={e => setManager({ ...manager, location: e.target.value })} />
          </div>
        </div>
        <div>
          <Label>About</Label>
          <p className="text-muted-foreground">
            <Textarea defaultValue={manager.bio} onChange={e => setManager({ ...manager, bio: e.target.value })} />
          </p>
        </div>

      </div >
      <div className='w-full flex flex-row justify-end gap-4 mt-4'>
        <Button className="text-2xl" variant={'secondary'} onClick={() => router.back()}><i className="fa-solid fa-angle-left"></i>       </Button>
        <Button className="text-2xl" onClick={save}><i className="fa-solid fa-cloud-arrow-up"></i>        </Button>
      </div>
    </div>

  </div>)
}