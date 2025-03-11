"use client"
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'
import { FC, useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { getItem, postItem } from '@/lib/fetch'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import CustomLink from '@/components/custom-link'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { AdminUserType } from '@/types/AdminUserType'

export default function PageAddNew() {
  const router = useRouter()
  const { toast } = useToast()
  const [admintoken, setAdmintoken] = useState('')
  const [adminUser, setAdminUser] = useState<AdminUserType>({})
  const [newLink, setNewLink] = useState('')

  const save = () => {
    postItem(`/admin/adminUsers`, admintoken, adminUser)
      .then(result => {
        toast({ description: 'Kayit basarili' })
        setTimeout(() => router.push('/adminUsers'), 1000)
      })
      .catch(err => toast({ title: 'Error', description: err, variant: 'destructive' }))
  }
  useEffect(() => { !admintoken && setAdmintoken(Cookies.get('admintoken') || '') }, [])
  useEffect(() => {
    if (admintoken) {

    }
  }, [admintoken])
  return (<div>
    <div className="w-fu11ll m11ax-w-3xl mx-auto py-8 px-0 md:px-6">
      <div className="flex items-center gap-4 mb-6">
        <Avatar className="h-24 w-24">
          <AvatarImage src={adminUser.image || '/placeholder-user.jpg'} alt="@shadcn" />
          <AvatarFallback>{adminUser.fullName}</AvatarFallback>
        </Avatar>
        <div>
          <div className='flex flex-row gap-2'>
            <Input className="text-2xl font-bold" placeholder='First Name'
              defaultValue={adminUser.firstName} onChange={e => setAdminUser({ ...adminUser, firstName: e.target.value })} />
            <Input className="text-2xl font-bold" placeholder='last Name'
              defaultValue={adminUser.lastName} onChange={e => setAdminUser({ ...adminUser, lastName: e.target.value })} />
          </div>

          <Input defaultValue={adminUser.title} placeholder='Title'
            onChange={e => setAdminUser({ ...adminUser, title: e.target.value })} />
        </div>
      </div>
      <div className="grid gap-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className=''>
            <Label>Email</Label>
            <Input type='email' defaultValue={adminUser.email} onChange={e => setAdminUser({ ...adminUser, email: e.target.value })} />
          </div>
          <div className=''>
            <Label>Password</Label>
            <Input defaultValue={adminUser.password} onChange={e => setAdminUser({ ...adminUser, password: e.target.value })} />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className=''>
            <Label>Phone Number</Label>
            <Input type='tel' defaultValue={adminUser.phoneNumber} onChange={e => setAdminUser({ ...adminUser, phoneNumber: e.target.value })} />
          </div>
          <div className=''>
            <Label>Location</Label>
            <Input defaultValue={adminUser.location} onChange={e => setAdminUser({ ...adminUser, location: e.target.value })} />
          </div>
        </div>
        <div>
          <Label>About</Label>
          <p className="text-muted-foreground">
            <Textarea defaultValue={adminUser.bio} onChange={e => setAdminUser({ ...adminUser, bio: e.target.value })} />
          </p>
        </div>

      </div >
      <div className='w-full flex flex-row justify-end gap-4 mt-4'>
        <Button className="text-2xl" variant={'secondary'} onClick={() => router.back()}><i className="fa-solid fa-angle-left"></i>       </Button>
        <Button className="text-2xl" onClick={save}><i className="fa-solid fa-cloud-arrow-up"></i>        </Button>
      </div>
    </div >

  </div >)
}