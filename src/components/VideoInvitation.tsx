
import React from "react";
import { cn } from "@/lib/utils";
import { useVideoControls } from "@/hooks/useVideoControls";
import { BackgroundVideo } from "./video/BackgroundVideo";
import { InvitationContent } from "./video/InvitationContent";
import { VideoPlayer } from "./video/VideoPlayer";
import { Check, X } from "lucide-react";

interface VideoInvitationProps {
  videoUrl: string;
  onRsvpChoice: (attending: boolean) => void;
  eventName?: string;
  date?: string;
  time?: string;
  location?: string;
}

const VideoInvitation: React.FC<VideoInvitationProps> = ({
  videoUrl,
  onRsvpChoice,
  eventName = "האירוע שלנו",
  date = "25.05.2025",
  time = "19:00",
  location = "אולמי הגן, תל אביב",
}) => {
  const {
    isPlaying,
    isFullscreen,
    progress,
    videoRef,
    handlePlayVideo,
    handleVideoEnd,
    toggleFullscreen,
    updateProgress,
  } = useVideoControls();

  return (
    <div className="w-full flex justify-center animate-fade-in h-[100dvh]">
      <div 
        className={cn(
          "relative overflow-hidden bg-black",
          "w-[1080px] h-full max-h-[100dvh]",
          "aspect-[9/16]",
          isPlaying ? "z-10 rounded-xl" : "rounded-xl",
          "mx-4",
        )}
      >
        {!isPlaying && (
          <BackgroundVideo videoUrl={videoUrl} />
        )}

        {!isPlaying && (
          <InvitationContent
            eventName={eventName}
            date={date}
            time={time}
            location={location}
            onPlay={handlePlayVideo}
            onRsvpChoice={onRsvpChoice}
          />
        )}

        {isPlaying && (
          <VideoPlayer
            videoUrl={videoUrl}
            isPlaying={isPlaying}
            progress={progress}
            videoRef={videoRef}
            onToggleFullscreen={toggleFullscreen}
            onVideoEnd={handleVideoEnd}
            onTimeUpdate={updateProgress}
          />
        )}
      </div>
    </div>
  );
};

export default VideoInvitation;
