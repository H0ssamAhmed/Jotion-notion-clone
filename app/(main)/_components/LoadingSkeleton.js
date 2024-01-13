import React from 'react'
import { Skeleton } from '../../../components/ui/skeleton'

const LoadingSkeleton = () => {
    return (
        <div className="w-full flex flex-col items-start justify-center ">
            <Skeleton className="w-[80%] h-4" />
            <Skeleton className="w-[60%] h-4" />
            <Skeleton className="w-[70%] h-4" />
            <Skeleton className="w-[40%] h-4" />
        </div>
    )
}

export default LoadingSkeleton