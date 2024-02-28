"use client"

import { useState } from "react"

import { cn } from "@/lib/utils"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Skeleton } from "../ui/skeleton"
import { ChatInfo } from "./ChatInfo"


interface ChatFormProps {
    onSubmit:()=>void;
    value:string;
    onChange:(value:string)=>void;
    isHidden:boolean;
    isFollowersOnly:boolean;
    isDelayed:boolean;
    isFollowing:boolean;
};

export const ChatForm = ({
    isDelayed,
    isFollowersOnly,
    isFollowing,
    isHidden,
    onChange,
    onSubmit,
    value
}:ChatFormProps) => {

    const [isDelayBlocked, setIsDelayBlocked] = useState(false);

    const isFollowersOnlyAndNotFollowing = isFollowersOnly && !isFollowing;

    const isDisabled = isHidden || isDelayBlocked || isFollowersOnlyAndNotFollowing;
  
    const handleSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        e.stopPropagation();

        if(!value || isDisabled) return;

        if(isDelayed && !isDelayBlocked){
            setIsDelayBlocked(true)
            setTimeout(()=>{
                setIsDelayBlocked(false)
                onSubmit()
            },3000)
        } else {
            onSubmit()
        };

        if(isHidden){
            return null
        };
    };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="flex flex-col items-center gap-y-4 p-3"
    >
      <div className="w-full">
        <ChatInfo 
            isDelayed={isDelayed}
            isFollowersOnly={isFollowersOnly}
        />
        <Input
          onChange={(e) => onChange(e.target.value)}
          value={value}
          placeholder="Send a message"
          disabled={isDisabled}
          className={cn(
            "border-white/10",
            (isFollowersOnly || isDelayed) && "rounded-t-none border-t-0"
          )}
        />
      </div>
      <div className="ml-auto">
        <Button
          type="submit"
          variant="primary"
          size="sm"
          disabled={isDisabled}
        >
          Chat
        </Button>
      </div>
    </form>
  )
};


export const ChatFormSkeleton = () => {
    return (
      <div className="flex flex-col items-center gap-y-4 p-3">
        <Skeleton className="w-full h-10" />
        <div className="flex items-center gap-x-2 ml-auto">
          <Skeleton className="h-7 w-7" />
          <Skeleton className="h-7 w-12" />
        </div>
      </div>
    );
};
