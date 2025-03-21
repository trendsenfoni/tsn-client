import { CheckIcon, XIcon } from 'lucide-react'
import { Button } from './ui/button'

interface ButtonProps {
  className?: string
  onClick?: () => void
}
export function ButtonOK({ className, onClick }: ButtonProps) {
  return (
    <Button
      className={`bg-blue-600 text-white hover:bg-blue-800 hover:text-white px-2 ${className}`}
      variant={'outline'}
      size={'sm'}
      onClick={() => onClick && onClick()}
    >
      <CheckIcon size={'24px'} />
    </Button>
  )
}

export function ButtonCancel({ className, onClick }: ButtonProps) {
  return (
    <Button
      className={`bg-gray-600 text-white hover:bg-gray-800 hover:text-white px-2 ${className}`}
      variant={'outline'}
      size={'sm'}
      onClick={() => onClick && onClick()}
    >
      <XIcon size={'24px'} />
    </Button>
  )
}