
import React from 'react';
import { Button } from "@/components/ui/button";
import { Play, CalendarDays, Clock, MapPin } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface InvitationContentProps {
  eventName: string;
  date: string;
  time: string;
  location: string;
  onPlay: () => void;
  onRsvpChoice: (attending: boolean) => void;
}

export const InvitationContent = ({
  eventName,
  date,
  time,
  location,
  onPlay,
  onRsvpChoice,
}: InvitationContentProps) => {
  return (
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
          onClick={onPlay}
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
  );
};
