// filepath: /components/ui/skeleton.tsx
import { cn } from '@/lib/utils'

function Skeleton({
                    className,
                    ...props
                  }: React.HTMLAttributes<HTMLDivElement>) {
  return (
      <div
          className={cn(
              'relative rounded-md overflow-hidden',
              'bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5',
              'animate-racing-pulse',
              'after:absolute after:inset-0',
              'after:bg-gradient-to-r after:from-transparent after:via-primary/20 after:to-transparent',
              'after:animate-racing-lines',
              className
          )}
          {...props}
      />
  )
}

export { Skeleton }