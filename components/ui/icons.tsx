'use client'

import { cn } from '@/lib/utils'

function IconLogo({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
      <svg
          viewBox="0 0 256 256"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          className={cn('h-4 w-4', className)}
          {...props}
      >
        {/* Base Shape - Speedometer circle */}
        <circle
            cx="128"
            cy="128"
            r="120"
            fill="none"
            stroke="currentColor"
            strokeWidth="12"
            className="text-primary-500"
        />

        {/* Speed Lines - Dynamic motion */}
        <g className="text-primary-400">
          <path
              d="M128 128 L208 48"
              stroke="currentColor"
              strokeWidth="16"
              strokeLinecap="round"
          />
          <circle
              cx="128"
              cy="128"
              r="12"
              fill="currentColor"
          />
        </g>

        {/* Speed Markers */}
        <g className="text-secondary-500">
          <circle cx="208" cy="48" r="8" fill="currentColor"/>
          <circle cx="48" cy="208" r="8" fill="currentColor"/>
          <circle cx="208" cy="208" r="8" fill="currentColor"/>
        </g>
      </svg>
  )
}

function SpeedIndicator({ className, speed = 'fast', ...props }: React.ComponentProps<'svg'> & {
  speed?: 'slow' | 'medium' | 'fast'
}) {
  const speedColors = {
    slow: 'text-speed-slow',
    medium: 'text-speed-medium',
    fast: 'text-speed-fast'
  }

  return (
      <svg
          viewBox="0 0 24 24"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          className={cn('h-4 w-4', speedColors[speed], className)}
          {...props}
      >
        <path
            d="M12 2C6.477 2 2 6.477 2 12c0 5.522 4.477 10 10 10s10-4.478 10-10c0-5.523-4.477-10-10-10zm0 2c4.418 0 8 3.582 8 8s-3.582 8-8 8-8-3.582-8-8 3.582-8 8-8zm3.707 5.293L11 14h2.5a.5.5 0 0 1 .4.8l-4 5a.5.5 0 0 1-.9-.3V15H7.5a.5.5 0 0 1-.4-.8l4-5a.5.5 0 0 1 .9.3V13h2.5a.5.5 0 0 1 .4.8l-1.193 1.492z"
            fill="currentColor"
        />
      </svg>
  )
}

function LoadingSpinner({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
      <svg
          viewBox="0 0 24 24"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          className={cn('h-4 w-4 animate-spin', className)}
          {...props}
      >
        <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
            className="opacity-25"
        />
        <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
  )
}

export { IconLogo, SpeedIndicator, LoadingSpinner }