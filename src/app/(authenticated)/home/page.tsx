"use client"

import { useState } from 'react'
// import { DashboardBankBalances } from './dashboard-bankBalances'
// import { DashboardBestProductSales } from './dashboard-bestProductSales'
// import { DashboardCashBalances } from './dashboard-cash-balances'
// import { DashboardProductMainGroupSales } from './dashboard-productMainGroupSales'
// import { DashboardStoreSales } from './dashboard-storeSales'
import { PieCart1 } from './pie-chart'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'


export default function Home() {
  const [report, setReport] = useState('caseBank')
  return (
    <div className='container px-0 py-4 flex flex-col gap-4'>
      <h1>Admin Panel</h1>

      {/* <div className='grid gap-4 grid-cols-2'>
        <Button variant={'outline'} onClick={() => setReport('caseBank')}><i className="fa-solid fa-building-columns me-2"></i> Kasa/Banka</Button>
        <Button variant={'outline'} onClick={() => setReport('storeSales')}><i className="fa-solid fa-store me-2"></i>Magaza</Button>
        <Button variant={'outline'} onClick={() => setReport('productMainGroupSales')}><i className="fa-solid fa-object-group me-2"></i> Ana Grup</Button>
        <Button variant={'outline'} onClick={() => setReport('bestProductSales')}><i className="fa-solid fa-chart-bar me-2"></i> En Çok Satanlar</Button>

      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {report == 'caseBank' && <><DashboardCashBalances /><DashboardBankBalances /></>}
        {report == 'storeSales' && <><DashboardStoreSales /></>}
        {report == 'productMainGroupSales' && <><DashboardProductMainGroupSales /></>}
        {report == 'bestProductSales' && <><DashboardBestProductSales /></>}

      </div> */}

    </div>
  )
}
