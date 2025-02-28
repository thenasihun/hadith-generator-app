import React from "react";
import HadithGenerator from "../components/HadithGenerator";

const HadithGeneratorPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-primary text-primary-foreground py-4 shadow-md">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold">Nasihun.com</h1>
          <p className="text-sm opacity-80">Dynamic Hadith Generator</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <HadithGenerator />
      </main>

      <footer className="bg-gray-100 py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-sm text-gray-600">
          <p>
            © {new Date().getFullYear()} Nasihun.com - Authentic Islamic
            Knowledge
          </p>
          <p className="mt-2">
            This tool fetches hadiths from authentic sources and presents them
            as customizable posters.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HadithGeneratorPage;
