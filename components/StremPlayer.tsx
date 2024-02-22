"use client"

import { useViewerToken } from "@/hooks/use-viewer-token"
import { Stream, User } from "@prisma/client"

interface StremPlayerProps {
    user:User,
    stream:Stream,
    isFollowing:boolean,
}
export const StremPlayer = ({
    user,
    stream,
}:StremPlayerProps) => {

    const {
      identity,
      name,
      token,
    } = useViewerToken(user.id)

    if(!token || !name || !identity){
      return (
        <div className="">
          Cannot watch the stream
        </div>
      )
    }

  return (
    <div className="">
      Allowed to watch the stream
    </div>
  )
}
