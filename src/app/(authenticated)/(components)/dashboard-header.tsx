// "use client"

import { ThemeToggleButton } from '@/components/theme-toggle-button'
import { HeaderLogo2 } from '@/components/logo'
import CustomLink from '@/components/custom-link'
import { Input } from "@/components/ui/input"
import DashboardUserMenu from './dashboard-user-menu'
import { FC } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function DashboardHeader({ }) {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-0 md:px-2 dark:border-gray-800 dark:bg-gray-950"    >
      <div className="flex flex-row items-center gap-4">
        <CustomLink className="" href="/home">
          <HeaderLogo2 className='' />
        </CustomLink>
        <nav className=" hidden gap-4 text-sm font-medium md:flex">
          <CustomLink className="rounded-md px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800" href="/home">
            <i className="fa-solid fa-gauge-high me-2 text-lg"></i>
            Ana Ekran
          </CustomLink>
          <CustomLink className="rounded-md px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800" href="/stores">
            <i className="fa-solid fa-store me-2 text-lg"></i>
            Mağazalar
          </CustomLink>

          <div className='border-r'></div>
          <CustomLink className="rounded-md px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800" href="/settings">
            <i className='fa-solid fa-gears me-2 text-lg'></i>
            Ayarlar
          </CustomLink>
        </nav>
      </div>
      <div className="flex items-center gap-2">
        <DashboardUserMenu />
        <div className='flex md:hidden'><MobileMenu /></div>

      </div>
    </header>
  )
}

function MobileMenu() {
  return (<>
    <DropdownMenu >
      <DropdownMenuTrigger asChild  >
        <Button className="rounded-full border border-gray-200 w-12 h-12 dark:border-gray-800"
          size="icon"
          variant="ghost"
        >
          <i className="fa-solid fa-bars"></i>
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" >
        <DropdownMenuItem>
          <Link href="/home" className='flex items-center '>
            <i className="fa-solid fa-gauge-high me-2 text-lg"></i>
            Ana Ekran
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/members" className='flex items-center '>
            <i className="fa-solid fa-store me-2 text-lg"></i>
            Mağazalar
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem >
          <Link href="/settings" className='flex items-center'>
            <i className='fa-solid fa-gears me-2 text-lg'></i>
            Ayarlar
          </Link>
        </DropdownMenuItem>

      </DropdownMenuContent>
    </DropdownMenu>
  </>)
}