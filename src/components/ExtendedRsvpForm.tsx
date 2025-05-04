
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Check, X } from "lucide-react";

interface ExtendedRsvpFormProps {
  onSubmit: (data: { 
    attending: boolean; 
    guestCount: number;
    firstName: string;
    lastName: string;
    phone: string;
  }) => void;
  defaultAttending?: boolean;
}

const ExtendedRsvpForm: React.FC<ExtendedRsvpFormProps> = ({ 
  onSubmit,
  defaultAttending 
}) => {
  const [attending, setAttending] = useState<boolean>(defaultAttending !== undefined ? defaultAttending : true);
  const [guestCount, setGuestCount] = useState(1);
  const [customCount, setCustomCount] = useState("");
  const [showCustomCount, setShowCustomCount] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalGuestCount = showCustomCount ? parseInt(customCount, 10) || 0 : guestCount;
    onSubmit({ 
      attending, 
      guestCount: finalGuestCount,
      firstName,
      lastName,
      phone
    });
  };

  const guestOptions = [1, 2, 3, 4];

  return (
    <form 
      onSubmit={handleSubmit} 
      className="w-full max-w-md mx-auto bg-white rounded-xl shadow-sm p-6 my-6 animate-fade-in"
      style={{ direction: "rtl" }}
    >
      <h2 className="text-xl font-bold mb-6">אישור הגעה</h2>

      <div className="mb-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium mb-1">שם פרטי</label>
            <Input
              id="firstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="שם פרטי"
              required
              className="text-right"
            />
          </div>
          
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium mb-1">שם משפחה</label>
            <Input
              id="lastName"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="שם משפחה"
              required
              className="text-right"
            />
          </div>
          
          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-1">טלפון</label>
            <Input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="050-0000000"
              required
              className="text-right"
              dir="ltr"
            />
          </div>
        </div>
      </div>

      <div className="mb-6">
        <p className="mb-2 font-medium">האם תגיעו?</p>
        <div className="flex gap-4 w-full">
          <Button
            type="button"
            id="attend-yes"
            className={cn(
              "flex items-center gap-2 text-base py-5 px-8 w-[48%] justify-center rounded-xl transition-all",
              attending
                ? "bg-invitation-accent text-white hover:bg-invitation-accent/90"
                : "border border-invitation-accent text-black bg-white hover:bg-gray-100"
            )}
            onClick={() => setAttending(true)}
          >
            <Check className="h-5 w-5" />
            כן
          </Button>
          <Button
            type="button"
            id="attend-no"
            className={cn(
              "flex items-center gap-2 text-base py-5 px-8 w-[48%] justify-center rounded-xl transition-all",
              !attending
                ? "bg-invitation-accent text-white hover:bg-invitation-accent/90"
                : "border border-invitation-accent text-black bg-white hover:bg-gray-100"
            )}
            onClick={() => setAttending(false)}
          >
            <X className="h-5 w-5" />
            לא
          </Button>
        </div>
      </div>

      {attending && (
        <div className="mb-6">
          <p className="mb-2 font-medium">מספר אורחים:</p>
          <div className="flex flex-wrap gap-2">
            {guestOptions.map((count) => (
              <Button
                key={count}
                type="button"
                variant={guestCount === count && !showCustomCount ? "default" : "outline"}
                className={cn(
                  "rounded-full h-10 w-10 p-0",
                  guestCount === count && !showCustomCount ? "bg-invitation-accent hover:bg-invitation-accent" : ""
                )}
                onClick={() => {
                  setGuestCount(count);
                  setShowCustomCount(false);
                }}
              >
                {count}
              </Button>
            ))}
            <Button
              type="button"
              variant={showCustomCount ? "default" : "outline"}
              className={cn(
                "rounded-full px-4",
                showCustomCount ? "bg-invitation-accent hover:bg-invitation-accent" : ""
              )}
              onClick={() => setShowCustomCount(true)}
            >
              אחר
            </Button>
          </div>
          {showCustomCount && (
            <Input
              type="number"
              min="1"
              max="100"
              className="mt-2 text-right"
              value={customCount}
              onChange={(e) => setCustomCount(e.target.value)}
              placeholder="הכנס מספר אורחים"
            />
          )}
        </div>
      )}

      <Button 
        type="submit" 
        className={cn(
          "invitation-button w-full py-4 px-6 text-white hover:text-white hover:bg-invitation-accent/90",
          "bg-invitation-accent hover:border-invitation-accent"
        )}
      >
        אישור הגעה
      </Button>
    </form>
  );
};

export default ExtendedRsvpForm;
