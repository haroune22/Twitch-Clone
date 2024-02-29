import { isFollowingUser } from '@/lib/follow-service'
import { getUserByUsername } from '@/lib/user-service'
import { notFound } from 'next/navigation'
import React from 'react'
import { Actions } from './_components/actions'
import { isBlockedByUser } from '@/lib/block-service'
import { StraemPlayer } from '@/components/stream-player'


interface UserPageProps {
    params:{
        username:string,
    }
} 

const UserPage = async ({params}:UserPageProps) => {
    
  const user = await getUserByUsername(params.username);

  if(!user || !user.stream){
     notFound()
  }

  const isFollowing = await isFollowingUser(user.id);
  const isBlocked = await isBlockedByUser(user.id);

  if(isBlocked){
    notFound()
  }


  return (
    <>
      <StraemPlayer 
        user={user}
        stream={user.stream}
        isFollowing={isFollowing}
      />
    </>
  )
}

export default UserPage