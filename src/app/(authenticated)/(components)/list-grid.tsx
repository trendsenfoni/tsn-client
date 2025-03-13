"use client"

import { FC, ReactNode, useEffect, useState } from 'react'
import { getItem, getList } from '@/lib/fetch'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import { useToast } from '@/components/ui/use-toast'
import { PaginationType } from '@/types/PaginationType'
import { useLanguage } from '@/i18n'
import Loading from '@/components/loading'
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
import { Input } from '@/components/ui/input'
import ButtonLink from '@/components/button-link'
import { EditIcon, PlusSquareIcon } from 'lucide-react'
import Pagination from '@/components/pagination'

export interface GridColumnType {
  children?: any
  className?: string
}
export const Col: FC<GridColumnType> = ({ children, className }) => {
  return (
    <TableHead className={className}>{children}</TableHead>
  )
}
export interface GridCellType {
  children?: string
  className?: string
}
export const Cell: FC<GridCellType> = ({ children, className }) => {
  return (
    <TableCell className={className}>
      {children}
    </TableCell>
  )
}
interface Props {
  headers: ReactNode[]
  cells: GridCellType[]
  apiPath?: string,
  onRowPaint?: (e: any, colIndex: number) => void
}
export function ListGrid({ headers = [], apiPath = '', cells = [], onRowPaint }: Props) {
  const [list, setList] = useState<any[]>([])
  const [token, setToken] = useState('')
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const [pagination, setPagination] = useState<PaginationType>({ pageCount: 0, page: 1, pageSize: 10, totalDocs: 0 })
  const [search, setSearch] = useState('')
  const { t } = useLanguage()

  const load = (pageNo?: number, s?: string) => {
    let url = `${apiPath}?pageSize=${pagination.pageSize}&page=${pageNo || pagination.page}`
    if (s != undefined)
      url += `&search=` + encodeURIComponent(s)
    else if (search)
      url += `&search=` + encodeURIComponent(search)

    setLoading(true)
    getList(url, token)
      .then(result => {
        setList(result.docs as any[])
        setPagination(result as PaginationType)
      })
      .catch(err => toast({ title: 'error', description: err || '', variant: 'destructive' }))
      .finally(() => setLoading(false))
  }
  useEffect(() => { !token && setToken(Cookies.get('token') || '') }, [])
  useEffect(() => { token && load() }, [token])


  return (<div className='flex flex-col gap-4'>
    <div className='flex justify-between'>
      <h1 className='text-3xl ms-2'>Mağazalar</h1>
      <div className="relative">
        {/* <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" /> */}
        <div className='absolute left-1.5 top-1.5 text-xl'>🔍</div>
        <Input
          type='search'
          className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
          placeholder={t('search...')}
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
        <TableHeader >
          <TableRow >
            {headers.map((e, index) => <>{e}</>)}
            <TableHead className="text-center w-14 t11ext-2xl">
              <ButtonLink href={`/stores/addnew`} type={'success'}>
                <PlusSquareIcon />
              </ButtonLink>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody >
          {list.map((e, index) => (
            <TableRow key={(e._id || 'grid' + index)}>
              {cells.map((c, cindex) => <TableCell className={c.className} dangerouslySetInnerHTML={{ __html: eval((c.children || '') as string) }}></TableCell>)}


              <TableCell className="w-12 flex justify-center gap-2 text-xl">

                <ButtonLink href={`/stores/${e._id}`} type=''>
                  <EditIcon />
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
  </div>)
}