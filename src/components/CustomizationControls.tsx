import React, { useState, useEffect } from "react";
import {
  Upload,
  Move,
  Save,
  Trash2,
  Type,
  Palette,
  RotateCcw,
} from "lucide-react";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

interface CustomizationControlsProps {
  onLogoUpload?: (logo: File) => void;
  onLogoPositionChange?: (position: { x: number; y: number }) => void;
  onSaveCustomization?: () => void;
  onRemoveLogo?: () => void;
  onFontChange?: (font: string) => void;
  onTextColorChange?: (color: string) => void;
  onBackgroundColorChange?: (color: string) => void;
  onToggleNarrator?: (show: boolean) => void;
  showNarratorInitial?: boolean;
  onLineHeightChange?: (height: number) => void;
}

const CustomizationControls: React.FC<CustomizationControlsProps> = ({
  onLogoUpload = () => {},
  onLogoPositionChange = () => {},
  onSaveCustomization = () => {},
  onRemoveLogo = () => {},
  onFontChange = () => {},
  onTextColorChange = () => {},
  onBackgroundColorChange = () => {},
  onToggleNarrator = () => {},
  showNarratorInitial = true,
  onLineHeightChange = () => {},
}) => {
  const [logoPosition, setLogoPosition] = useState({ x: 50, y: 50 });
  const [hasLogo, setHasLogo] = useState(false);
  // Load saved customization from localStorage if available
  const loadSavedCustomization = () => {
    try {
      const savedCustomization = localStorage.getItem("hadithCustomization");
      if (savedCustomization) {
        const parsed = JSON.parse(savedCustomization);
        setFontFamily(parsed.fontFamily || "serif");
        setTextColor(parsed.textColor || "#000000");
        setBackgroundColor(parsed.backgroundColor || "#ffffff");
        setShowNarrator(
          parsed.showNarrator !== undefined
            ? parsed.showNarrator
            : showNarratorInitial,
        );
        setLineHeight(parsed.lineHeight || 1.5);
        return parsed;
      }
    } catch (error) {
      console.error("Error loading saved customization:", error);
    }
    return null;
  };

  const [fontFamily, setFontFamily] = useState("serif");
  const [textColor, setTextColor] = useState("#000000");
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [showNarrator, setShowNarrator] = useState(showNarratorInitial);
  const [lineHeight, setLineHeight] = useState(1.5);

  useEffect(() => {
    // Load saved customization on component mount
    const saved = loadSavedCustomization();
    if (!saved) {
      setShowNarrator(showNarratorInitial);
    }
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("hadithCustomization")) {
      setShowNarrator(showNarratorInitial);
    }
  }, [showNarratorInitial]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setHasLogo(true);
      onLogoUpload(file);
    }
  };

  const handlePositionChange = (axis: "x" | "y", value: number[]) => {
    const newPosition = { ...logoPosition, [axis]: value[0] };
    setLogoPosition(newPosition);
    onLogoPositionChange(newPosition);
  };

  const handleRemoveLogo = () => {
    setHasLogo(false);
    onRemoveLogo();
  };

  const handleSaveCustomization = () => {
    // Save current customization to localStorage
    const customization = {
      fontFamily,
      textColor,
      backgroundColor,
      showNarrator,
      lineHeight,
      logoPosition,
    };
    localStorage.setItem("hadithCustomization", JSON.stringify(customization));
    onSaveCustomization();
  };

  const handleResetCustomization = () => {
    // Reset to default values
    setFontFamily("serif");
    setTextColor("#000000");
    setBackgroundColor("#ffffff");
    setShowNarrator(true);
    setLineHeight(1.5);
    setLogoPosition({ x: 50, y: 50 });

    // Update parent component
    onFontChange("serif");
    onTextColorChange("#000000");
    onBackgroundColorChange("#ffffff");
    onToggleNarrator(true);
    onLineHeightChange(1.5);
    onLogoPositionChange({ x: 50, y: 50 });

    // Remove from localStorage
    localStorage.removeItem("hadithCustomization");
  };

  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-medium mb-4">Customize Your Poster</h3>

      <div className="space-y-4">
        {/* Logo Upload */}
        <div className="flex items-center justify-between">
          <Label htmlFor="logo-upload" className="flex-1">
            Upload Your Logo
          </Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="relative">
                  <Button
                    variant="outline"
                    size="sm"
                    className="relative overflow-hidden"
                    onClick={() =>
                      document.getElementById("logo-upload")?.click()
                    }
                  >
                    <Upload size={16} className="mr-2" />
                    Select Logo
                  </Button>
                  <input
                    id="logo-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Upload your organization's logo</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* Logo Position Controls - Only show if logo is uploaded */}
        {hasLogo && (
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="flex items-center">
                  <Move size={16} className="mr-2" />
                  Horizontal Position
                </Label>
                <span className="text-sm text-gray-500">{logoPosition.x}%</span>
              </div>
              <Slider
                defaultValue={[logoPosition.x]}
                max={100}
                step={1}
                onValueChange={(value) => handlePositionChange("x", value)}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="flex items-center">
                  <Move size={16} className="mr-2" />
                  Vertical Position
                </Label>
                <span className="text-sm text-gray-500">{logoPosition.y}%</span>
              </div>
              <Slider
                defaultValue={[logoPosition.y]}
                max={100}
                step={1}
                onValueChange={(value) => handlePositionChange("y", value)}
              />
            </div>

            <div className="flex space-x-2">
              <Button
                variant="destructive"
                size="sm"
                onClick={handleRemoveLogo}
                className="flex-1"
              >
                <Trash2 size={16} className="mr-2" />
                Remove Logo
              </Button>
            </div>
          </div>
        )}

        {/* Text Styling */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="flex items-center">
              <Type size={16} className="mr-2" />
              Font Style
            </Label>
            <div className="grid grid-cols-2 gap-2 mb-2">
              <Button
                variant={fontFamily === "serif" ? "default" : "outline"}
                className="w-full h-10 flex items-center justify-center"
                onClick={() => {
                  setFontFamily("serif");
                  onFontChange("serif");
                }}
              >
                Serif
              </Button>
              <Button
                variant={fontFamily === "sans-serif" ? "default" : "outline"}
                className="w-full h-10 flex items-center justify-center"
                onClick={() => {
                  setFontFamily("sans-serif");
                  onFontChange("sans-serif");
                }}
              >
                Sans Serif
              </Button>
              <Button
                variant={
                  fontFamily === "'Amiri', serif" ? "default" : "outline"
                }
                className="w-full h-10 flex items-center justify-center"
                onClick={() => {
                  setFontFamily("'Amiri', serif");
                  onFontChange("'Amiri', serif");
                }}
              >
                Amiri
              </Button>
              <Button
                variant={
                  fontFamily === "'Noto Naskh Arabic', serif"
                    ? "default"
                    : "outline"
                }
                className="w-full h-10 flex items-center justify-center"
                onClick={() => {
                  setFontFamily("'Noto Naskh Arabic', serif");
                  onFontChange("'Noto Naskh Arabic', serif");
                }}
              >
                Naskh
              </Button>
              <Button
                variant={
                  fontFamily === "'Scheherazade New', serif"
                    ? "default"
                    : "outline"
                }
                className="w-full h-10 flex items-center justify-center"
                onClick={() => {
                  setFontFamily("'Scheherazade New', serif");
                  onFontChange("'Scheherazade New', serif");
                }}
              >
                Scheherazade
              </Button>
              <Button
                variant={
                  fontFamily === "'Jameel Noori Nastaleeq', serif"
                    ? "default"
                    : "outline"
                }
                className="w-full h-10 flex items-center justify-center"
                onClick={() => {
                  setFontFamily("'Jameel Noori Nastaleeq', serif");
                  onFontChange("'Jameel Noori Nastaleeq', serif");
                }}
              >
                Nastaleeq
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="flex items-center">
              <Palette size={16} className="mr-2" />
              Text Color
            </Label>
            <div className="grid grid-cols-3 gap-2 mb-2">
              <Button
                variant={textColor === "#000000" ? "default" : "outline"}
                className="w-full h-10 flex items-center justify-center"
                onClick={() => {
                  setTextColor("#000000");
                  onTextColorChange("#000000");
                }}
              >
                <div className="w-4 h-4 bg-black rounded-full mr-2"></div>
                Black
              </Button>
              <Button
                variant={textColor === "#333333" ? "default" : "outline"}
                className="w-full h-10 flex items-center justify-center"
                onClick={() => {
                  setTextColor("#333333");
                  onTextColorChange("#333333");
                }}
              >
                <div className="w-4 h-4 bg-[#333333] rounded-full mr-2"></div>
                Dark
              </Button>
              <Button
                variant={textColor === "#555555" ? "default" : "outline"}
                className="w-full h-10 flex items-center justify-center"
                onClick={() => {
                  setTextColor("#555555");
                  onTextColorChange("#555555");
                }}
              >
                <div className="w-4 h-4 bg-[#555555] rounded-full mr-2"></div>
                Gray
              </Button>
              <Button
                variant={textColor === "#1e3a8a" ? "default" : "outline"}
                className="w-full h-10 flex items-center justify-center"
                onClick={() => {
                  setTextColor("#1e3a8a");
                  onTextColorChange("#1e3a8a");
                }}
              >
                <div className="w-4 h-4 bg-[#1e3a8a] rounded-full mr-2"></div>
                Navy
              </Button>
              <Button
                variant={textColor === "#14532d" ? "default" : "outline"}
                className="w-full h-10 flex items-center justify-center"
                onClick={() => {
                  setTextColor("#14532d");
                  onTextColorChange("#14532d");
                }}
              >
                <div className="w-4 h-4 bg-[#14532d] rounded-full mr-2"></div>
                Green
              </Button>
              <Button
                variant={textColor === "#7c2d12" ? "default" : "outline"}
                className="w-full h-10 flex items-center justify-center"
                onClick={() => {
                  setTextColor("#7c2d12");
                  onTextColorChange("#7c2d12");
                }}
              >
                <div className="w-4 h-4 bg-[#7c2d12] rounded-full mr-2"></div>
                Brown
              </Button>
              <Button
                variant={textColor === "#831843" ? "default" : "outline"}
                className="w-full h-10 flex items-center justify-center"
                onClick={() => {
                  setTextColor("#831843");
                  onTextColorChange("#831843");
                }}
              >
                <div className="w-4 h-4 bg-[#831843] rounded-full mr-2"></div>
                Maroon
              </Button>
              <Button
                variant={textColor === "#581c87" ? "default" : "outline"}
                className="w-full h-10 flex items-center justify-center"
                onClick={() => {
                  setTextColor("#581c87");
                  onTextColorChange("#581c87");
                }}
              >
                <div className="w-4 h-4 bg-[#581c87] rounded-full mr-2"></div>
                Purple
              </Button>
              <Button
                variant={textColor === "#1e40af" ? "default" : "outline"}
                className="w-full h-10 flex items-center justify-center"
                onClick={() => {
                  setTextColor("#1e40af");
                  onTextColorChange("#1e40af");
                }}
              >
                <div className="w-4 h-4 bg-[#1e40af] rounded-full mr-2"></div>
                Blue
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="flex items-center">
              <Palette size={16} className="mr-2" />
              Background
            </Label>
            <div className="grid grid-cols-2 gap-2 mb-2">
              <Button
                variant={backgroundColor === "#ffffff" ? "default" : "outline"}
                className="w-full h-10 flex items-center justify-center"
                onClick={() => {
                  setBackgroundColor("#ffffff");
                  onBackgroundColorChange("#ffffff");
                }}
              >
                <div className="w-4 h-4 bg-white border border-gray-300 rounded-full mr-2"></div>
                White
              </Button>
              <Button
                variant={backgroundColor === "#f8f4e6" ? "default" : "outline"}
                className="w-full h-10 flex items-center justify-center"
                onClick={() => {
                  setBackgroundColor("#f8f4e6");
                  onBackgroundColorChange("#f8f4e6");
                }}
              >
                <div className="w-4 h-4 bg-[#f8f4e6] border border-gray-300 rounded-full mr-2"></div>
                Parchment
              </Button>
              <Button
                variant={backgroundColor === "#f5f5dc" ? "default" : "outline"}
                className="w-full h-10 flex items-center justify-center"
                onClick={() => {
                  setBackgroundColor("#f5f5dc");
                  onBackgroundColorChange("#f5f5dc");
                }}
              >
                <div className="w-4 h-4 bg-[#f5f5dc] border border-gray-300 rounded-full mr-2"></div>
                Beige
              </Button>
              <Button
                variant={backgroundColor === "#e6f0e8" ? "default" : "outline"}
                className="w-full h-10 flex items-center justify-center"
                onClick={() => {
                  setBackgroundColor("#e6f0e8");
                  onBackgroundColorChange("#e6f0e8");
                }}
              >
                <div className="w-4 h-4 bg-[#e6f0e8] border border-gray-300 rounded-full mr-2"></div>
                Mint
              </Button>
              <Button
                variant={
                  backgroundColor ===
                  "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)"
                    ? "default"
                    : "outline"
                }
                className="w-full h-10 flex items-center justify-center"
                onClick={() => {
                  setBackgroundColor(
                    "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
                  );
                  onBackgroundColorChange(
                    "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
                  );
                }}
              >
                <div className="w-4 h-4 bg-gradient-to-br from-[#f5f7fa] to-[#c3cfe2] border border-gray-300 rounded-full mr-2"></div>
                Blue Grad
              </Button>
              <Button
                variant={
                  backgroundColor ===
                  "linear-gradient(135deg, #fff9f0 0%, #f9d9b9 100%)"
                    ? "default"
                    : "outline"
                }
                className="w-full h-10 flex items-center justify-center"
                onClick={() => {
                  setBackgroundColor(
                    "linear-gradient(135deg, #fff9f0 0%, #f9d9b9 100%)",
                  );
                  onBackgroundColorChange(
                    "linear-gradient(135deg, #fff9f0 0%, #f9d9b9 100%)",
                  );
                }}
              >
                <div className="w-4 h-4 bg-gradient-to-br from-[#fff9f0] to-[#f9d9b9] border border-gray-300 rounded-full mr-2"></div>
                Sand Grad
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="flex items-center">
              <Type size={16} className="mr-2" />
              Line Height
            </Label>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Compact</span>
                <span className="text-sm text-gray-500">
                  {lineHeight.toFixed(1)}
                </span>
                <span className="text-sm text-gray-500">Spacious</span>
              </div>
              <Slider
                defaultValue={[lineHeight]}
                min={1.0}
                max={2.5}
                step={0.1}
                value={[lineHeight]}
                onValueChange={(value) => {
                  setLineHeight(value[0]);
                  onLineHeightChange(value[0]);
                }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="flex items-center">
              <Type size={16} className="mr-2" />
              Show Narrator
            </Label>
            <div className="flex items-center space-x-2">
              <Button
                variant={showNarrator ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setShowNarrator(true);
                  onToggleNarrator(true);
                }}
                className="flex-1"
              >
                Show
              </Button>
              <Button
                variant={!showNarrator ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setShowNarrator(false);
                  onToggleNarrator(false);
                }}
                className="flex-1"
              >
                Hide
              </Button>
            </div>
          </div>
        </div>

        {/* Save and Reset Customization */}
        <div className="flex space-x-2 mt-4">
          <Button className="flex-1" onClick={handleSaveCustomization}>
            <Save size={16} className="mr-2" />
            Save Settings
          </Button>
          <Button
            variant="outline"
            className="flex-1"
            onClick={handleResetCustomization}
          >
            <RotateCcw size={16} className="mr-2" />
            Reset
          </Button>
        </div>

        {/* Help Dialog */}
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="link" size="sm" className="w-full mt-2">
              Need help with customization?
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Customization Help</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <p>Here's how to customize your Hadith poster:</p>
              <ol className="list-decimal pl-5 space-y-2">
                <li>Upload your logo by clicking the "Select Logo" button</li>
                <li>Adjust the position of your logo using the sliders</li>
                <li>
                  Click "Save Customization" when you're happy with the result
                </li>
                <li>
                  Your logo will appear alongside the Nasihun.com watermark
                </li>
              </ol>
              <p className="text-sm text-gray-500 mt-4">
                Note: The Nasihun.com watermark will always remain visible on
                all generated posters.
              </p>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default CustomizationControls;
