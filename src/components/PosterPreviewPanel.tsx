import React, { useState, useEffect } from "react";
import {
  Download,
  Share2,
  RefreshCw,
  ChevronRight,
  ChevronLeft,
  RotateCcw,
} from "lucide-react";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Separator } from "./ui/separator";
import HadithPoster from "./HadithPoster";
import CustomizationControls from "./CustomizationControls";

interface PosterPreviewPanelProps {
  hadithData?: {
    text: string;
    source: string;
    translator: string;
    authenticity: "sahih" | "zaeef";
    language: string;
    title?: string;
    urduNarrator?: string;
    englishNarrator?: string;
  };
  onDownload?: () => void;
  onShare?: () => void;
  onRefresh?: () => void;
}

const PosterPreviewPanel: React.FC<PosterPreviewPanelProps> = ({
  hadithData = {
    text: "The Messenger of Allah (ﷺ) said, 'The best of you are those who learn the Quran and teach it.'",
    source: "Sahih al-Bukhari 5027",
    translator: "Dr. Muhsin Khan",
    authenticity: "sahih",
    language: "english",
  },
  onDownload = () => {},
  onShare = () => {},
  onRefresh = () => {},
}) => {
  const [userLogo, setUserLogo] = useState<string>("");
  const [logoPosition, setLogoPosition] = useState<{ x: number; y: number }>({
    x: 20,
    y: 20,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPanelOpen, setIsPanelOpen] = useState<boolean>(true);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const [fontFamily, setFontFamily] = useState<string>("serif");
  const [textColor, setTextColor] = useState<string>("#000000");
  const [backgroundColor, setBackgroundColor] = useState<string>("#ffffff");
  const [showNarrator, setShowNarrator] = useState<boolean>(true);
  const [lineHeight, setLineHeight] = useState<number>(1.5);

  // Check if mobile on mount and window resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Handle logo upload
  const handleLogoUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setUserLogo(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  // Handle logo position change
  const handleLogoPositionChange = (position: { x: number; y: number }) => {
    setLogoPosition(position);
  };

  // Handle logo removal
  const handleRemoveLogo = () => {
    setUserLogo("");
  };

  // Handle font change
  const handleFontChange = (font: string) => {
    setFontFamily(font);
  };

  // Handle text color change
  const handleTextColorChange = (color: string) => {
    setTextColor(color);
  };

  // Handle background color change
  const handleBackgroundColorChange = (color: string) => {
    setBackgroundColor(color);
  };

  // Handle narrator toggle
  const handleToggleNarrator = (show: boolean) => {
    setShowNarrator(show);
  };

  // Handle line height change
  const handleLineHeightChange = (height: number) => {
    setLineHeight(height);
  };

  // Handle refresh (simulate loading)
  const handleRefresh = () => {
    setIsLoading(true);
    onRefresh();
    // Simulate API call delay
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  // Handle reset customization
  const handleResetCustomization = () => {
    setFontFamily("serif");
    setTextColor("#000000");
    setBackgroundColor("#ffffff");
    setShowNarrator(true);
    setLineHeight(1.5);
    setLogoPosition({ x: 50, y: 50 });
    setUserLogo("");
    localStorage.removeItem("hadithCustomization");
  };

  // Toggle customization panel
  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen);
  };

  return (
    <div className="w-full h-full bg-gray-50 p-4 rounded-lg flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Hadith Poster Preview</h2>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isLoading}
            className="hidden md:flex"
          >
            <RefreshCw
              size={16}
              className={`mr-2 ${isLoading ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onShare}
            className="hidden md:flex"
          >
            <Share2 size={16} className="mr-2" />
            Share
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={onDownload}
            className="hidden md:flex"
          >
            <Download size={16} className="mr-2" />
            Download
          </Button>
        </div>
      </div>

      <Separator className="my-4" />

      {/* Mobile action buttons */}
      <div className="flex justify-between mb-4 md:hidden">
        <Button
          variant="outline"
          size="sm"
          onClick={handleResetCustomization}
          className="flex-1 mr-2"
        >
          <RotateCcw size={16} className="mr-2" />
          Reset
        </Button>
        <Button
          variant="default"
          size="sm"
          onClick={onDownload}
          className="flex-1"
        >
          <Download size={16} className="mr-2" />
          Download
        </Button>
      </div>

      <div className="flex-grow flex flex-col md:flex-row gap-6 relative overflow-hidden">
        {/* Poster Preview */}
        <div
          className={`flex-grow flex items-center justify-center bg-white rounded-lg shadow-sm overflow-auto ${isPanelOpen && !isMobile ? "md:pr-80" : ""}`}
        >
          {isLoading ? (
            <div className="flex flex-col items-center justify-center p-8">
              <RefreshCw
                size={48}
                className="animate-spin text-gray-400 mb-4"
              />
              <p className="text-gray-500">Loading hadith...</p>
            </div>
          ) : (
            <HadithPoster
              hadithText={hadithData.text}
              source={hadithData.source}
              translator={hadithData.translator}
              authenticity={hadithData.authenticity}
              language={hadithData.language}
              title={hadithData.title}
              userLogo={userLogo}
              userLogoPosition={logoPosition}
              fontFamily={fontFamily}
              fontColor={textColor}
              backgroundColor={backgroundColor}
              showNarrator={showNarrator}
              lineHeight={lineHeight}
              hadith={{
                urduNarrator: hadithData.urduNarrator || "",
                englishNarrator: hadithData.englishNarrator || "",
              }}
            />
          )}
        </div>

        {/* Toggle button - always visible regardless of panel state */}
        <div className="fixed right-0 top-1/2 transform -translate-y-1/2 z-30 hidden md:block">
          <Button
            variant="default"
            size="sm"
            onClick={togglePanel}
            className="md:flex bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:from-purple-700 hover:to-blue-600 rounded-l-md rounded-r-none px-2 py-6"
          >
            {isPanelOpen ? (
              <ChevronRight size={16} />
            ) : (
              <ChevronLeft size={16} />
            )}
          </Button>
        </div>

        {/* Right Panel - Tabs for Customization and Info */}
        <div
          className={`w-full md:w-80 flex-shrink-0 ${isMobile ? "" : "md:absolute md:right-0 md:top-0 md:bottom-0 md:h-full md:overflow-y-auto md:bg-white md:shadow-md md:z-10 md:p-2 transition-transform duration-300 ease-in-out flex flex-col"} ${isPanelOpen || isMobile ? "md:translate-x-0" : "md:translate-x-full hidden md:block"}`}
        >
          {/* Customization Panel Title */}
          {isPanelOpen && !isMobile && (
            <div className="flex justify-between items-center mb-2 px-2 bg-gradient-to-r from-purple-600 to-blue-500 text-white p-2 rounded-t-md sticky top-0 z-10">
              <h3 className="text-lg font-medium">Customization</h3>
            </div>
          )}

          <div className="flex-grow overflow-y-auto">
            <Tabs defaultValue="customize" className="w-full">
              <TabsList className="grid w-full grid-cols-2 sticky top-0 z-10 bg-white">
                <TabsTrigger value="customize">Customize</TabsTrigger>
                <TabsTrigger value="info">Info</TabsTrigger>
              </TabsList>
              <TabsContent value="customize" className="mt-4 pb-6">
                <CustomizationControls
                  onLogoUpload={handleLogoUpload}
                  onLogoPositionChange={handleLogoPositionChange}
                  onRemoveLogo={handleRemoveLogo}
                  onFontChange={handleFontChange}
                  onTextColorChange={handleTextColorChange}
                  onBackgroundColorChange={handleBackgroundColorChange}
                  onToggleNarrator={handleToggleNarrator}
                  showNarratorInitial={showNarrator}
                  onLineHeightChange={handleLineHeightChange}
                  onSaveCustomization={() => {
                    // Toast notification instead of alert
                    const toast = document.createElement("div");
                    toast.className =
                      "fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded shadow-lg z-50 animate-fade-in-out";
                    toast.textContent = "Settings saved successfully!";
                    document.body.appendChild(toast);

                    // Remove after 3 seconds
                    setTimeout(() => {
                      toast.classList.add("animate-fade-out");
                      setTimeout(() => document.body.removeChild(toast), 500);
                    }, 3000);
                  }}
                />
              </TabsContent>
              <TabsContent value="info" className="mt-4 pb-6">
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <h3 className="text-lg font-medium mb-4">
                    About This Hadith
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-sm text-gray-500">
                        Source
                      </h4>
                      <p>{hadithData.source}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm text-gray-500">
                        Authenticity
                      </h4>
                      <p className="capitalize">{hadithData.authenticity}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm text-gray-500">
                        Translator
                      </h4>
                      <p>{hadithData.translator}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm text-gray-500">
                        Language
                      </h4>
                      <p className="capitalize">{hadithData.language}</p>
                    </div>
                    <Separator className="my-4" />
                    <div>
                      <h4 className="font-medium text-sm text-gray-500">
                        About Nasihun.com
                      </h4>
                      <p className="text-sm text-gray-600 mt-2">
                        Nasihun.com is dedicated to sharing authentic Islamic
                        knowledge through verified Hadith from reliable sources.
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PosterPreviewPanel;
