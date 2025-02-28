import React, { useState } from "react";
import { Download, Share2, RefreshCw } from "lucide-react";
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

  // Handle refresh (simulate loading)
  const handleRefresh = () => {
    setIsLoading(true);
    onRefresh();
    // Simulate API call delay
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
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
          >
            <RefreshCw
              size={16}
              className={`mr-2 ${isLoading ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>
          <Button variant="outline" size="sm" onClick={onShare}>
            <Share2 size={16} className="mr-2" />
            Share
          </Button>
          <Button variant="default" size="sm" onClick={onDownload}>
            <Download size={16} className="mr-2" />
            Download
          </Button>
        </div>
      </div>

      <Separator className="my-4" />

      <div className="flex-grow flex flex-col md:flex-row gap-6">
        {/* Poster Preview */}
        <div className="flex-grow flex items-center justify-center bg-white rounded-lg shadow-sm overflow-hidden">
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
            />
          )}
        </div>

        {/* Right Panel - Tabs for Customization and Info */}
        <div className="w-full md:w-80 flex-shrink-0">
          <Tabs defaultValue="customize" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="customize">Customize</TabsTrigger>
              <TabsTrigger value="info">Info</TabsTrigger>
            </TabsList>
            <TabsContent value="customize" className="mt-4">
              <CustomizationControls
                onLogoUpload={handleLogoUpload}
                onLogoPositionChange={handleLogoPositionChange}
                onRemoveLogo={handleRemoveLogo}
                onSaveCustomization={() => {
                  // Placeholder for save functionality
                  alert("Customization saved!");
                }}
              />
            </TabsContent>
            <TabsContent value="info" className="mt-4">
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-medium mb-4">About This Hadith</h3>
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
  );
};

export default PosterPreviewPanel;
