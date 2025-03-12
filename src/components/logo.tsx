import Link from 'next/link'

export type IconProps = React.HTMLAttributes<SVGElement> & { width?: number, height?: number }

export const HeaderLogo2 = ({
  className,
}: { className?: string }) => {
  return (
    <div className={`flex flex-row text-xl items-center max-h-12 font-semibold  ${className}`}>
      <div className='bg-blue-800 text-white p-1 px-2 bord1er borde1r-gray-400 rounded-tl-sm rounded-bl-sm font-semibold'>
        Trend
      </div>
      <div className='bg-yellow-500 text-neutral-900 p-1 bord1er borde1r-gray-400 rounded-tr-sm rounded-br-sm font-semibold relative'>
        Senfoni
      </div>
    </div>
  )
}