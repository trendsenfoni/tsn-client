import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  title?: string
}
export function TsnInput(props: Props) {
  return (<div className={`flex flex-col gap-1 my-4 ${props.className}`} >
    <Label className='ms-2'>{props.title}</Label>
    <Input {...props} className='' />
  </div>)
}