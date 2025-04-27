
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface EventDetailsProps {
  date: string;
  time: string;
  location: string;
  address: string;
  notes?: string;
  wazeLink?: string;
}

const EventDetails: React.FC<EventDetailsProps> = ({
  date,
  time,
  location,
  address,
  notes,
  wazeLink,
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-sm p-4 my-6 animate-fade-in" style={{ direction: "rtl" }}>
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">פרטי האירוע</h2>
        <Button
          variant="ghost"
          size="sm"
          className="text-invitation-accent"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </Button>
      </div>

      <div className="flex items-center gap-2 mt-4">
        <Calendar className="h-5 w-5 text-invitation-accent flex-shrink-0" />
        <div>
          <p className="font-medium">{date}</p>
          <p className="text-sm text-gray-600">{time}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 mt-4">
        <MapPin className="h-5 w-5 text-invitation-accent flex-shrink-0" />
        <div>
          <p className="font-medium">{location}</p>
          <p className="text-sm text-gray-600">{address}</p>
        </div>
      </div>

      <div
        className={cn(
          "overflow-hidden transition-all",
          expanded ? "max-h-96 mt-4" : "max-h-0"
        )}
      >
        {notes && <p className="text-sm text-gray-700 mt-2">{notes}</p>}

        {wazeLink && (
          <Button
            className="invitation-button mt-4 w-full"
            onClick={() => window.open(wazeLink, "_blank")}
          >
            <MapPin className="h-4 w-4 mr-2" />
            פתח ב-Waze
          </Button>
        )}
      </div>
    </div>
  );
};

export default EventDetails;
