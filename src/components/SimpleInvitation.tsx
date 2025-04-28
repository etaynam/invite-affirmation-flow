
import React from "react";
import { Button } from "@/components/ui/button";
import EventDetails from "@/components/EventDetails";
import RsvpForm from "@/components/RsvpForm";
import { Play } from "lucide-react";

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
  onPlayVideo,
  defaultAttending,
}) => {
  return (
    <div className="w-full max-w-md mx-auto px-4 py-8 animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold">{eventName}</h1>
      </div>

      <Button
        onClick={onPlayVideo}
        variant="outline"
        className="w-full mb-6 py-6 text-base flex items-center justify-center gap-2 border-invitation-accent text-invitation-accent hover:bg-invitation-accent hover:text-white transition-colors"
      >
        <Play className="h-5 w-5" />
        צפייה בהזמנה המקורית
      </Button>

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
  );
};

export default SimpleInvitation;
