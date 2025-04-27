
import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Check, X, Play, ArrowLeft, Maximize } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useIsMobile } from "@/hooks/use-mobile";

interface VideoInvitationProps {
  videoUrl: string;
  onRsvpChoice: (attending: boolean) => void;
  eventName?: string;
}

const VideoInvitation: React.FC<VideoInvitationProps> = ({
  videoUrl,
  onRsvpChoice,
  eventName = "האירוע שלנו",
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const backgroundVideoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

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
    setProgress(0);
    if (isFullscreen) {
      document.exitFullscreen().catch((err) => console.error(err));
      setIsFullscreen(false);
    }
  };

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch((err) => console.error(err));
      setIsFullscreen(false);
    }
  };

  const handleBackToInvitation = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
      setProgress(0);
    }
  };

  const updateProgress = () => {
    if (videoRef.current) {
      const percentage = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(percentage);
    }
  };

  return (
    <div className="w-full flex justify-center animate-fade-in">
      <div 
        ref={containerRef}
        className={cn(
          "relative overflow-hidden bg-black",
          "w-[1080px] h-screen",
          "max-h-[100dvh]",
          "aspect-[9/16]",
          isPlaying ? "z-10 rounded-xl" : "rounded-xl",
          "mx-4",
        )}
      >
        {!isPlaying && (
          <video
            ref={backgroundVideoRef}
            src={videoUrl}
            className="absolute inset-0 w-full h-full object-cover opacity-50 blur-md rounded-xl"
            playsInline
            muted
            loop
            autoPlay
            poster="/placeholder.svg"
          />
        )}

        {!isPlaying && (
          <div
            className="relative z-10 h-full flex flex-col items-center justify-between p-8"
            style={{ direction: "rtl" }}
          >
            <div className="text-center text-white mt-12 mb-6 w-full">
              <h1 className="text-2xl font-bold mb-2 text-shadow-md">ברוכים הבאים לחגיגה של {eventName}!</h1>
              <p className="text-lg text-shadow-sm">צפו בהזמנה ואשרו את הגעתכם</p>
            </div>

            <div className="flex-grow flex flex-col justify-center items-center w-full">
              <Button 
                className="invitation-button flex items-center gap-2 text-xl py-5 px-8 w-3/4 justify-center mb-8 shadow-lg rounded-full"
                onClick={handlePlayVideo}
                variant="ghost"
              >
                <Play className="h-6 w-6" />
                צפה בהזמנה
              </Button>
            </div>

            <div className="flex gap-4 w-full justify-center mb-8">
              <Button
                onClick={() => onRsvpChoice(true)}
                className="invitation-button flex items-center gap-2 text-base py-4 px-6 w-[45%] justify-center shadow-lg rounded-full"
                variant="ghost"
              >
                <Check className="h-5 w-5" />
                אני מגיע/ה
              </Button>
              <Button
                onClick={() => onRsvpChoice(false)}
                className="invitation-button-outline flex items-center gap-2 text-base py-4 px-6 w-[45%] justify-center shadow-lg rounded-full"
                variant="ghost"
              >
                <X className="h-5 w-5" />
                לא אוכל להגיע
              </Button>
            </div>
          </div>
        )}

        {isPlaying && (
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
                size="icon"
                className="rounded-full bg-black bg-opacity-50 text-white border-none"
                onClick={handleBackToInvitation}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              
              <Button 
                variant="outline" 
                size="icon"
                className="rounded-full bg-black bg-opacity-50 text-white border-none"
                onClick={toggleFullscreen}
              >
                <Maximize className="h-5 w-5" />
              </Button>
            </div>
          </>
        )}

        <video
          ref={videoRef}
          src={videoUrl}
          className={cn(
            "w-full h-full object-contain bg-black",
            isPlaying ? "block rounded-xl p-2" : "hidden",
          )}
          controls={false}
          onEnded={handleVideoEnd}
          onTimeUpdate={updateProgress}
          playsInline
          poster="/placeholder.svg"
        />
      </div>
    </div>
  );
};

export default VideoInvitation;
