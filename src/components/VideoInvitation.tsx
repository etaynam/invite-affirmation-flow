import React, { useState, useRef, useEffect } from "react";
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
  const backgroundVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (backgroundVideoRef.current) {
      backgroundVideoRef.current.play().catch(err => console.log("Auto-play prevented:", err));
    }
  }, []);

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
    <div className="w-full flex justify-center animate-fade-in">
      <div className={cn(
        "relative overflow-hidden bg-black",
        "w-[1080px] h-[1920px]", // Fixed dimensions for all screens
        "max-h-screen", // Prevent overflow on smaller screens
        "aspect-[9/16]", // Maintain aspect ratio
        isPlaying ? "z-10" : ""
      )}>
        <video
          ref={backgroundVideoRef}
          src={videoUrl}
          className="absolute inset-0 w-full h-full object-cover opacity-50 blur-sm"
          playsInline
          muted
          loop
          autoPlay
          poster="/placeholder.svg"
        />

        {!isPlaying && (
          <div
            className="relative z-10 h-full flex flex-col items-center justify-center p-4 gap-8 backdrop-blur-sm bg-black/30"
            style={{ direction: "rtl" }}
          >
            <Button 
              className="invitation-button flex items-center gap-2 text-lg"
              onClick={handlePlayVideo}
            >
              <Play className="h-5 w-5" />
              צפה בהזמנה
            </Button>
            
            <div className="flex gap-4 mt-4">
              <Button
                onClick={() => onRsvpChoice(true)}
                className="invitation-button flex items-center gap-2 text-lg"
              >
                <Check className="h-5 w-5" />
                אני מגיע/ה
              </Button>
              <Button
                onClick={() => onRsvpChoice(false)}
                className="invitation-button-outline flex items-center gap-2 text-lg"
                variant="outline"
              >
                <X className="h-5 w-5" />
                אני לא מגיע/ה
              </Button>
            </div>
          </div>
        )}

        <video
          ref={videoRef}
          src={videoUrl}
          className={cn(
            "w-full h-full object-contain",
            isPlaying ? "block" : "hidden"
          )}
          controls={isPlaying}
          onEnded={handleVideoEnd}
          playsInline
          poster="/placeholder.svg"
        />
      </div>
    </div>
  );
};

export default VideoInvitation;
