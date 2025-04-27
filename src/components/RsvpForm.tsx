
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Check, X } from "lucide-react";

interface RsvpFormProps {
  onSubmit: (data: { attending: boolean; guestCount: number }) => void;
  defaultAttending?: boolean;
}

const RsvpForm: React.FC<RsvpFormProps> = ({ 
  onSubmit,
  defaultAttending 
}) => {
  const [attending, setAttending] = useState<boolean>(defaultAttending !== undefined ? defaultAttending : true);
  const [guestCount, setGuestCount] = useState(1);
  const [customCount, setCustomCount] = useState("");
  const [showCustomCount, setShowCustomCount] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalGuestCount = showCustomCount ? parseInt(customCount, 10) || 0 : guestCount;
    onSubmit({ attending, guestCount: finalGuestCount });
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
        <p className="mb-2 font-medium">האם תגיעו?</p>
        <div className="flex gap-4 w-full">
          <Button
            type="button"
            className={cn(
              "flex items-center gap-2 text-base py-5 px-8 w-[48%] justify-center rounded-xl transition-all",
              attending
                ? "bg-invitation-accent text-white hover:bg-invitation-accent/90"
                : "border border-invitation-accent text-invitation-accent hover:bg-white"
            )}
            onClick={() => setAttending(true)}
          >
            <Check className="h-5 w-5" />
            כן
          </Button>
          <Button
            type="button"
            className={cn(
              "flex items-center gap-2 text-base py-5 px-8 w-[48%] justify-center rounded-xl transition-all",
              !attending
                ? "bg-invitation-accent text-white hover:bg-invitation-accent/90"
                : "border border-invitation-accent text-invitation-accent hover:bg-white"
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

export default RsvpForm;
