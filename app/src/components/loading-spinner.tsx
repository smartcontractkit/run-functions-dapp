import { cn } from '@/lib/utils'
import Image from 'next/image'

const LoadingSpinner = ({
  background,
  className,
}: {
  background?: string
  className?: string
}) => {
  return (
    <div
      className={cn(
        'relative mx-auto w-fit bg-[#181D29]',
        className,
        background,
      )}
    >
      <Image src="/loading.gif" width={48} height={48} alt="loading" />
      <div
        className={cn(
          'absolute bottom-0 left-0 h-1 w-4 bg-[#181D29]',
          background,
        )}
      />
    </div>
  )
}

export default LoadingSpinner
