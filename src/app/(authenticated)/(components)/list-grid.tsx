"use client"

import { FC, ReactNode, useEffect, useState } from 'react'
import { deleteItem, getItem, getList } from '@/lib/fetch'
import { usePathname, useRouter } from 'next/navigation'
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
import { EditIcon, PlusSquareIcon, Trash2Icon } from 'lucide-react'
import Pagination from '@/components/pagination'
import { Button } from '@/components/ui/button'
import { ButtonConfirm } from '@/components/button-confirm'

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
  // headers?: ReactNode[]
  // cells?: GridCellType[]
  apiPath?: string,
  onHeaderPaint?: () => ReactNode
  onRowPaint?: (e: any, colIndex: number) => ReactNode
  onDelete?: (e: any) => void
  showSearch?: boolean
  showAddNew?: boolean
  showEdit?: boolean
  showDelete?: boolean
}
export function ListGrid({
  // headers = [],
  apiPath = '',
  onRowPaint,
  onHeaderPaint,
  onDelete,
  showSearch = true,
  showAddNew = false,
  showEdit = false,
  showDelete = false,
}: Props) {
  const [list, setList] = useState<any[]>([])
  const [token, setToken] = useState('')
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const pathName = usePathname()
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

  const deleteRecord = (id: any) => {
    deleteItem(`${apiPath}/${id}`, token)
      .then(result => {
        load(1, search)
      })
      .catch(err => toast({ title: 'error', description: err || '', variant: 'destructive' }))
  }
  useEffect(() => { !token && setToken(Cookies.get('token') || '') }, [])
  useEffect(() => { token && load() }, [token])


  return (<div className='flex flex-col gap-4'>
    <div className='flex justify-between'>
      <h1 className='text-3xl ms-2'>Mağazalar | {pathName}</h1>
      {showSearch &&
        <div className="relative">
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
      }
    </div>

    <hr />
    {!loading && <>
      <Table className='lg:text-[120%]'>
        {onHeaderPaint &&
          <TableHeader >
            <TableRow >
              {onHeaderPaint()}
              {(showAddNew || showEdit || showDelete) &&
                <TableHead className="text-center w-28 t11ext-2xl">
                  {showAddNew &&
                    <Button
                      onClick={() => router.push(`${pathName}/addnew`)}
                      size={'icon'} variant={'default'}
                      className='px-2 bg-green-800 text-white hover:bg-green-500 hover:text-white'>

                      <PlusSquareIcon />
                    </Button>
                  }
                  {!showAddNew && <>#</>}
                </TableHead>
              }
            </TableRow>
          </TableHeader>
        }
        <TableBody >
          {list.map((e, index) => (
            <TableRow key={(e._id || 'grid' + index)}>
              {onRowPaint && onRowPaint(e, index)}

              <TableCell className="w-28 flex  gap-2 text-xl">
                {showEdit && e._id &&
                  <Button
                    onClick={() => router.push(`${pathName}/${e._id}`)}
                    size={'icon'} variant={'ghost'}
                    className='px-2 bg-blue-800 text-white hover:bg-blue-500 hover:text-white'>
                    <EditIcon />
                  </Button>
                }
                {showDelete && e._id &&
                  <ButtonConfirm
                    onOk={() => {
                      if (onDelete) {
                        onDelete(e)
                      } else if (e._id) {
                        deleteRecord(e._id)
                      }
                    }}
                    text={t('Do you want to delete the record?')}
                    description={<span className='text-lg'>{e.name || e.description || e._id}</span>}

                  >
                    <div className='px-2 py-2 rounded-md bg-red-800 text-white hover:bg-red-500 hover:text-white'>
                      <Trash2Icon />
                    </div>
                  </ButtonConfirm>
                  // <Button
                  //   onClick={() => router.push(`${pathName}/${e._id}`)}
                  //   size={'icon'} variant={'ghost'}
                  //   className='px-2 bg-red-800 text-white hover:bg-red-500 hover:text-white'>
                  //   <Trash2Icon />
                  // </Button>
                }
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