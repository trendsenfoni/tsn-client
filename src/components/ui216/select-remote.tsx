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
  all?: boolean
}
export function SelectRemote({ formData = {}, field, setData, children, className, onChange, onBlur,
  apiPath, textField = 'name', all
}: Props) {
  const [token, setToken] = useState('')
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const [list, setList] = useState<ListType[]>([])

  const load = () => {
    setLoading(true)
    getList(`${apiPath}${(apiPath || '').indexOf('?') > -1 ? '&' : '?'}pageSize=2000`, token)
      .then(result => {
        setList(result.docs.map((e: any) => { return ({ _id: e._id, text: e[textField] }) }))
      })
      .catch(err => toast({ title: 'Error', description: err || '', variant: 'destructive' }))
      .finally(() => setLoading(false))
  }
  useEffect(() => { !token && setToken(Cookies.get('token') || '') }, [])
  useEffect(() => { token && load() }, [token])

  return (<div className='flex flex-col gap-1'>
    <Label className='ms-2'>{children}</Label>

    {!loading &&
      <Select
        defaultValue={formData[field] && formData[field]._id || formData[field] || ''}
        onValueChange={e => {
          if (setData && formData[field] != e) {
            formData[field] = e
            setData(formData)
          }
        }}
      >
        <SelectTrigger className="w-full">
          {!all && <SelectValue placeholder="---" />}
          {all && <SelectValue placeholder="*" />}
        </SelectTrigger>
        <SelectContent>
          {all &&
            <SelectGroup>
              <SelectItem value=" ">*</SelectItem>
            </SelectGroup>
          }
          <SelectGroup>
            {list && list.map((e, index) => (e._id && <SelectItem key={e._id} value={e._id}>{e.text}</SelectItem>))}
          </SelectGroup>
        </SelectContent>
      </Select>
    }
    {loading && <Skeleton className='h-10 w-full mt-4' />}

  </div>)
}