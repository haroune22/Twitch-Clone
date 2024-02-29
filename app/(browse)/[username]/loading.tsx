import { StreamPlayerSkeleton } from '@/components/stream-player'
import React from 'react'

export const UserLoading = () => {
  return (
    <div className='h-full'>
        <StreamPlayerSkeleton />
    </div>
  )
}
