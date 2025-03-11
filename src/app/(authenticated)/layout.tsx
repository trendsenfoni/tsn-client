import { FC } from 'react'
import { Metadata } from "next"

import Link from "next/link"

import { cookies } from 'next/headers'
import { RedirectType, redirect } from 'next/navigation'
import { DashboardHeader } from './(components)/dashboard-header'
import DashboardFooter from './(components)/dashboard-footer'
import { getAuthAdminToken } from '@/lib/authHelper'
import React from 'react'
import '@/styles/piechart-style.css'




export interface AppLayoutProps {
  children?: any
}
const AppLayout: FC<AppLayoutProps> = ({ children }) => {

  if (!getAuthAdminToken()) {
    return redirect('/auth/login', RedirectType.push)
  }

  return (
    <div className="flex min-h-screen w-full flex-col px-2 dark:bg-[#030611] ">
      <DashboardHeader />
      <div className='my-2'></div>
      <div className="flex-1 md:border border-dashed border-opacity-25 rounded-md border-yellow-400 " style={{ overflowWrap: 'anywhere' }}>
        <div className='container mx-auto py-1 px-1 md:px-4 md:py-4'>
          {children}
        </div>
      </div>
      <div className='my-2'></div>
      <DashboardFooter />
    </div>
  )

}

export default AppLayout