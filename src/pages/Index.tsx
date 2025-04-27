
import React, { useEffect, useState } from "react";
import VideoInvitation from "@/components/VideoInvitation";
import EventDetails from "@/components/EventDetails";
import RsvpForm from "@/components/RsvpForm";
import ThankYou from "@/components/ThankYou";
import Footer from "@/components/Footer";
import { toast } from "sonner";

const DEFAULT_VIDEO_URL = "https://cdn.mabrouk.io/inv/1744995518275.mp4";

// Set this to false to disable local storage caching temporarily
const ENABLE_CACHE = false;

const Index = () => {
  const [step, setStep] = useState<"video" | "form" | "thank-you">("video");
  const [attending, setAttending] = useState<boolean | null>(null);
  const [guestCount, setGuestCount] = useState<number>(1);
  
  useEffect(() => {
    if (ENABLE_CACHE) {
      const cachedResponse = localStorage.getItem('rsvpResponse');
      if (cachedResponse) {
        const { attending: cachedAttending, guestCount: cachedGuestCount } = JSON.parse(cachedResponse);
        setAttending(cachedAttending);
        setGuestCount(cachedGuestCount);
        setStep('thank-you');
      }
    }
  }, []);

  const eventDetails = {
    eventName: "חתונה של דניאל ויעל",
    date: "25.05.2025",
    time: "19:00",
    location: "אולמי הגן",
    address: "רחוב הפרחים 12, תל אביב",
    notes: "חניה זמינה במתחם. נא לאשר הגעה עד לתאריך 01.05.2025",
    wazeLink: "https://waze.com/ul?ll=32.0853,34.7818&navigate=yes",
    payboxLink: "https://payboxapp.page.link/example",
    bitLink: "https://bit.page.link/example",
    calendarLink: "https://calendar.google.com/calendar/event?action=TEMPLATE&text=חתונה של דניאל ויעל",
    accentColor: "#FF0000", // Default accent color
  };
  
  useEffect(() => {
    document.documentElement.dir = "rtl";
    
    document.documentElement.style.setProperty(
      "--invitation-accent-color", 
      eventDetails.accentColor
    );

    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set('forceHideBadge', 'true');
    const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
    window.history.replaceState(null, '', newUrl);
  }, []);

  const handleRsvpChoice = (choice: boolean) => {
    setAttending(choice);
    setStep("form");
  };

  const handleFormSubmit = (data: { attending: boolean; guestCount: number }) => {
    setAttending(data.attending);
    setGuestCount(data.guestCount);
    
    if (ENABLE_CACHE) {
      localStorage.setItem('rsvpResponse', JSON.stringify({
        attending: data.attending,
        guestCount: data.guestCount
      }));
    }
    
    toast.success("תודה על האישור!");
    setStep("thank-you");
  };

  const handleEditRsvp = () => {
    setStep("form");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-grow container max-w-md mx-auto px-4 py-8">
        {step === "video" && (
          <VideoInvitation
            videoUrl={DEFAULT_VIDEO_URL}
            onRsvpChoice={handleRsvpChoice}
            eventName={eventDetails.eventName}
          />
        )}

        {step === "form" && (
          <>
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold">{eventDetails.eventName}</h1>
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
              onSubmit={handleFormSubmit}
              defaultAttending={attending !== null ? attending : undefined}
            />
          </>
        )}

        {step === "thank-you" && attending !== null && (
          <>
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold">{eventDetails.eventName}</h1>
            </div>
            <EventDetails
              date={eventDetails.date}
              time={eventDetails.time}
              location={eventDetails.location}
              address={eventDetails.address}
              notes={eventDetails.notes}
              wazeLink={eventDetails.wazeLink}
            />
            <ThankYou
              attending={attending}
              guestCount={guestCount}
              onEdit={handleEditRsvp}
              eventName={eventDetails.eventName}
              wazeLink={eventDetails.wazeLink}
              payboxLink={eventDetails.payboxLink}
              bitLink={eventDetails.bitLink}
              calendarLink={eventDetails.calendarLink}
              videoUrl={DEFAULT_VIDEO_URL}
            />
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Index;
