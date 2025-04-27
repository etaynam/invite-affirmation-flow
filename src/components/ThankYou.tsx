
import React from "react";
import { Button } from "@/components/ui/button";
import { Check, X, Calendar, CalendarPlus, MapPin, CreditCard, Bitcoin, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ThankYouProps {
  attending: boolean;
  guestCount?: number;
  onEdit: () => void;
  eventName: string;
  wazeLink?: string;
  payboxLink?: string;
  bitLink?: string;
  calendarLink?: string;
  videoUrl?: string;
}

const ThankYou: React.FC<ThankYouProps> = ({
  attending,
  guestCount,
  onEdit,
  eventName,
  wazeLink,
  payboxLink,
  bitLink,
  calendarLink,
  videoUrl,
}) => {
  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-sm p-6 my-6 animate-fade-in" style={{ direction: "rtl" }}>
      <div className="flex justify-center mb-4">
        {attending ? (
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
            <Check className="h-8 w-8 text-green-600" />
          </div>
        ) : (
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
            <X className="h-8 w-8 text-red-600" />
          </div>
        )}
      </div>

      <h2 className="text-xl font-bold text-center mb-4">
        {attending ? "תודה על האישור!" : "תודה על העדכון"}
      </h2>

      {attending && guestCount && (
        <p className="text-center text-gray-700 mb-6">
          אישרת הגעה עבור {guestCount} {guestCount === 1 ? "אורח" : "אורחים"}
        </p>
      )}

      {!attending && (
        <p className="text-center text-gray-700 mb-6">
          אנו מצטערים שלא תוכלו להצטרף אלינו
        </p>
      )}

      <Button 
        variant="outline" 
        onClick={onEdit} 
        className="w-full mb-6 invitation-button-outline text-black hover:text-black flex items-center justify-center gap-2"
      >
        התחרטתם? עדכנו את ההגעה שלכם
        <ArrowRight className="h-4 w-4" />
      </Button>

      {attending && (
        <>
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h3 className="font-medium mb-2">אפשרויות נוספות:</h3>
            <div className="grid grid-cols-2 gap-3">
              {calendarLink && (
                <Button 
                  variant="outline" 
                  className="flex items-center justify-center gap-2"
                  onClick={() => window.open(calendarLink, "_blank")}
                >
                  <CalendarPlus className="h-4 w-4" />
                  הוסף ליומן
                </Button>
              )}
              
              {wazeLink && (
                <Button 
                  variant="outline"
                  className="flex items-center justify-center gap-2"
                  onClick={() => window.open(wazeLink, "_blank")}
                >
                  <MapPin className="h-4 w-4" />
                  נווט ב-Waze
                </Button>
              )}
              
              {videoUrl && (
                <Button 
                  variant="outline"
                  className="flex items-center justify-center gap-2 col-span-2"
                  onClick={() => window.open(videoUrl, "_blank")}
                >
                  צפייה חוזרת בהזמנה
                </Button>
              )}
            </div>
          </div>

          <div className="bg-invitation-accent bg-opacity-5 p-4 rounded-lg">
            <h3 className="font-medium mb-3">רוצים לשלוח מתנה?</h3>
            <div className="grid grid-cols-2 gap-3">
              {bitLink && (
                <Button
                  className="invitation-button flex items-center justify-center gap-2"
                  onClick={() => window.open(bitLink, "_blank")}
                >
                  <Bitcoin className="h-4 w-4" />
                  שלח Bit
                </Button>
              )}
              
              {payboxLink && (
                <Button
                  className="invitation-button flex items-center justify-center gap-2"
                  onClick={() => window.open(payboxLink, "_blank")}
                >
                  <CreditCard className="h-4 w-4" />
                  שלח PayBox
                </Button>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ThankYou;
