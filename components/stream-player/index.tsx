"use client"

import { useViewerToken } from "@/hooks/use-viewer-token"
import { Stream, User } from "@prisma/client"
import { LiveKitRoom } from "@livekit/components-react"
import { Video } from "./Video"



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
    <>
      <LiveKitRoom
        token={token}
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WS_URL!}
        className="grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-full "
      >
        <div className="space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-5 lg:overflow-y-auto hidden-scrollbar pb-10 ">
          <Video 
            hostName={user.username}
            hostIdentity={user.id}
          />
        </div>
      </LiveKitRoom>
    </>
  )
}
