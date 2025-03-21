import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { FormItem } from './FormItemType'
interface Props extends FormItem {
  min?: number
  max?: number

}
export function FormItemNumber({ formData = {}, field, setData, children, className, onChange, onBlur,
  min, max
}: Props) {
  return (<div className='flex flex-col gap-1 my-4'>
    <Label className='ms-2'>{children}</Label>
    <Input defaultValue={formData[field]}
      onBlur={e => {
        if (setData && formData[field] != e.target.value && !isNaN(Number(e.target.value))) {

          formData[field] = Number(e.target.value)
          setData(formData)
        }
        onBlur && onBlur(e)
      }}
      className={className}
      min={min}
      max={max}
    />
  </div>)
}