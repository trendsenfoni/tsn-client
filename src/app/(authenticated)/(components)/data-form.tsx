"use client"

import { ReactNode, useEffect, useState } from 'react'
import { getItem } from '@/lib/fetch'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import { useToast } from '@/components/ui/use-toast'
import Loading from '@/components/loading'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface Props {
  id: string
  apiPath?: string
  onDataForm?: (e: any, setData: (a: any) => void) => ReactNode
}
export function DataForm({
  id,
  apiPath = "",
  onDataForm
}: Props) {
  const [formData, setFormData] = useState<any>({})
  const [token, setToken] = useState('')
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const load = () => {
    setLoading(true)
    getItem(`${apiPath}/${id}`, token)
      .then(result => {
        setFormData(result)
      })
      .catch(err => toast({ title: 'Error', description: err || '', variant: 'destructive' }))
      .finally(() => setLoading(false))
  }

  useEffect(() => { !token && setToken(Cookies.get('token') || '') }, [])
  useEffect(() => { token && id != 'addnew' && load() }, [token])

  return (<div className='flex flex-col gap-4 h-full'>
    {!loading &&
      <div className='flex flex-col gap-4 '>
        <div>
          {id == 'addnew' && <h2>Yeni form</h2>}
          {id != 'addnew' && <h2>Edit form</h2>}
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {onDataForm && onDataForm(formData, (data) => setFormData({ ...data }))}

        </div>
        <pre>
          {JSON.stringify(formData, null, 2)}
          {JSON.stringify(formData, null, 2)}
        </pre>

      </div>
    }

    {loading &&
      <div className='flex w-full h-full justify-center items-center'>
        <Loading />
      </div>
    }
  </div>)
}

interface InputBoxProps {
  formData: any
  field: string
  setData?: (e: any) => void
  children?: any
  onChange?: (e: any) => void
  onBlur?: (e: any) => void
  className?: string
}
export function InputBox({ formData = {}, field, setData, children, className, onChange, onBlur
}: InputBoxProps) {
  return (<div className='flex flex-col gap-1 my-4'>
    <Label>{children}</Label>
    <Input defaultValue={formData[field]}
      onBlur={e => {
        if (setData && formData[field] != e.target.value) {
          formData[field] = e.target.value
          setData(formData)
        }
        onBlur && onBlur(e)
      }}
      className={className}
    />
  </div>)
}
