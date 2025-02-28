import React, { useState } from "react";
import { Upload, Move, Save, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import { Label } from "./ui/label";
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
}

const CustomizationControls: React.FC<CustomizationControlsProps> = ({
  onLogoUpload = () => {},
  onLogoPositionChange = () => {},
  onSaveCustomization = () => {},
  onRemoveLogo = () => {},
}) => {
  const [logoPosition, setLogoPosition] = useState({ x: 50, y: 50 });
  const [hasLogo, setHasLogo] = useState(false);

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

        {/* Save Customization */}
        <Button className="w-full mt-4" onClick={onSaveCustomization}>
          <Save size={16} className="mr-2" />
          Save Customization
        </Button>

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
