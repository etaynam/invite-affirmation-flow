
import React, { useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Check, X, Play } from "lucide-react";

interface VideoInvitationProps {
  videoUrl: string;
  onRsvpChoice: (attending: boolean) => void;
}

const VideoInvitation: React.FC<VideoInvitationProps> = ({
  videoUrl,
  onRsvpChoice,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayVideo = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
    if (isFullscreen) {
      document.exitFullscreen().catch((err) => console.error(err));
      setIsFullscreen(false);
    }
  };

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      videoRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch((err) => console.error(err));
      setIsFullscreen(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto relative animate-fade-in">
      <div
        className={cn(
          "relative overflow-hidden rounded-xl shadow-lg bg-black",
          isPlaying ? "z-10" : ""
        )}
      >
        <video
          ref={videoRef}
          src={videoUrl}
          className="w-full h-auto"
          controls={isPlaying}
          onEnded={handleVideoEnd}
          playsInline
          poster="/placeholder.svg"
        />

        {!isPlaying && (
          <div
            className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center p-4 gap-4"
            style={{ direction: "rtl" }}
          >
            <Button 
              className="invitation-button flex items-center gap-2"
              onClick={handlePlayVideo}
            >
              <Play className="h-4 w-4" />
              צפה בהזמנה
            </Button>
            
            <div className="flex gap-3 mt-4">
              <Button
                onClick={() => onRsvpChoice(true)}
                className="invitation-button flex items-center gap-2"
              >
                <Check className="h-4 w-4" />
                אני מגיע/ה
              </Button>
              <Button
                onClick={() => onRsvpChoice(false)}
                className="invitation-button-outline flex items-center gap-2"
                variant="outline"
              >
                <X className="h-4 w-4" />
                אני לא מגיע/ה
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoInvitation;
