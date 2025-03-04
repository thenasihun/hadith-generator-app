import React, { useEffect, useState } from "react";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
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
  fontFamily?: string;
  fontColor?: string;
  backgroundColor?: string;
  showNarrator?: boolean;
  lineHeight?: number;
  hadith?: {
    urduNarrator?: string;
    englishNarrator?: string;
  };
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
  fontFamily = "serif",
  fontColor = "#000000",
  backgroundColor = "#ffffff",
  showNarrator = true,
  lineHeight = 1.5,
  hadith = { urduNarrator: "", englishNarrator: "" },
}: HadithPosterProps) => {
  // Always use black border
  const borderColorClass = "border-black";
  const [isMobile, setIsMobile] = useState(false);
  const [posterHeight, setPosterHeight] = useState("");

  // Check if mobile on mount and window resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Calculate height based on content length
  useEffect(() => {
    const calculateHeight = () => {
      const textLength = hadithText.length;
      let baseHeight;

      if (isMobile) {
        // Mobile base heights
        if (textLength < 100) {
          baseHeight = 300;
        } else if (textLength < 300) {
          baseHeight = 320;
        } else if (textLength < 500) {
          baseHeight = 400;
        } else {
          baseHeight = 480;
        }
      } else {
        // Desktop base heights
        if (textLength < 100) {
          baseHeight = 400;
        } else if (textLength < 300) {
          baseHeight = 500;
        } else if (textLength < 500) {
          baseHeight = 600;
        } else {
          baseHeight = 700;
        }
      }

      // Add extra height for very long content
      const extraHeight = Math.max(0, textLength - 500) / 10;
      const totalHeight = baseHeight + extraHeight;

      setPosterHeight(`${totalHeight}px`);
    };

    calculateHeight();
  }, [hadithText, isMobile]);

  // Default values for customization
  const fontSize = language === "arabic" ? 24 : 20;

  // Calculate optimal dimensions based on content length and device
  const getOptimalDimensions = (text: string) => {
    const textLength = text.length;

    if (isMobile) {
      // Smaller dimensions for mobile
      if (textLength < 100) {
        return { width: "300px", aspectRatio: "1/1" };
      } else if (textLength < 300) {
        return { width: "320px", aspectRatio: "1/1" };
      } else if (textLength < 500) {
        return { width: "320px", aspectRatio: "4/5" };
      } else {
        return { width: "320px", aspectRatio: "2/3" };
      }
    } else {
      // Desktop dimensions
      if (textLength < 100) {
        return { width: "400px", aspectRatio: "1/1" };
      } else if (textLength < 300) {
        return { width: "500px", aspectRatio: "1/1" };
      } else if (textLength < 500) {
        return { width: "500px", aspectRatio: "5/6" };
      } else {
        return { width: "500px", aspectRatio: "5/7" };
      }
    }
  };

  // Adjust text size based on content length
  const getAdjustedFontSize = (text: string) => {
    const textLength = text.length;
    let baseFontSize = language === "arabic" ? 24 : 20;

    if (isMobile) {
      baseFontSize -= 2; // Smaller base font on mobile
    }

    // Reduce font size for longer texts
    if (textLength > 500) {
      return baseFontSize - 2;
    } else if (textLength > 300) {
      return baseFontSize - 1;
    }

    return baseFontSize;
  };

  // Get localized title based on language
  const getLocalizedTitle = () => {
    // If the title is already in the correct language, return it as is
    if (language === "arabic" && /[\u0600-\u06FF]/.test(title)) {
      return title;
    } else if (language === "urdu" && /[\u0600-\u06FF]/.test(title)) {
      return title;
    }

    // Otherwise, map English titles to the appropriate language
    if (language === "arabic") {
      // Map common English titles to Arabic
      if (title.includes("Knowledge")) return "كتاب العلم";
      if (title.includes("Faith")) return "كتاب الإيمان";
      if (title.includes("Good Manners")) return "كتاب الأدب";
      if (title.includes("Revelation")) return "كتاب بدء الوحي";
      if (title.includes("Prayer")) return "كتاب الصلاة";
      if (title.includes("Fasting")) return "كتاب الصوم";
      if (title.includes("Pilgrimage")) return "كتاب الحج";
      if (title.includes("Marriage")) return "كتاب النكاح";
      if (title.includes("Virtues")) return "كتاب الفضائل";
      if (title.includes("Purification")) return "كتاب الطهارة";
      if (title.includes("Heart")) return "كتاب الرقائق";
      if (title.includes("Companionship")) return "كتاب الصحبة";
      return "كتاب الحديث"; // Default Arabic title
    } else if (language === "urdu") {
      // Map common English titles to Urdu
      if (title.includes("Knowledge")) return "کتاب العلم";
      if (title.includes("Faith")) return "کتاب الایمان";
      if (title.includes("Good Manners")) return "کتاب الادب";
      if (title.includes("Revelation")) return "کتاب بدء الوحی";
      if (title.includes("Prayer")) return "کتاب الصلاۃ";
      if (title.includes("Fasting")) return "کتاب الصوم";
      if (title.includes("Pilgrimage")) return "کتاب الحج";
      if (title.includes("Marriage")) return "کتاب النکاح";
      if (title.includes("Virtues")) return "کتاب الفضائل";
      if (title.includes("Purification")) return "کتاب الطہارۃ";
      if (title.includes("Heart")) return "کتاب الرقائق";
      if (title.includes("Companionship")) return "کتاب الصحبۃ";
      return "کتاب حدیث"; // Default Urdu title
    }
    return title; // Default to original title for English and other languages
  };

  const dimensions = getOptimalDimensions(hadithText);
  const adjustedFontSize = getAdjustedFontSize(hadithText);
  const localizedTitle = getLocalizedTitle();

  return (
    <div
      className="w-full bg-white p-4 hadith-poster-container"
      style={{ maxWidth: "100%", maxHeight: "100%" }}
    >
      <Card
        className={`mx-auto relative border-8 ${borderColorClass} shadow-lg p-8 flex flex-col poster-card`}
        style={{
          width: dimensions.width,
          height: posterHeight,
          backgroundColor: backgroundColor,
          backgroundImage: backgroundColor.startsWith("linear-gradient")
            ? backgroundColor
            : backgroundColor === "#f8f4e6"
              ? "url('https://www.transparenttextures.com/patterns/arabesque.png')"
              : backgroundColor === "#f5f5dc"
                ? "url('https://www.transparenttextures.com/patterns/diamond-eyes.png')"
                : backgroundColor === "#e6f0e8"
                  ? "url('https://www.transparenttextures.com/patterns/mosque.png')"
                  : "none",
          backgroundBlendMode: "overlay",
          backgroundSize: "auto",
        }}
      >
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
        <div className="flex-grow flex flex-col justify-center items-center text-center space-y-6">
          {/* Hadith Title/Chapter */}
          <Badge
            variant="outline"
            className={`mb-2 ${language === "arabic" || language === "urdu" ? "font-arabic" : ""}`}
            dir={language === "arabic" || language === "urdu" ? "rtl" : "ltr"}
            style={{
              fontFamily:
                language === "arabic"
                  ? "'Noto Naskh Arabic', serif"
                  : language === "urdu"
                    ? "'Jameel Noori Nastaleeq', serif"
                    : fontFamily,
            }}
          >
            {localizedTitle}
          </Badge>

          {/* Hadith Text */}
          <div
            className={`${language === "arabic" ? "font-arabic text-right" : ""}`}
            style={{
              fontFamily: fontFamily,
              fontSize: `${adjustedFontSize}px`,
              color: fontColor,
              lineHeight: lineHeight,
            }}
          >
            {showNarrator && hadithText.includes(":") ? (
              <>
                <span className="italic text-sm" style={{ opacity: 0.85 }}>
                  {hadithText.split(":")[0]}:
                </span>{" "}
                {hadithText.split(":").slice(1).join(":")}
              </>
            ) : language === "urdu" ? (
              <span dir="rtl">{hadithText}</span>
            ) : (
              hadithText
            )}
          </div>

          {/* Source Attribution */}
          <div className="text-sm text-gray-600 mt-4">
            <p className="font-medium">{source}</p>
          </div>
        </div>

        {/* Watermark */}
        <div className="absolute bottom-3 left-0 right-0 text-center text-sm font-semibold text-gray-500">
          Nasihun.com
        </div>
      </Card>
    </div>
  );
};

export default HadithPoster;
