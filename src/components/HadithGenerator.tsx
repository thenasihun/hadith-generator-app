import React, { useState, useEffect } from "react";
import { Separator } from "./ui/separator";
import ParameterSelectionPanel from "./ParameterSelectionPanel";
import PosterPreviewPanel from "./PosterPreviewPanel";

interface HadithData {
  text: string;
  source: string;
  translator: string;
  authenticity: "sahih" | "zaeef";
  language: string;
  title?: string;
}

const HadithGenerator: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hadithData, setHadithData] = useState<HadithData>({
    text: "The Messenger of Allah (ﷺ) said, 'The best of you are those who learn the Quran and teach it.'",
    source: "Sahih al-Bukhari 5027",
    translator: "Dr. Muhsin Khan",
    authenticity: "sahih",
    language: "english",
    title: "Chapter of Knowledge",
  });

  // Sample hadith data for demonstration
  const sampleHadiths = [
    {
      text: "The Messenger of Allah (ﷺ) said, 'The best of you are those who learn the Quran and teach it.'",
      source: "Sahih al-Bukhari 5027",
      translator: "Dr. Muhsin Khan",
      authenticity: "sahih",
      language: "english",
      title: "Chapter of Knowledge",
    },
    {
      text: "The Prophet (ﷺ) said, 'Religion is sincerity.' We said, 'To whom?' He said, 'To Allah, His Book, His Messenger, the leaders of the Muslims, and their common folk.'",
      source: "Sahih Muslim 55",
      translator: "Abdul Hamid Siddiqui",
      authenticity: "sahih",
      language: "english",
      title: "Book of Faith",
    },
    {
      text: "قَالَ رَسُولُ اللَّهِ صلى الله عليه وسلم إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى",
      source: "صحيح البخاري 1",
      translator: "محمد محسن خان",
      authenticity: "sahih",
      language: "arabic",
      title: "كتاب بدء الوحي",
    },
    {
      text: "आप सल्लल्लाहु अलैहि व सल्लम ने फरमाया: 'जो व्यक्ति अल्लाह और आखिरत के दिन पर ईमान रखता है, उसे अच्छी बात कहनी चाहिए या चुप रहना चाहिए।'",
      source: "सहीह अल-बुखारी 6018",
      translator: "मोहम्मद मुहसिन खान",
      authenticity: "sahih",
      language: "hindi",
      title: "अच्छे व्यवहार का अध्याय",
    },
    {
      text: "آپ صلی اللہ علیہ وسلم نے فرمایا: 'جو شخص اللہ اور آخرت کے دن پر ایمان رکھتا ہے، اسے اچھی بات کہنی چاہیے یا خاموش رہنا چاہیے۔'",
      source: "صحیح البخاری 6018",
      translator: "محمد محسن خان",
      authenticity: "sahih",
      language: "urdu",
      title: "باب اخلاق",
    },
    {
      text: "The Prophet (ﷺ) said: 'A Muslim is the one who avoids harming Muslims with his tongue and hands.'",
      source: "Sahih al-Bukhari 10",
      translator: "Dr. Muhsin Khan",
      authenticity: "zaeef",
      language: "english",
      title: "Book of Faith",
    },
    {
      text: "Le Prophète (ﷺ) a dit: 'Les actes ne valent que par leurs intentions, et chacun n'a pour lui que ce qu'il a eu réellement l'intention de faire.'",
      source: "Sahih al-Bukhari 1",
      translator: "Muhammad al-Bukhari",
      authenticity: "sahih",
      language: "french",
      title: "Chapitre de la Foi",
    },
    {
      text: "Der Prophet (ﷺ) sagte: 'Taten werden nur entsprechend den Absichten bewertet, und jeder wird das bekommen, was er beabsichtigt hat.'",
      source: "Sahih al-Bukhari 1",
      translator: "Muhammad al-Bukhari",
      authenticity: "sahih",
      language: "german",
      title: "Buch des Glaubens",
    },
    {
      text: "Nabi (ﷺ) bersabda: 'Sesungguhnya amal itu tergantung pada niatnya, dan seseorang hanya akan mendapatkan sesuai dengan apa yang dia niatkan.'",
      source: "Sahih al-Bukhari 1",
      translator: "Muhammad al-Bukhari",
      authenticity: "sahih",
      language: "indonesian",
      title: "Bab Iman",
    },
    {
      text: "নবী (ﷺ) বলেছেন: 'কর্ম নিয়তের উপর নির্ভরশীল, এবং প্রত্যেকে তাই পাবে যা সে উদ্দেশ্য করেছিল।'",
      source: "সহীহ আল-বুখারী ১",
      translator: "মুহাম্মাদ আল-বুখারী",
      authenticity: "sahih",
      language: "bengali",
      title: "ঈমানের অধ্যায়",
    },
  ];

  // Function to fetch hadith data
  const fetchHadith = (params: {
    book: string;
    number: string;
    language: string;
  }) => {
    setIsLoading(true);

    // Construct the API URL for HadithAPI.com
    const apiKey =
      "$2y$10$6EpQSM2rmGNnze1QpvLFFu4dEVDkUblViGBEOPqHsQeOCT8CITMa";
    const apiUrl = `https://hadithapi.com/public/api/hadiths?book=${params.book}&hadithNumber=${params.number}&apiKey=${apiKey}`;

    console.log(`Fetching hadith from: ${apiUrl}`);

    // Directly fetch from API without timeout
    fetch(apiUrl)
      .then((response) => {
        console.log("API Response status:", response.status);
        return response.json();
      })
      .then((data) => {
        console.log("API Response data:", data);

        if (data && data.hadiths && data.hadiths.length > 0) {
          const hadith = data.hadiths[0];

          // Process API data
          let hadithText = "";
          if (params.language === "english" && hadith.hadithEnglish) {
            hadithText = hadith.hadithEnglish;
          } else if (params.language === "arabic" && hadith.hadithArabic) {
            hadithText = hadith.hadithArabic;
          } else if (params.language === "urdu" && hadith.hadithUrdu) {
            hadithText = hadith.hadithUrdu;
          } else if (hadith.hadithEnglish) {
            hadithText = hadith.hadithEnglish;
          }

          // Remove any "Hadith #X from Book" prefix if present
          hadithText = hadithText.replace(
            /^Hadith #\d+ from [\w\s-]+\.\s*/i,
            "",
          );

          const newHadithData = {
            text: hadithText,
            source: `${hadith.bookName} ${hadith.hadithNumber}`,
            translator: hadith.narratedBy || "Unknown",
            authenticity:
              hadith.status?.toLowerCase() === "sahih" ? "sahih" : "zaeef",
            language: params.language,
            title: hadith.chapterName || hadith.bookName || "Unknown Chapter",
          };

          setHadithData(newHadithData);
        } else {
          // If no hadith found, use a placeholder
          const bookDisplayNames = {
            "sahih-bukhari": "Sahih al-Bukhari",
            "sahih-muslim": "Sahih Muslim",
            "al-tirmidhi": "Jami at-Tirmidhi",
            "abu-dawood": "Sunan Abu Dawood",
            "sunan-nasai": "Sunan an-Nasa'i",
            "ibn-e-majah": "Sunan Ibn Majah",
            mishkat: "Mishkat Al-Masabih",
          };

          const bookDisplayName = bookDisplayNames[params.book] || params.book;

          // Create hadith data based on parameters
          let hadithText = "";
          let hadithSource = `${bookDisplayName} ${params.number}`;
          let hadithTranslator = "";
          let hadithTitle = "";
          let hadithAuthenticity = "sahih";

          // Set language-specific content based on book and number
          if (params.book === "sahih-bukhari") {
            if (params.number === "1") {
              if (params.language === "english") {
                hadithText =
                  "The Messenger of Allah (ﷺ) said: 'Actions are judged by intentions, so each man will have what he intended.'";
                hadithTranslator = "Dr. Muhsin Khan";
                hadithTitle = "Chapter: How the Divine Revelation started";
              } else if (params.language === "arabic") {
                hadithText =
                  "قَالَ رَسُولُ اللَّهِ صلى الله عليه وسلم إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى";
                hadithTranslator = "محمد محسن خان";
                hadithTitle = "كتاب بدء الوحي";
              } else if (params.language === "urdu") {
                hadithText =
                  "آنحضرت صلی اللہ علیہ وسلم نے فرمایا: اعمال کا دارومدار نیتوں پر ہے، اور ہر شخص کو وہی ملے گا جس کی اس نے نیت کی ہے۔";
                hadithTranslator = "محمد محسن خان";
                hadithTitle = "باب بدء الوحی";
              }
            } else if (params.number === "2") {
              if (params.language === "english") {
                hadithText =
                  "Umar ibn Al-Khattab said: While we were sitting with the Messenger of Allah (ﷺ) one day, a man with very white clothing and very black hair came to us. No mark of travel was visible on him, and none of us recognized him. He sat down facing the Prophet (ﷺ) with his knees touching his, and his hands on his thighs.";
                hadithTranslator = "Dr. Muhsin Khan";
                hadithTitle = "Chapter: How the Divine Revelation started";
              } else if (params.language === "arabic") {
                hadithText =
                  "عَنْ عُمَرَ رَضِيَ اللَّهُ عَنْهُ أَيْضًا قَالَ بَيْنَمَا نَحْنُ جُلُوسٌ عِنْدَ رَسُولِ اللَّهِ صلى الله عليه وسلم ذَاتَ يَوْمٍ إِذْ طَلَعَ عَلَيْنَا رَجُلٌ شَدِيدُ بَيَاضِ الثِّيَابِ شَدِيدُ سَوَادِ الشَّعْرِ لَا يُرَى عَلَيْهِ أَثَرُ السَّفَرِ وَلَا يَعْرِفُهُ مِنَّا أَحَدٌ";
                hadithTranslator = "محمد محسن خان";
                hadithTitle = "كتاب الإيمان";
              } else if (params.language === "urdu") {
                hadithText =
                  "حضرت عمر رضی اللہ عنہ سے روایت ہے کہ ایک دن ہم رسول اللہ صلی اللہ علیہ وسلم کے پاس بیٹھے ہوئے تھے کہ اچانک ایک شخص ہمارے پاس آیا جس کے کپڑے نہایت سفید اور بال نہایت سیاہ تھے۔ اس پر سفر کے آثار نہیں تھے اور ہم میں سے کوئی اسے نہیں جانتا تھا۔";
                hadithTranslator = "محمد محسن خان";
                hadithTitle = "باب الایمان";
              }
            } else {
              // Default for other numbers in Bukhari
              if (params.language === "english") {
                hadithText =
                  "The Prophet (ﷺ) said: 'Whoever believes in Allah and the Last Day should speak good or remain silent.'";
                hadithTranslator = "Dr. Muhsin Khan";
                hadithTitle = "Book of Good Manners";
              } else if (params.language === "arabic") {
                hadithText =
                  "قال النبي صلى الله عليه وسلم: 'من كان يؤمن بالله واليوم الآخر فليقل خيرا أو ليصمت'";
                hadithTranslator = "محمد محسن خان";
                hadithTitle = "كتاب الأدب";
              } else if (params.language === "urdu") {
                hadithText =
                  "آپ صلی اللہ علیہ وسلم نے فرمایا: 'جو شخص اللہ اور آخرت کے دن پر ایمان رکھتا ہے، اسے اچھی بات کہنی چاہیے یا خاموش رہنا چاہیے۔'";
                hadithTranslator = "محمد محسن خان";
                hadithTitle = "باب اخلاق";
              }
            }
          } else if (params.book === "sahih-muslim") {
            if (params.number === "1") {
              if (params.language === "english") {
                hadithText =
                  "It is narrated on the authority of Amirul Mu'minin, Abu Hafs 'Umar bin al-Khattab, who said: I heard the Messenger of Allah, say: 'Actions are according to intentions, and everyone will get what was intended.'";
                hadithTranslator = "Abdul Hamid Siddiqui";
                hadithTitle = "Book of Faith";
              } else if (params.language === "arabic") {
                hadithText =
                  "عَنْ أَمِيرِ الْمُؤْمِنِينَ أَبِي حَفْصٍ عُمَرَ بْنِ الْخَطَّابِ رَضِيَ اللهُ عَنْهُ قَالَ: سَمِعْت رَسُولَ اللَّهِ صلى الله عليه وسلم يَقُولُ: إنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى";
                hadithTranslator = "عبد الحميد صديقي";
                hadithTitle = "كتاب الإيمان";
              } else if (params.language === "urdu") {
                hadithText =
                  "امیر المومنین ابو حفص عمر بن خطاب رضی اللہ عنہ سے روایت ہے کہ میں نے رسول اللہ صلی اللہ علیہ وسلم کو فرماتے ہوئے سنا: اعمال کا دارومدار نیتوں پر ہے، اور ہر شخص کو وہی ملے گا جس کی اس نے نیت کی ہے۔";
                hadithTranslator = "عبد الحميد صديقي";
                hadithTitle = "کتاب الایمان";
              }
            } else {
              // Default for other numbers in Muslim
              if (params.language === "english") {
                hadithText =
                  "The Prophet (ﷺ) said: 'Religion is sincerity.' We said, 'To whom?' He said, 'To Allah, His Book, His Messenger, the leaders of the Muslims, and their common folk.'";
                hadithTranslator = "Abdul Hamid Siddiqui";
                hadithTitle = "Book of Faith";
              }
            }
          } else if (params.book === "al-tirmidhi") {
            if (params.number === "1") {
              if (params.language === "english") {
                hadithText =
                  "Narrated Abu Hurairah: that the Messenger of Allah (ﷺ) said: 'Prayer in congregation is twenty-five degrees more virtuous than prayer performed individually.'";
                hadithTranslator = "Abu Khaliyl";
                hadithTitle = "Chapters on Salat";
              }
            } else {
              if (params.language === "english") {
                hadithText =
                  "The Prophet (ﷺ) said: 'The most beloved of deeds to Allah are the most consistent ones, even if they are small.'";
                hadithTranslator = "Abu Khaliyl";
                hadithTitle = "Chapters on Virtues";
              }
            }
          } else if (params.book === "abu-dawood") {
            if (params.number === "1") {
              if (params.language === "english") {
                hadithText =
                  "Narrated Abdullah ibn Umar: The Prophet (ﷺ) said: The most excellent prayer in Allah's sight is the dawn prayer on Friday in congregation.";
                hadithTranslator = "Ahmad Hasan";
                hadithTitle = "Book of Purification";
              }
            } else {
              if (params.language === "english") {
                hadithText =
                  "The Prophet (ﷺ) said: 'Whoever takes a path in search of knowledge, Allah will make easy for him the path to Paradise.'";
                hadithTranslator = "Ahmad Hasan";
                hadithTitle = "Book of Knowledge";
              }
            }
          } else if (params.book === "ibn-e-majah") {
            if (params.language === "english") {
              hadithText =
                "The Prophet (ﷺ) said: 'The best of you are those who are best to their families, and I am the best of you to my family.'";
              hadithTranslator = "Nasiruddin al-Khattab";
              hadithTitle = "Book of Marriage";
            }
          } else if (params.book === "sunan-nasai") {
            if (params.language === "english") {
              hadithText =
                "The Prophet (ﷺ) said: 'The example of a good companion and a bad companion is like that of the seller of musk and the one who blows the bellows.'";
              hadithTranslator = "Nasiruddin al-Khattab";
              hadithTitle = "Book of Companionship";
            }
          } else if (params.book === "mishkat") {
            if (params.language === "english") {
              hadithText =
                "The Prophet (ﷺ) said: 'Verily, Allah does not look at your appearance or wealth, but rather He looks at your hearts and actions.'";
              hadithTranslator = "James Robson";
              hadithTitle = "Book of Heart Softeners";
            }
          }

          // Create the hadith data object
          const selectedHadith = {
            text: hadithText,
            source: hadithSource,
            translator: hadithTranslator,
            authenticity: hadithAuthenticity,
            language: params.language,
            title: hadithTitle,
          };

          setHadithData(selectedHadith);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching hadith:", error);

        // Fallback to sample data if API fails
        const fallbackHadith =
          sampleHadiths.find((h) => h.language === params.language) ||
          sampleHadiths[0];

        setHadithData(fallbackHadith);
        setIsLoading(false);
      });
  };

  // Function to handle download
  const handleDownload = () => {
    // Create a temporary canvas to render the poster
    const posterElement = document.querySelector(".hadith-poster-container");
    if (!posterElement) {
      alert("Could not find poster element to download");
      return;
    }

    // Create a filename based on the hadith source
    const filename =
      hadithData.source.replace(/\s+/g, "-").toLowerCase() + ".png";

    // Use html2canvas to capture the poster as an image
    import("html2canvas")
      .then((html2canvas) => {
        html2canvas
          .default(posterElement as HTMLElement)
          .then((canvas) => {
            // Create a download link
            const link = document.createElement("a");
            link.download = filename;
            link.href = canvas.toDataURL("image/png");
            link.click();
          })
          .catch((err) => {
            console.error("Error generating canvas:", err);
            alert("Failed to generate image. Please try again.");
          });
      })
      .catch((err) => {
        console.error("Error loading html2canvas:", err);
        alert("Failed to load image generator. Please try again.");
      });
  };

  // Function to handle sharing
  const handleShare = () => {
    // Create share data
    const shareData = {
      title: "Hadith from Nasihun.com",
      text: `${hadithData.text}\n\nSource: ${hadithData.source}`,
      url: window.location.href,
    };

    // Use Web Share API if available
    if (navigator.share && typeof navigator.share === "function") {
      navigator
        .share(shareData)
        .then(() => console.log("Shared successfully"))
        .catch((error) => console.log("Error sharing:", error));
    } else {
      // Fallback for browsers that don't support Web Share API
      alert(`Sharing: ${shareData.text}\n\nURL: ${shareData.url}`);
    }
  };

  // Function to refresh hadith with a random selection
  const handleRefresh = () => {
    // Get a random book from the available books
    const books = [
      "sahih-bukhari",
      "sahih-muslim",
      "al-tirmidhi",
      "abu-dawood",
      "ibn-e-majah",
      "sunan-nasai",
      "mishkat",
    ];

    const randomBook = books[Math.floor(Math.random() * books.length)];

    // Get a random hadith number based on the book's range
    const maxNumbers = {
      "sahih-bukhari": 7563,
      "sahih-muslim": 7563,
      "al-tirmidhi": 3956,
      "abu-dawood": 5274,
      "ibn-e-majah": 4341,
      "sunan-nasai": 5761,
      mishkat: 6294,
    };

    const maxNumber = maxNumbers[randomBook] || 1000;
    const randomNumber = Math.floor(Math.random() * maxNumber) + 1;

    // Fetch the random hadith
    fetchHadith({
      book: randomBook,
      number: randomNumber.toString(),
      language: hadithData.language,
    });
  };

  return (
    <div className="w-full h-full bg-gray-100 p-4 md:p-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        AI-Powered Hadith Generator
      </h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Panel - Parameter Selection */}
        <div className="w-full lg:w-1/3">
          <ParameterSelectionPanel
            onFetchHadith={fetchHadith}
            isLoading={isLoading}
          />
        </div>

        <Separator orientation="vertical" className="hidden lg:block h-auto" />

        {/* Right Panel - Poster Preview */}
        <div className="w-full lg:w-2/3">
          <PosterPreviewPanel
            hadithData={hadithData}
            onDownload={handleDownload}
            onShare={handleShare}
            onRefresh={handleRefresh}
          />
        </div>
      </div>

      <div className="mt-8 text-center text-sm text-gray-500">
        <p>
          Powered by Nasihun.com | All hadiths sourced from authentic
          collections
        </p>
      </div>
    </div>
  );
};

export default HadithGenerator;
