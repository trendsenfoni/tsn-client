"use client"

import { ReactNode, useEffect, useState } from 'react'
import { ChevronsUpDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { usePathname } from 'next/navigation'

export function generateStorageKey(prefix: string, name?: string, pathName?: string) {
  let s = prefix
  if (name) s += '_' + name
  if (pathName?.substring(1)) s += '_' + pathName?.substring(1).replaceAll('/', '_')

  return s
}
interface Props {
  name?: string
  children?: any
  title?: string | ReactNode
  defaultOpen?: boolean
  className?: string
}
export function Panel({ name, children, title, defaultOpen = true, className }: Props) {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const pathName = usePathname()
  const storageKey = generateStorageKey('panel_open', name, pathName)
  useEffect(() => {
    if (typeof window != 'undefined') {
      if (localStorage.getItem(storageKey) == 'true') {
        setIsOpen(true)
      }
    }
  }, [])
  return (
    <Collapsible
      open={isOpen}
      onOpenChange={e => {
        setIsOpen(e)
        if (typeof window != 'undefined') {
          localStorage.setItem(storageKey, e ? 'true' : 'false')
        }
      }}
      className={`w-full space-y-0 ${className}`}
    >
      <div className="">
        <CollapsibleTrigger asChild>
          <div className='cursor-pointer flex items-center justify-between space-x-4 px-4 bg-secondary rounded-md'>
            {title &&
              <div>
                {typeof title == 'string' &&
                  <h4 className="text-sm font-semibold">{title}</h4>
                }
                {typeof title != 'string' &&
                  <>{title}</>
                }
              </div>
            }
            <Button variant="ghost" size="sm" className="w-9 p-0">
              <ChevronsUpDown className="h-4 w-4" />
              <span className="sr-only">Toggle</span>
            </Button>
          </div>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="w-full border border-dashed border-opacity-100 rounded-md p-2">
        {children}
      </CollapsibleContent>
    </Collapsible>
  )
}