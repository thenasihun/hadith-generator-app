import React, { useState } from "react";
import { Book, Hash, Languages, RefreshCw, Search } from "lucide-react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Card } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import SearchHadith from "./SearchHadith";

interface ParameterSelectionPanelProps {
  onFetchHadith?: (params: {
    book: string;
    number: string;
    language: string;
  }) => void;
  onSelectHadith?: (hadith: {
    text: string;
    source: string;
    translator: string;
    authenticity: "sahih" | "zaeef";
    language: string;
    title?: string;
  }) => void;
  isLoading?: boolean;
}

const ParameterSelectionPanel: React.FC<ParameterSelectionPanelProps> = ({
  onFetchHadith = () => {},
  onSelectHadith = () => {},
  isLoading = false,
}) => {
  const [book, setBook] = useState<string>("sahih-bukhari");
  const [number, setNumber] = useState<string>("1");
  const [language, setLanguage] = useState<string>("english");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFetchHadith({ book, number, language });
  };

  const hadithBooks = [
    { value: "sahih-bukhari", label: "Sahih al-Bukhari (1-7563)" },
    { value: "sahih-muslim", label: "Sahih Muslim (1-7563)" },
    { value: "al-tirmidhi", label: "Jami at-Tirmidhi (1-3956)" },
    { value: "abu-dawood", label: "Sunan Abu Dawood (1-5274)" },
    { value: "ibn-e-majah", label: "Sunan Ibn-e-Majah (1-4341)" },
    { value: "sunan-nasai", label: "Sunan an-Nasa'i (1-5761)" },
    { value: "mishkat", label: "Mishkat Al-Masabih (1-6294)" },
  ];

  const languages = [
    { value: "english", label: "English" },
    { value: "arabic", label: "Arabic" },
    { value: "urdu", label: "Urdu" },
  ];

  return (
    <Card className="w-full h-full bg-white p-6 shadow-md">
      <h2 className="text-2xl font-bold mb-6">Hadith Parameters</h2>

      <Tabs defaultValue="number" className="w-full mb-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="number" className="flex items-center">
            <Hash size={16} className="mr-2" />
            By Number
          </TabsTrigger>
          <TabsTrigger value="search" className="flex items-center">
            <Search size={16} className="mr-2" />
            By Search
          </TabsTrigger>
        </TabsList>

        <TabsContent value="number">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Book Selection */}
            <div className="space-y-2">
              <Label htmlFor="book" className="flex items-center">
                <Book size={16} className="mr-2" />
                Select Hadith Book
              </Label>
              <Select value={book} onValueChange={setBook}>
                <SelectTrigger id="book" className="w-full">
                  <SelectValue placeholder="Select a book" />
                </SelectTrigger>
                <SelectContent>
                  {hadithBooks.map((hadithBook) => (
                    <SelectItem key={hadithBook.value} value={hadithBook.value}>
                      {hadithBook.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Hadith Number */}
            <div className="space-y-2">
              <Label htmlFor="number" className="flex items-center">
                <Hash size={16} className="mr-2" />
                Hadith Number
              </Label>
              <Input
                id="number"
                type="number"
                min="1"
                max={
                  book === "sahih-bukhari" || book === "sahih-muslim"
                    ? 7563
                    : book === "al-tirmidhi"
                      ? 3956
                      : book === "abu-dawood"
                        ? 5274
                        : book === "ibn-e-majah"
                          ? 4341
                          : book === "sunan-nasai"
                            ? 5761
                            : book === "mishkat"
                              ? 6294
                              : 9999
                }
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                placeholder="Enter hadith number"
              />
            </div>

            {/* Language Selection */}
            <div className="space-y-2">
              <Label htmlFor="language" className="flex items-center">
                <Languages size={16} className="mr-2" />
                Language Preference
              </Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger id="language" className="w-full">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.value} value={lang.value}>
                      {lang.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <RefreshCw size={16} className="mr-2 animate-spin" />
                  Fetching Hadith...
                </>
              ) : (
                "Generate Hadith Poster"
              )}
            </Button>
          </form>
        </TabsContent>

        <TabsContent value="search">
          <div className="space-y-6">
            {/* Book Selection */}
            <div className="space-y-2">
              <Label htmlFor="search-book" className="flex items-center">
                <Book size={16} className="mr-2" />
                Select Hadith Book
              </Label>
              <Select value={book} onValueChange={setBook}>
                <SelectTrigger id="search-book" className="w-full">
                  <SelectValue placeholder="Select a book" />
                </SelectTrigger>
                <SelectContent>
                  {hadithBooks.map((hadithBook) => (
                    <SelectItem key={hadithBook.value} value={hadithBook.value}>
                      {hadithBook.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Language Selection */}
            <div className="space-y-2">
              <Label htmlFor="search-language" className="flex items-center">
                <Languages size={16} className="mr-2" />
                Language Preference
              </Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger id="search-language" className="w-full">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.value} value={lang.value}>
                      {lang.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Search Component */}
            <div className="space-y-2">
              <Label className="flex items-center">
                <Search size={16} className="mr-2" />
                Search Hadiths
              </Label>
              <SearchHadith
                book={book}
                language={language}
                onSelectHadith={onSelectHadith}
              />
            </div>

            <div className="text-xs text-gray-500 mt-4">
              <p>
                Search for keywords related to hadith content. Click on a result
                to add it to your poster.
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default ParameterSelectionPanel;
