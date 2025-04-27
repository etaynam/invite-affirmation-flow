
import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Check, X, Play, Maximize, CalendarDays, Clock, MapPin } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { useIsMobile } from "@/hooks/use-mobile";

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
    <div className="w-full flex justify-center animate-fade-in h-[100dvh]">
      <div 
        ref={containerRef}
        className={cn(
          "relative overflow-hidden bg-black",
          "w-[1080px] h-full max-h-[100dvh]",
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
            className="relative z-10 h-full flex flex-col items-center justify-between p-8 pb-12"
            style={{ direction: "rtl" }}
          >
            <div className="flex-grow flex flex-col items-center justify-center text-center text-white w-full">
              <h1 className="text-2xl font-bold text-shadow-md mb-0">
                הינכם מוזמנים לחתונה של
              </h1>
              <h2 className="text-3xl font-bold mt-1 mb-6 text-shadow-lg">
                {eventName}
              </h2>
              <Button 
                className="invitation-button flex items-center gap-2 text-xl py-5 px-8 w-3/4 justify-center shadow-lg rounded-full mb-2"
                onClick={handlePlayVideo}
                variant="ghost"
              >
                <Play className="h-6 w-6" />
                צפה בהזמנה
              </Button>
              <p className="text-base text-shadow-sm opacity-90 mb-4">
                צפו בהזמנה ואשרו את הגעתכם
              </p>

              <div className="flex flex-col gap-2 opacity-80 w-full">
                <div className="flex items-center justify-center gap-4 text-sm w-full">
                  <div className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4" />
                    <span>{date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{time}</span>
                  </div>
                </div>
                <div className="flex items-center justify-center w-full text-sm">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>{location}</span>
                </div>
              </div>
            </div>

            <div className="w-full space-y-4">
              <Separator className="bg-white/20 w-full" />
              <p className="text-white/80 text-sm text-center mb-2">
                נשמח לדעת אם תוכלו להגיע לשמוח איתנו
              </p>
              <div className="flex gap-4 w-full justify-center pb-4">
                <Button
                  onClick={() => onRsvpChoice(true)}
                  className="invitation-button flex items-center gap-2 text-base py-5 px-8 w-[45%] justify-center shadow-lg rounded-full"
                  variant="ghost"
                >
                  <Check className="h-5 w-5" />
                  אני מגיע/ה
                </Button>
                <Button
                  onClick={() => onRsvpChoice(false)}
                  className="invitation-button-outline flex items-center gap-2 text-base py-5 px-8 w-[45%] justify-center shadow-lg rounded-full"
                  variant="ghost"
                >
                  <X className="h-5 w-5" />
                  לא אוכל להגיע
                </Button>
              </div>
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
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="rounded-full bg-black/50 text-white border-none text-xs px-4 hover:bg-black/70"
                  onClick={() => onRsvpChoice(true)}
                >
                  <Check className="h-4 w-4 ml-2" />
                  אני מגיע/ה
                </Button>
                <Button
                  variant="outline"
                  className="rounded-full bg-black/50 text-white border-none text-xs px-4 hover:bg-black/70"
                  onClick={() => onRsvpChoice(false)}
                >
                  <X className="h-4 w-4 ml-2" />
                  לא אוכל להגיע
                </Button>
              </div>
              
              <Button 
                variant="outline" 
                size="icon"
                className="rounded-full bg-black/50 text-white border-none"
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
