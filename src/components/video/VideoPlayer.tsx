
import React from 'react';
import { Button } from "@/components/ui/button";
import { Maximize } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface VideoPlayerProps {
  videoUrl: string;
  isPlaying: boolean;
  progress: number;
  videoRef: React.RefObject<HTMLVideoElement>;
  onToggleFullscreen: () => void;
  onVideoEnd: () => void;
  onTimeUpdate: () => void;
}

export const VideoPlayer = ({
  videoUrl,
  isPlaying,
  progress,
  videoRef,
  onToggleFullscreen,
  onVideoEnd,
  onTimeUpdate,
}: VideoPlayerProps) => {
  return (
    <>
      <div className="absolute top-0 left-0 w-full z-20">
        <Progress 
          value={progress} 
          className="h-1.5 rounded-none bg-gray-500/30" 
          indicatorClassName="bg-white transition-all duration-200 ease-linear"
        />
      </div>
      
      <div className="absolute top-4 left-4 z-20 flex gap-4">
        <Button
          variant="outline"
          className="rounded-full bg-black/50 text-white border-none text-xs px-4"
        >
          עדכן הגעה
        </Button>
        
        <Button 
          variant="outline" 
          size="icon"
          className="rounded-full bg-black/50 text-white border-none"
          onClick={onToggleFullscreen}
        >
          <Maximize className="h-5 w-5" />
        </Button>
      </div>

      <video
        ref={videoRef}
        src={videoUrl}
        className={cn(
          "w-full h-full object-contain bg-black",
          isPlaying ? "block rounded-xl p-2" : "hidden",
        )}
        controls={false}
        onEnded={onVideoEnd}
        onTimeUpdate={onTimeUpdate}
        playsInline
        poster="/placeholder.svg"
      />
    </>
  );
};
