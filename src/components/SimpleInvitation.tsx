
import React from "react";
import { Button } from "@/components/ui/button";
import EventDetails from "@/components/EventDetails";
import RsvpForm from "@/components/RsvpForm";
import { ArrowDown } from "lucide-react";

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
  return (
    <div className="h-[100dvh] snap-y snap-mandatory overflow-y-scroll">
      {/* Video Section */}
      <section className="relative h-[100dvh] w-full snap-start">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster="/placeholder.svg"
          src="https://cdn.mabrouk.io/inv/1744995518275.mp4"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-between p-8 text-white">
          <div /> {/* Empty div for spacing */}
          <div className="text-center mb-12">
            <p className="text-lg font-light mb-4">גלול למטה לאישור הגעה</p>
            <ArrowDown className="animate-bounce mx-auto h-8 w-8" />
          </div>
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
