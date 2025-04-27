
import React, { useEffect, useState } from "react";
import VideoInvitation from "@/components/VideoInvitation";
import EventDetails from "@/components/EventDetails";
import RsvpForm from "@/components/RsvpForm";
import ThankYou from "@/components/ThankYou";
import Footer from "@/components/Footer";
import { toast } from "sonner";

// Set default video URL
const DEFAULT_VIDEO_URL = "https://cdn.mabrouk.io/inv/1744995518275.mp4";

const Index = () => {
  const [step, setStep] = useState<"video" | "form" | "thank-you">("video");
  const [attending, setAttending] = useState<boolean | null>(null);
  const [guestCount, setGuestCount] = useState<number>(1);
  
  // This would normally come from backend/API
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
    // Set the direction of the HTML element
    document.documentElement.dir = "rtl";
    
    // Set the accent color from eventDetails
    document.documentElement.style.setProperty(
      "--invitation-accent-color", 
      eventDetails.accentColor
    );
  }, []);

  const handleRsvpChoice = (choice: boolean) => {
    setAttending(choice);
    setStep("form");
  };

  const handleFormSubmit = (data: { attending: boolean; guestCount: number }) => {
    setAttending(data.attending);
    setGuestCount(data.guestCount);
    
    // Here you would typically send the data to an API
    // For now, we'll just show a success toast and move to thank-you
    toast.success("תודה על האישור!");
    setStep("thank-you");
  };

  const handleEditRsvp = () => {
    setStep("form");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-grow container max-w-md mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold">{eventDetails.eventName}</h1>
        </div>

        {step === "video" && (
          <VideoInvitation
            videoUrl={DEFAULT_VIDEO_URL}
            onRsvpChoice={handleRsvpChoice}
          />
        )}

        {step === "form" && (
          <>
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
