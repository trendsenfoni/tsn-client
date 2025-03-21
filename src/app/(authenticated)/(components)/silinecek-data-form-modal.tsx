import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogPortal
} from "@/components/ui/dialog"
import { ReactNode } from 'react'
import { DataForm } from '../../../components/ui216/data-form'

interface Props {
  id: string
  apiPath?: string
  trigger?: ReactNode
  headerTitle?: ReactNode
  headerDescription?: ReactNode
  onDataForm?: (e: any, setData: (a: any) => void) => ReactNode
}
export function DataFormModal({
  id, apiPath = '', trigger, headerTitle, headerDescription, onDataForm
}: Props) {
  return (
    <Dialog modal={false} >
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="w-[800px] sm:ma11x-w-[425px]">
        <DialogHeader>
          <DialogTitle>{headerTitle}</DialogTitle>
          <DialogDescription>{headerDescription}</DialogDescription>
        </DialogHeader>
        <DataForm apiPath={apiPath} isPopup={true} id={id} onDataForm={onDataForm} />
        <DialogFooter>
          <DialogClose>kapat</DialogClose>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
