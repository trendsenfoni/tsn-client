"use client"
import React, { useEffect, useState } from 'react'
import { Metadata } from 'next/types'
import pageMeta from '@/lib/meta-info'
import Cookies from 'js-cookie'
import { getItem, postItem } from '@/lib/fetch'
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

const DairyListPage = () => {
  const [admintoken, setAdmintoken] = useState('')
  const [report, setReport] = useState('')


  useEffect(() => { !admintoken && setAdmintoken(Cookies.get('admintoken') || '') }, [])
  useEffect(() => {
    if (admintoken) {

    }
  }, [admintoken])

  return (
    <div className='flex flex-col gap-4'>
      <h1>Raporlar</h1>
      <hr />
      <div className='flex flex-row gap-4'>
        <Button onClick={() => setReport('cashBalances')}>Kasalar</Button>
        <Button onClick={() => setReport('inventoryCards')}>Stoklar</Button>
        <Button onClick={() => setReport('bankBalances')}>Bankalar</Button>
      </div>
      {/* {report == 'cashBalances' && <CashBalances />}
      {report == 'bankBalances' && <BankBalances />}
      {report == 'inventoryCards' && <InventoryCards />} */}
    </div>
  )
}

export default DairyListPage