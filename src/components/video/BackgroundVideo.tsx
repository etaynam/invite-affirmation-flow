
import React, { useEffect, useRef } from 'react';

interface BackgroundVideoProps {
  videoUrl: string;
}

export const BackgroundVideo = ({ videoUrl }: BackgroundVideoProps) => {
  const backgroundVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (backgroundVideoRef.current) {
      backgroundVideoRef.current.play().catch(err => console.log("Auto-play prevented:", err));
    }
  }, []);

  return (
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
  );
};
