"use client"

import { Participant,Track } from "livekit-client"
import { useEffect, useRef, useState} from "react"
import { useTracks } from "@livekit/components-react"
import { FullScreenControl } from "./fullscreen-control"
import { useEventListener } from "usehooks-ts"
import { VolumeControl } from "./volume-control"

interface LiveVideoProps {
    participant:Participant
}


export const LiveVideo = ({
    participant
}:LiveVideoProps) => {

    const videoRef = useRef<HTMLVideoElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const [isFullScreen,setIsFullScreen] = useState(false);
    const [volume,setVolume] = useState(0);

    
    const toggleFullScreen = async ()=> {
        if(isFullScreen){
            document.exitFullscreen()
        }else if(wrapperRef?.current){
            wrapperRef.current.requestFullscreen()
        }
    };

    const onVolumeChange = (value:number) => {
        setVolume(+value)
        if (videoRef?.current) {
            videoRef.current.muted = value === 0;
            videoRef.current.volume = +value * 0.01;
        }
    }

    const toggleMute = () => {
        const isMuted = volume === 0;
    
        setVolume(isMuted ? 50 : 0);
    
        if (videoRef?.current) {
          videoRef.current.muted = !isMuted;
          videoRef.current.volume = isMuted ? 0.5 : 0;
        }
    };

    useEffect(() => {
        onVolumeChange(0);
      }, []);

    const handleFullscreenChange = () => {
        const isCurrentlyFullscreen = document.fullscreenElement !== null;
        setIsFullScreen(isCurrentlyFullscreen);
    };
    
    useEventListener("fullscreenchange", handleFullscreenChange, wrapperRef);

    useTracks([Track.Source.Camera, Track.Source.Microphone])
    .filter((track)=> track.participant.identity === participant.identity)
    .forEach((track)=> {
        if(videoRef.current){
            track.publication.track?.attach(videoRef.current)
        }
    });


  return (
    <div 
        ref={wrapperRef}
        className="relative h-full flex"
    >
        <video width="100%" ref={videoRef} />
        <div className="absolute top-0 h-full w-full opacity-0 hover:opacity-100 hover:transition-all ">
            <div className="absolute bottom-0 flex h-14 w-full items-center justify-between bg-gradient-to-r from-neutral-900 px-4">
                <VolumeControl 
                    onChange={onVolumeChange}
                    onToggle={toggleMute}
                    value={volume}
                />
                <FullScreenControl 
                    isFullScreen={isFullScreen}
                    ontoggle={toggleFullScreen}
                 />
            </div>
        </div>
    </div>
  )
}