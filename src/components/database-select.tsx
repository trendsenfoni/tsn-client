"use client"
import * as React from "react"

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
import { useLanguage } from '@/i18n'
import { Button } from './ui/button'
import { RefreshCcwDotIcon } from 'lucide-react'
import { getItem } from '@/lib/fetch'
import { DatabaseType } from '@/types/DatabaseType'
import { useToast } from './ui/use-toast'
import { Skeleton } from './ui/skeleton'


export function DatabaseSelect() {
  const [db, setDb] = useState('')
  const [dbList, setDbList] = useState<DatabaseType[]>([])
  const [token, setToken] = useState('')
  const [loading, setLoading] = useState(false)
  const { t } = useLanguage()
  const { toast } = useToast()

  const setVariables = (l: DatabaseType[]) => {
    const d = Cookies.get('db') || ''
    const foundIndex = l.findIndex((e: DatabaseType) => e._id == d)
    setDbList(l)
    if (foundIndex > -1) {
      setDb(d)
      Cookies.set('databaseName', l[foundIndex].name || '')
    } else if (l.length > 0) {
      setDb(l[l.length - 1]._id || '')
      Cookies.set('databaseName', l[l.length - 1].name || '')
    } else {
      setDb('')
      Cookies.remove('db')
      Cookies.remove('dbList')
      Cookies.remove('databaseName')
    }
  }
  const load = () => {
    setLoading(true)
    getItem(`/databases`, token)
      .then(result => {
        const l = result.docs as DatabaseType[]
        Cookies.set('dbList', JSON.stringify(l))
        setVariables(l)
      })
      .catch(err => toast({ title: err, variant: 'destructive', duration: 1500 }))
      .finally(() => setLoading(false))
  }
  useEffect(() => { !token && setToken(Cookies.get('token') || '') }, [])
  useEffect(() => {
    try {
      if (token) {
        if (Cookies.get('dbList')) {
          const l = (JSON.parse(Cookies.get('dbList') || '[]') || []) as DatabaseType[]
          setVariables(l)
        } else {
          load()
        }
      }
    } catch { }

  }, [token])

  return (
    <>
      {/* <Button className='text-2xl' size={'icon'} variant={'outline'} onClick={() => load()}>
        🔄
      </Button> */}
      {!loading &&
        <Select
          value={db}
          onValueChange={e => {
            Cookies.set('db', e)
            setVariables(dbList)
            location.reload()
          }}
          onOpenChange={e => {
            !e && load()
          }}
        >
          <SelectTrigger className={`w-[140px] px-1 border-0`}>
            <SelectValue placeholder="---" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>{t('Database List')}</SelectLabel>
              {dbList.map((e, index) => <SelectItem key={'database' + index} value={e._id || ''}>📁{e.name}</SelectItem>)}
            </SelectGroup>
            <SelectGroup>
              <SelectLabel onClick={() => alert('redirect')} className='cursor-pointer'>{t('Database List')}</SelectLabel>
            </SelectGroup>
          </SelectContent>
        </Select>
      }
      {loading && <Skeleton className='w-[140px]' />}
    </>
  )
}