
import { useState, useRef, RefObject } from 'react';

interface UseVideoControlsProps {
  onVideoEnd?: () => void;
}

export const useVideoControls = ({ onVideoEnd }: UseVideoControlsProps = {}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

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
    onVideoEnd?.();
  };

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      videoRef.current?.parentElement?.requestFullscreen();
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

  return {
    isPlaying,
    isFullscreen,
    progress,
    videoRef,
    handlePlayVideo,
    handleVideoEnd,
    toggleFullscreen,
    handleBackToInvitation,
    updateProgress,
  };
};
