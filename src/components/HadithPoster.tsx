import React from "react";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../components/ui/tooltip";
import { Info } from "lucide-react";

interface HadithPosterProps {
  hadithText?: string;
  source?: string;
  translator?: string;
  authenticity?: "sahih" | "zaeef";
  language?: string;
  title?: string;
  userLogo?: string;
  userLogoPosition?: { x: number; y: number };
}

const HadithPoster = ({
  hadithText = "The Messenger of Allah (ﷺ) said, 'The best of you are those who learn the Quran and teach it.'",
  source = "Sahih al-Bukhari 5027",
  translator = "Dr. Muhsin Khan",
  authenticity = "sahih",
  language = "english",
  title = "Chapter of Knowledge",
  userLogo = "",
  userLogoPosition = { x: 20, y: 20 },
}: HadithPosterProps) => {
  // Determine border color based on authenticity
  const borderColorClass =
    authenticity === "sahih" ? "border-green-500" : "border-red-500";

  return (
    <div className="w-full h-full bg-white p-4 hadith-poster-container">
      <Card
        className={`w-full h-full max-w-[600px] mx-auto relative overflow-hidden border-8 ${borderColorClass} bg-white shadow-lg p-8 flex flex-col`}
      >
        {/* Authenticity Badge */}
        <div className="absolute top-4 right-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge
                  variant={authenticity === "sahih" ? "default" : "destructive"}
                  className="capitalize"
                >
                  {authenticity}
                  <Info className="ml-1 h-3 w-3" />
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  {authenticity === "sahih"
                    ? "Authentic hadith"
                    : "Weak hadith"}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* User Logo (if provided) */}
        {userLogo && (
          <div
            className="absolute"
            style={{
              top: `${userLogoPosition.y}px`,
              left: `${userLogoPosition.x}px`,
              maxWidth: "80px",
              maxHeight: "80px",
            }}
          >
            <img src={userLogo} alt="User Logo" className="object-contain" />
          </div>
        )}

        {/* Main Hadith Content */}
        <div className="flex-grow flex flex-col justify-center items-center text-center space-y-6 my-8">
          {/* Hadith Title/Chapter */}
          <Badge variant="outline" className="mb-2">
            {title}
          </Badge>

          {/* Hadith Text */}
          <div
            className={`text-xl md:text-2xl font-serif ${language === "arabic" ? "font-arabic text-right" : ""}`}
          >
            {hadithText}
          </div>

          {/* Source Attribution */}
          <div className="text-sm text-gray-600 mt-4">
            <p className="font-medium">{source}</p>
          </div>
        </div>

        {/* Watermark */}
        <div className="absolute bottom-3 left-0 right-0 text-center text-xs text-gray-400">
          Nasihun.com
        </div>
      </Card>
    </div>
  );
};

export default HadithPoster;
