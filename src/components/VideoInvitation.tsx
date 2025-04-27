
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
    // Auto-play the background video silently when component mounts
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
    <div className="w-full max-w-md mx-auto relative animate-fade-in">
      <div
        className={cn(
          "relative overflow-hidden rounded-xl shadow-lg bg-black",
          isPlaying ? "z-10" : ""
        )}
      >
        {/* Background video that plays silently and automatically */}
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
            className="relative z-10 h-[480px] flex flex-col items-center justify-center p-4 gap-4 backdrop-blur-sm bg-black/30"
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

        {/* Main video that plays when user clicks "צפה בהזמנה" */}
        <video
          ref={videoRef}
          src={videoUrl}
          className={cn(
            "w-full h-auto",
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
