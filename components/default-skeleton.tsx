// filepath: /components/default-skeleton.tsx
'use client'

import React from 'react'
import { Skeleton } from './ui/skeleton'

export const DefaultSkeleton = () => {
    return (
        <div className="flex flex-col gap-2 pb-4">
            {/* Title loading skeleton */}
            <div className="relative overflow-hidden rounded-md">
                <Skeleton className="h-6 w-48" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent animate-racing-lines" />
            </div>

            {/* Content loading skeleton */}
            <div className="relative overflow-hidden rounded-md">
                <Skeleton className="w-full h-6" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent animate-racing-lines" />
            </div>
        </div>
    )
}