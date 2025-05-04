
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import EventDetails from "@/components/EventDetails";
import ExtendedRsvpForm from "@/components/ExtendedRsvpForm";
import { Check, X, Play } from "lucide-react";

interface ExtendedInvitationProps {
  eventName: string;
  eventDetails: {
    date: string;
    time: string;
    location: string;
    address: string;
    notes?: string;
    wazeLink?: string;
  };
  onRsvpSubmit: (data: { 
    attending: boolean; 
    guestCount: number;
    firstName: string;
    lastName: string;
    phone: string;
  }) => void;
  onPlayVideo: () => void;
  defaultAttending?: boolean;
}

const ExtendedInvitation: React.FC<ExtendedInvitationProps> = ({
  eventName,
  eventDetails,
  onRsvpSubmit,
  defaultAttending,
}) => {
  const [videoEnded, setVideoEnded] = useState(false);

  const scrollToForm = () => {
    const formSection = document.querySelector('section:nth-child(2)');
    formSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleRsvpClick = (attending: boolean) => {
    scrollToForm();
  };

  const handlePlayVideo = () => {
    const video = document.querySelector('video');
    if (video) {
      video.currentTime = 0;
      video.play();
      setVideoEnded(false);
    }
  };

  return (
    <div className="h-[100dvh] snap-y snap-mandatory overflow-y-scroll">
      {/* Video Section */}
      <section className="relative h-[100dvh] w-full snap-start">
        <video
          autoPlay
          loop={false}
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster="/placeholder.svg"
          src="https://cdn.mabrouk.io/inv/1744995518275.mp4"
          onEnded={() => {
            setVideoEnded(true);
            scrollToForm();
          }}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-between p-8">
          <div /> {/* Empty div for spacing */}
          <div className="relative z-10 text-center mb-12 animate-pulse">
            {videoEnded ? (
              <Button
                onClick={handlePlayVideo}
                variant="ghost"
                className="invitation-button flex items-center gap-2 text-base py-5 px-8"
                style={{ background: 'rgba(0, 0, 0, 0.1)' }}
              >
                <Play className="h-5 w-5" />
                הפעל מחדש
              </Button>
            ) : (
              <>
                <p className="text-white text-lg font-medium mb-4">האם אתם מגיעים לאירוע?</p>
                <div className="flex gap-4 justify-center">
                  <Button
                    onClick={() => handleRsvpClick(true)}
                    variant="ghost"
                    className="invitation-button flex items-center gap-2 text-base py-5 px-8"
                    style={{ background: 'rgba(0, 0, 0, 0.1)' }}
                  >
                    <Check className="h-5 w-5" />
                    מגיע/ה
                  </Button>
                  <Button
                    onClick={() => handleRsvpClick(false)}
                    variant="ghost"
                    className="invitation-button flex items-center gap-2 text-base py-5 px-8"
                    style={{ background: 'rgba(0, 0, 0, 0.1)' }}
                  >
                    <X className="h-5 w-5" />
                    לא מגיע/ה
                  </Button>
                </div>
              </>
            )}
          </div>
          {/* Gradient overlay */}
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
      </section>

      {/* Form Section */}
      <section className="min-h-[100dvh] w-full snap-start bg-gray-50 px-4 py-8">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold">{eventName}</h1>
          </div>

          <EventDetails
            date={eventDetails.date}
            time={eventDetails.time}
            location={eventDetails.location}
            address={eventDetails.address}
            notes={eventDetails.notes}
            wazeLink={eventDetails.wazeLink}
          />

          <ExtendedRsvpForm
            onSubmit={onRsvpSubmit}
            defaultAttending={defaultAttending}
          />
        </div>
      </section>
    </div>
  );
};

export default ExtendedInvitation;
