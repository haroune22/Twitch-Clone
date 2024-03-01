"use client";


import { onBlock, onUnblock } from "@/actions/block";
import { onFollow, onUnfollow } from "@/actions/follow";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { toast } from "sonner";



interface ActionsProps {
    isFollowing:boolean,
    userId:string,
}

export const Actions = ({isFollowing,userId}:ActionsProps) => {

    const [isPending,startTransition] = useTransition();

    const handleFollow = ()=>{
        startTransition(()=> {
            onFollow(userId)
            .then((data)=>toast.success(`you are now following ${data.following.username}`))
            .catch(()=>toast.error('Somthing Went wrong'))
        })
    };

    const handleUnFollow = ()=>{
        startTransition(()=> {
            onUnfollow(userId)
            .then((data)=>toast.success(`you Unfollowed ${data.following.username}`))
            .catch(()=>toast.error('Somthing Went wrong'))
        })
    };

    const onClick = () => {
        if(isFollowing){
            handleUnFollow();
        }else{
            handleFollow();
        }
    };

    const handleBlock = () => {
        startTransition(()=> {
            onUnblock(userId)
            .then((data)=>toast.success(`you Blocked ${data.blocked.username}`))
            .catch(()=>toast.error('Somthing Went wrong'))
        })
    };

  return (
    <>
    <Button 
        disabled={isPending} 
        variant="primary" 
        onClick={onClick} 
    >
        {isFollowing ? "UnFollow" : "Follow"}
    </Button>
    <Button 
        disabled={isPending}  
        onClick={handleBlock} 
    >
        UnBlock
    </Button>
    </>
  )
}

