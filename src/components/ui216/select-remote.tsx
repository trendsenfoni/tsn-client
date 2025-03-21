"use client"

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { FormItem } from './FormItemType'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,

} from "@/components/ui/select"
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { getList } from '@/lib/fetch'
import { useToast } from '../ui/use-toast'
import { useRouter } from 'next/navigation'
import { Skeleton } from '../ui/skeleton'

interface ListType {
  _id?: string
  text?: string
}
interface Props extends FormItem {
  apiPath?: string
  textField?: string
}
export function SelectRemote({ formData = {}, field, setData, children, className, onChange, onBlur,
  apiPath, textField = 'name'
}: Props) {
  const [token, setToken] = useState('')
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const [list, setList] = useState<ListType[]>([])

  const load = () => {
    setLoading(true)
    getList(`${apiPath}?pageSize=2000`, token)
      .then(result => {

      })
      .catch(err => toast({ title: 'Error', description: err || '', variant: 'destructive' }))
      .finally(() => setLoading(false))
  }
  useEffect(() => { !token && setToken(Cookies.get('token') || '') }, [])
  useEffect(() => { token && load() }, [token])

  return (<div className='flex flex-col gap-1 my-4'>
    <Label className='ms-2'>{children}</Label>
    {!loading &&
      <Select
        defaultValue={formData[field]}
        onValueChange={e => {
          if (setData && formData[field] != e) {
            formData[field] = e
            setData(formData)
          }
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="---" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {list && list.map((e, index) => (e._id && <SelectItem value={e._id}>{e.text}</SelectItem>))}
          </SelectGroup>
        </SelectContent>
      </Select>
    }
    {loading && <Skeleton className='h-12 w-[180px]' />}
    {/* <Input defaultValue={formData[field]}
      onBlur={e => {
        if (setData && formData[field] != e.target.value) {
          formData[field] = e.target.value
          setData(formData)
        }
        onBlur && onBlur(e)
      }}
      className={className}
    /> */}
  </div>)
}