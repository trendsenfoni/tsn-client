import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { ReactNode } from 'react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import * as SelectPrimitive from "@radix-ui/react-select"

export interface TsnListType {
  _id?: string
  text?: string | ReactNode
}
export interface TsnSelectProps extends SelectPrimitive.SelectProps {
  title?: string
  all?: boolean
  list?: TsnListType[]
  onValueChange?: (e: string) => void
  className?: string
}
export function TsnSelect({ all, list, title, onValueChange, ...props }: TsnSelectProps) {
  return (<div className={`flex flex-col gap-1 my-4 ${props.className}`} >
    <Label className='ms-2'>{title}</Label>
    <Select
      onValueChange={onValueChange}
      {...props}
    >
      <SelectTrigger className="w-full">
        {!all && <SelectValue placeholder="---" />}
        {all && <SelectValue placeholder="*" />}
      </SelectTrigger>
      <SelectContent>
        {all &&
          <SelectGroup>
            <SelectItem value=" ">*</SelectItem>
          </SelectGroup>
        }
        <SelectGroup>
          {list && list.map((e, index) => (e._id && <SelectItem key={e._id} value={e._id}>{e.text}</SelectItem>))}
        </SelectGroup>
      </SelectContent>
    </Select>
  </div>)
}
