import React from "react";
import { Button } from "@/components/ui/button";
import EventDetails from "@/components/EventDetails";
import RsvpForm from "@/components/RsvpForm";
import { Check, X } from "lucide-react";

interface SimpleInvitationProps {
  eventName: string;
  eventDetails: {
    date: string;
    time: string;
    location: string;
    address: string;
    notes?: string;
    wazeLink?: string;
  };
  onRsvpSubmit: (data: { attending: boolean; guestCount: number }) => void;
  onPlayVideo: () => void;
  defaultAttending?: boolean;
}

const SimpleInvitation: React.FC<SimpleInvitationProps> = ({
  eventName,
  eventDetails,
  onRsvpSubmit,
  defaultAttending,
}) => {
  const scrollToForm = () => {
    const formSection = document.querySelector('section:nth-child(2)');
    formSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleRsvpClick = (attending: boolean) => {
    onRsvpSubmit({ attending, guestCount: 1 });
    scrollToForm();
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
          onEnded={scrollToForm}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-between p-8">
          <div /> {/* Empty div for spacing */}
          <div className="relative z-10 text-center mb-12">
            <p className="text-white text-lg font-medium mb-4">האם אתם מגיעים לאירוע?</p>
            <div className="flex gap-4 justify-center">
              <Button
                onClick={() => handleRsvpClick(true)}
                className="invitation-button flex items-center gap-2 text-base py-5 px-8"
              >
                <Check className="h-5 w-5" />
                מגיע/ה
              </Button>
              <Button
                onClick={() => handleRsvpClick(false)}
                className="invitation-button flex items-center gap-2 text-base py-5 px-8"
              >
                <X className="h-5 w-5" />
                לא מגיע/ה
              </Button>
            </div>
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

          <RsvpForm
            onSubmit={onRsvpSubmit}
            defaultAttending={defaultAttending}
          />
        </div>
      </section>
    </div>
  );
};

export default SimpleInvitation;
