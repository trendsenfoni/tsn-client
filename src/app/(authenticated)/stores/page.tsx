"use client"
import React, { useEffect, useState } from 'react'
import { Metadata } from 'next/types'
import pageMeta from '@/lib/meta-info'
import Cookies from 'js-cookie'
import { getItem, getList, postItem } from '@/lib/fetch'
import Link from 'next/link'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from '@/components/ui/button'
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from 'next/navigation'
import { Switch } from '@/components/ui/switch'
import ButtonLink from '@/components/button-link'
import { ManagerType } from '@/types/ManagerType'
import Pagination from '@/components/pagination'
import { PaginationType } from '@/types/PaginationType'
import Loading from '@/components/loading'
import { Input } from '@/components/ui/input'
import { SearchIcon } from 'lucide-react'
import { StoreType } from '@/types/StoreType'
export default function ManagerListPage() {
  const [admintoken, setAdmintoken] = useState('')
  const { toast } = useToast()
  const [list, setList] = useState<StoreType[]>([])
  const [pagination, setPagination] = useState<PaginationType>({ pageCount: 0, page: 1, pageSize: 10, totalDocs: 0 })
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')

  const load = (pageNo?: number, s?: string) => {
    let url = `/admin/stores?pageSize=${pagination.pageSize}&page=${pageNo || pagination.page}`
    if (s != undefined)
      url += `&search=` + encodeURIComponent(s)
    else if (search)
      url += `&search=` + encodeURIComponent(search)

    setLoading(true)
    getList(url, admintoken)
      .then(result => {
        setList(result.docs as StoreType[])
        setPagination(result as PaginationType)
      })
      .catch(err => toast({ title: 'error', description: err || '', variant: 'destructive' }))
      .finally(() => setLoading(false))
  }
  useEffect(() => { !admintoken && setAdmintoken(Cookies.get('admintoken') || '') }, [])
  useEffect(() => { admintoken && load() }, [admintoken])

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex justify-between'>
        <h1 className='text-3xl ms-2'>Mağazalar</h1>
        <div className="relative">
          <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
          <Input
            type='search'
            className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
            placeholder="ara..."
            defaultValue={search}
            onChange={e => {
              setSearch(e.target.value)
              e.target.value == "" && load(1, "")
            }}
            onKeyDown={e => e.code == 'Enter' && load(1, search)}
          />
        </div>

      </div>

      <hr />
      {!loading && <>
        <Table className=''>
          {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
          <TableHeader >
            <TableRow >
              <TableHead className="">Mağaza</TableHead>
              <TableHead >Sahibi</TableHead>
              <TableHead >Pasif?</TableHead>
              <TableHead className="text-center w-14 text-2xl">
                <ButtonLink href={`/stores/addnew`} type={'success'}>
                  <i className="fa-solid fa-square-plus"></i>
                </ButtonLink>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody >
            {list.map(e => (
              <TableRow key={e._id}>
                <TableCell className="font-medium">{e.name}</TableCell>
                <TableCell className='flex flex-col'>
                  <span>{e.owner?.fullName}</span>
                  <span className='text-sm'>{e.owner?.email}</span>
                </TableCell>
                <TableCell >{e.passive ? 'Pasif' : 'Aktif'}</TableCell>
                <TableCell className="w-12 flex justify-center gap-2 text-xl">
                  <ButtonLink href={`/stores/${e._id}/connector`} type=''>
                    <i className="fa-solid fa-plug"></i>
                  </ButtonLink>
                  <ButtonLink href={`/stores/${e._id}`} type=''>
                    <i className="fa-solid fa-edit"></i>
                  </ButtonLink>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter className='bg-transparent'>
            <TableRow className=' hover:bg-transparent'>
              <TableCell colSpan={5} >
                <Pagination pagination={pagination} onPageClick={(pageNo: number) => {
                  setPagination({ ...pagination, page: pageNo })
                }} />
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </>}
      {loading && <div className='flex w-full h-full justify-center items-center'>
        <Loading />
      </div>}
    </div>
  )
}

