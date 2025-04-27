import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
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
        <RadioGroup
          value={attending ? "yes" : "no"}
          onValueChange={(value) => setAttending(value === "yes")}
          className="flex gap-4"
        >
          <div className="flex items-center space-x-2 space-x-reverse">
            <RadioGroupItem value="yes" id="yes" />
            <Label htmlFor="yes" className="flex items-center gap-1">
              <Check className="h-4 w-4 text-invitation-accent" />
              כן
            </Label>
          </div>
          <div className="flex items-center space-x-2 space-x-reverse">
            <RadioGroupItem value="no" id="no" />
            <Label htmlFor="no" className="flex items-center gap-1">
              <X className="h-4 w-4 text-gray-600" />
              לא
            </Label>
          </div>
        </RadioGroup>
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
        className="invitation-button w-full py-4 px-6"
      >
        אישור הגעה
      </Button>
    </form>
  );
};

export default RsvpForm;
