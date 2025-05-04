
import React, { useEffect, useState } from "react";
import VideoInvitation from "@/components/VideoInvitation";
import SimpleInvitation from "@/components/SimpleInvitation";
import ExtendedInvitation from "@/components/ExtendedInvitation";
import EventDetails from "@/components/EventDetails";
import RsvpForm from "@/components/RsvpForm";
import ExtendedRsvpForm from "@/components/ExtendedRsvpForm";
import ThankYou from "@/components/ThankYou";
import ExtendedThankYou from "@/components/ExtendedThankYou";
import Footer from "@/components/Footer";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const DEFAULT_VIDEO_URL = "https://cdn.mabrouk.io/inv/1744995518275.mp4";

// Set this to true to enable local storage caching
const ENABLE_CACHE = false;

type ViewStyle = "video" | "simple" | "extended";

const Index = () => {
  const [step, setStep] = useState<"video" | "form" | "thank-you">("video");
  const [attending, setAttending] = useState<boolean | null>(null);
  const [guestCount, setGuestCount] = useState<number>(1);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [viewStyle, setViewStyle] = useState<ViewStyle>("video");
  
  useEffect(() => {
    if (ENABLE_CACHE) {
      const cachedResponse = localStorage.getItem('rsvpResponse');
      if (cachedResponse) {
        const { attending: cachedAttending, guestCount: cachedGuestCount, firstName: cachedFirstName, lastName: cachedLastName, phone: cachedPhone } = JSON.parse(cachedResponse);
        setAttending(cachedAttending);
        setGuestCount(cachedGuestCount);
        if (cachedFirstName) setFirstName(cachedFirstName);
        if (cachedLastName) setLastName(cachedLastName);
        if (cachedPhone) setPhone(cachedPhone);
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

  const handleFormSubmit = (data: { 
    attending: boolean; 
    guestCount: number;
    firstName?: string;
    lastName?: string;
    phone?: string;
  }) => {
    setAttending(data.attending);
    setGuestCount(data.guestCount);
    
    // Store extended data if available
    if (data.firstName) setFirstName(data.firstName);
    if (data.lastName) setLastName(data.lastName);
    if (data.phone) setPhone(data.phone);
    
    if (ENABLE_CACHE) {
      localStorage.setItem('rsvpResponse', JSON.stringify({
        attending: data.attending,
        guestCount: data.guestCount,
        firstName: data.firstName || firstName,
        lastName: data.lastName || lastName,
        phone: data.phone || phone
      }));
    }
    
    toast.success("תודה על האישור!");
    setStep("thank-you");
  };

  const handleEditRsvp = () => {
    setStep("form");
  };

  const handlePlayVideo = () => {
    setViewStyle("video");
    setStep("video");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Style Switcher - For Demo Only */}
      <div className="fixed top-4 left-4 z-50 bg-white rounded-lg shadow-lg p-2 flex gap-2">
        <Button
          variant={viewStyle === "video" ? "default" : "outline"}
          onClick={() => setViewStyle("video")}
          className="text-xs"
        >
          תצוגה 1
        </Button>
        <Button
          variant={viewStyle === "simple" ? "default" : "outline"}
          onClick={() => setViewStyle("simple")}
          className="text-xs"
        >
          תצוגה 2
        </Button>
        <Button
          variant={viewStyle === "extended" ? "default" : "outline"}
          onClick={() => setViewStyle("extended")}
          className="text-xs"
        >
          תצוגה 3
        </Button>
      </div>

      <main className="flex-grow container max-w-md mx-auto px-4 py-8">
        {viewStyle === "video" && step === "video" && (
          <VideoInvitation
            videoUrl={DEFAULT_VIDEO_URL}
            onRsvpChoice={handleRsvpChoice}
            eventName={eventDetails.eventName}
          />
        )}

        {viewStyle === "simple" && step === "video" && (
          <SimpleInvitation
            eventName={eventDetails.eventName}
            eventDetails={eventDetails}
            onRsvpSubmit={handleFormSubmit}
            onPlayVideo={handlePlayVideo}
          />
        )}
        
        {viewStyle === "extended" && step === "video" && (
          <ExtendedInvitation
            eventName={eventDetails.eventName}
            eventDetails={eventDetails}
            onRsvpSubmit={handleFormSubmit}
            onPlayVideo={handlePlayVideo}
          />
        )}

        {step === "form" && viewStyle !== "extended" && (
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
        
        {step === "form" && viewStyle === "extended" && (
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
            <ExtendedRsvpForm
              onSubmit={handleFormSubmit}
              defaultAttending={attending !== null ? attending : undefined}
            />
          </>
        )}

        {step === "thank-you" && attending !== null && viewStyle !== "extended" && (
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
        
        {step === "thank-you" && attending !== null && viewStyle === "extended" && (
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
            <ExtendedThankYou
              attending={attending}
              guestCount={guestCount}
              firstName={firstName}
              lastName={lastName}
              phone={phone}
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
