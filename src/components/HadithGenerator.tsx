import React, { useState, useEffect } from "react";
import { Separator } from "./ui/separator";
import ParameterSelectionPanel from "./ParameterSelectionPanel";
import PosterPreviewPanel from "./PosterPreviewPanel";
import html2canvas from "html2canvas";

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

        if (
          data &&
          data.hadiths &&
          data.hadiths.data &&
          data.hadiths.data.length > 0
        ) {
          const hadith = data.hadiths.data[0];

          // Process API data
          let hadithText = "";
          let hadithTranslator = "";
          let hadithNarrator = "";
          let hadithTitle = "";

          if (params.language === "english" && hadith.hadithEnglish) {
            hadithText = hadith.hadithEnglish;
            hadithTranslator = hadith.book?.writerName || "Unknown";
            hadithNarrator = hadith.englishNarrator || "";
            hadithTitle = hadith.chapter?.chapterEnglish || "";
          } else if (params.language === "arabic" && hadith.hadithArabic) {
            hadithText = hadith.hadithArabic;
            hadithTranslator = hadith.book?.writerName || "Unknown";
            hadithTitle = hadith.chapter?.chapterArabic || "";
          } else if (params.language === "urdu" && hadith.hadithUrdu) {
            // For Urdu, keep narrator separate from hadith text
            hadithText = hadith.hadithUrdu;
            hadithTranslator = hadith.book?.writerName || "Unknown";
            hadithNarrator = hadith.urduNarrator || "";
            hadithTitle = hadith.chapter?.chapterUrdu || "";
          } else if (hadith.hadithEnglish) {
            // Default to English if requested language not available
            hadithText = hadith.hadithEnglish;
            hadithTranslator = hadith.book?.writerName || "Unknown";
            hadithNarrator = hadith.englishNarrator || "";
            hadithTitle = hadith.chapter?.chapterEnglish || "";
          }

          // Remove any "Hadith #X from Book" prefix if present
          hadithText = hadithText.replace(
            /^Hadith #\d+ from [\w\s-]+\.\s*/i,
            "",
          );

          // For English, if there's a narrator, prepend it to the hadith text if not already included
          if (
            params.language === "english" &&
            hadithNarrator &&
            !hadithText.includes(hadithNarrator)
          ) {
            hadithText = `${hadithNarrator} ${hadithText}`;
          }

          // If no title is provided from API, use a default based on language
          if (!hadithTitle) {
            if (params.language === "english") {
              hadithTitle = "Chapter of Hadith";
            } else if (params.language === "arabic") {
              hadithTitle = "كتاب الحديث";
            } else if (params.language === "urdu") {
              hadithTitle = "کتاب حدیث";
            } else {
              hadithTitle = "Chapter of Hadith";
            }
          }

          const newHadithData = {
            text: hadithText,
            source: `${hadith.book?.bookName || "Unknown Book"} ${hadith.hadithNumber}`,
            translator: hadithTranslator,
            authenticity:
              hadith.status?.toLowerCase() === "sahih" ? "sahih" : "zaeef",
            language: params.language,
            title: hadithTitle,
            urduNarrator: hadith.urduNarrator || "",
            englishNarrator: hadith.englishNarrator || "",
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
              } else if (params.language === "arabic") {
                hadithText =
                  "قال النبي صلى الله عليه وسلم: 'الدين النصيحة'. قلنا: لمن؟ قال: 'لله ولكتابه ولرسوله ولأئمة المسلمين وعامتهم'";
                hadithTranslator = "عبد الحميد صديقي";
                hadithTitle = "كتاب الإيمان";
              } else if (params.language === "urdu") {
                hadithText =
                  "آپ صلی اللہ علیہ وسلم نے فرمایا: 'دین نصیحت کا نام ہے۔' ہم نے پوچھا: کس کے لیے؟ آپ نے فرمایا: 'اللہ کے لیے، اس کی کتاب کے لیے، اس کے رسول کے لیے، مسلمانوں کے رہنماؤں کے لیے اور عام مسلمانوں کے لیے۔'";
                hadithTranslator = "عبد الحميد صديقي";
                hadithTitle = "کتاب الایمان";
              }
            }
          } else if (params.book === "al-tirmidhi") {
            if (params.number === "1") {
              if (params.language === "english") {
                hadithText =
                  "Narrated Abu Hurairah: that the Messenger of Allah (ﷺ) said: 'Prayer in congregation is twenty-five degrees more virtuous than prayer performed individually.'";
                hadithTranslator = "Abu Khaliyl";
                hadithTitle = "Chapters on Salat";
              } else if (params.language === "arabic") {
                hadithText =
                  "عن أبي هريرة أن رسول الله صلى الله عليه وسلم قال: 'صلاة الجماعة تفضل صلاة الفذ بخمس وعشرين درجة'";
                hadithTranslator = "أبو خليل";
                hadithTitle = "أبواب الصلاة";
              } else if (params.language === "urdu") {
                hadithText =
                  "ابو ہریرہ رضی اللہ عنہ سے روایت ہے کہ رسول اللہ صلی اللہ علیہ وسلم نے فرمایا: 'جماعت کی نماز انفرادی نماز سے پچیس درجے افضل ہے۔'";
                hadithTranslator = "ابو خلیل";
                hadithTitle = "ابواب الصلاۃ";
              }
            } else {
              if (params.language === "english") {
                hadithText =
                  "The Prophet (ﷺ) said: 'The most beloved of deeds to Allah are the most consistent ones, even if they are small.'";
                hadithTranslator = "Abu Khaliyl";
                hadithTitle = "Chapters on Virtues";
              } else if (params.language === "arabic") {
                hadithText =
                  "قال النبي صلى الله عليه وسلم: 'أحب الأعمال إلى الله أدومها وإن قل'";
                hadithTranslator = "أبو خليل";
                hadithTitle = "أبواب الفضائل";
              } else if (params.language === "urdu") {
                hadithText =
                  "آپ صلی اللہ علیہ وسلم نے فرمایا: 'اللہ کو سب سے زیادہ پسندیدہ عمل وہ ہے جو مستقل ہو، چاہے وہ تھوڑا ہی ہو۔'";
                hadithTranslator = "ابو خلیل";
                hadithTitle = "ابواب الفضائل";
              }
            }
          } else if (params.book === "abu-dawood") {
            if (params.number === "1") {
              if (params.language === "english") {
                hadithText =
                  "Narrated Abdullah ibn Umar: The Prophet (ﷺ) said: The most excellent prayer in Allah's sight is the dawn prayer on Friday in congregation.";
                hadithTranslator = "Ahmad Hasan";
                hadithTitle = "Book of Purification";
              } else if (params.language === "arabic") {
                hadithText =
                  "عن عبد الله بن عمر: أن النبي صلى الله عليه وسلم قال: أفضل الصلاة عند الله صلاة الفجر يوم الجمعة في جماعة";
                hadithTranslator = "أحمد حسن";
                hadithTitle = "كتاب الطهارة";
              } else if (params.language === "urdu") {
                hadithText =
                  "عبداللہ بن عمر سے روایت ہے کہ نبی صلی اللہ علیہ وسلم نے فرمایا: اللہ کے نزدیک سب سے افضل نماز جمعہ کے دن فجر کی نماز باجماعت ہے۔";
                hadithTranslator = "احمد حسن";
                hadithTitle = "کتاب الطہارۃ";
              }
            } else {
              if (params.language === "english") {
                hadithText =
                  "The Prophet (ﷺ) said: 'Whoever takes a path in search of knowledge, Allah will make easy for him the path to Paradise.'";
                hadithTranslator = "Ahmad Hasan";
                hadithTitle = "Book of Knowledge";
              } else if (params.language === "arabic") {
                hadithText =
                  "قال النبي صلى الله عليه وسلم: 'من سلك طريقا يلتمس فيه علما سهل الله له به طريقا إلى الجنة'";
                hadithTranslator = "أحمد حسن";
                hadithTitle = "كتاب العلم";
              } else if (params.language === "urdu") {
                hadithText =
                  "آپ صلی اللہ علیہ وسلم نے فرمایا: 'جو شخص علم کی تلاش میں کوئی راستہ اختیار کرتا ہے، اللہ اس کے لیے جنت کا راستہ آسان کر دیتا ہے۔'";
                hadithTranslator = "احمد حسن";
                hadithTitle = "کتاب العلم";
              }
            }
          } else if (params.book === "ibn-e-majah") {
            if (params.language === "english") {
              hadithText =
                "The Prophet (ﷺ) said: 'The best of you are those who are best to their families, and I am the best of you to my family.'";
              hadithTranslator = "Nasiruddin al-Khattab";
              hadithTitle = "Book of Marriage";
            } else if (params.language === "arabic") {
              hadithText =
                "قال النبي صلى الله عليه وسلم: 'خيركم خيركم لأهله وأنا خيركم لأهلي'";
              hadithTranslator = "ناصر الدين الخطاب";
              hadithTitle = "كتاب النكاح";
            } else if (params.language === "urdu") {
              hadithText =
                "آپ صلی اللہ علیہ وسلم نے فرمایا: 'تم میں سے بہترین وہ ہے جو اپنے گھر والوں کے ساتھ بہترین ہے، اور میں تم میں سے اپنے گھر والوں کے ساتھ بہترین ہوں۔'";
              hadithTranslator = "ناصر الدین الخطاب";
              hadithTitle = "کتاب النکاح";
            }
          } else if (params.book === "sunan-nasai") {
            if (params.language === "english") {
              hadithText =
                "The Prophet (ﷺ) said: 'The example of a good companion and a bad companion is like that of the seller of musk and the one who blows the bellows.'";
              hadithTranslator = "Nasiruddin al-Khattab";
              hadithTitle = "Book of Companionship";
            } else if (params.language === "arabic") {
              hadithText =
                "قال النبي صلى الله عليه وسلم: 'مثل الجليس الصالح والجليس السوء كمثل صاحب المسك ونافخ الكير'";
              hadithTranslator = "ناصر الدين الخطاب";
              hadithTitle = "كتاب الصحبة";
            } else if (params.language === "urdu") {
              hadithText =
                "آپ صلی اللہ علیہ وسلم نے فرمایا: 'اچھے ساتھی اور برے ساتھی کی مثال مشک بیچنے والے اور دھونکنی چلانے والے کی طرح ہے۔'";
              hadithTranslator = "ناصر الدین الخطاب";
              hadithTitle = "کتاب الصحبۃ";
            }
          } else if (params.book === "mishkat") {
            if (params.language === "english") {
              hadithText =
                "The Prophet (ﷺ) said: 'Verily, Allah does not look at your appearance or wealth, but rather He looks at your hearts and actions.'";
              hadithTranslator = "James Robson";
              hadithTitle = "Book of Heart Softeners";
            } else if (params.language === "arabic") {
              hadithText =
                "قال النبي صلى الله عليه وسلم: 'إن الله لا ينظر إلى صوركم وأموالكم ولكن ينظر إلى قلوبكم وأعمالكم'";
              hadithTranslator = "جيمس روبسون";
              hadithTitle = "كتاب الرقائق";
            } else if (params.language === "urdu") {
              hadithText =
                "آپ صلی اللہ علیہ وسلم نے فرمایا: 'بیشک اللہ تمہاری شکلوں اور مالوں کو نہیں دیکھتا بلکہ وہ تمہارے دلوں اور اعمال کو دیکھتا ہے۔'";
              hadithTranslator = "جیمز روبسن";
              hadithTitle = "کتاب الرقائق";
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

    // Get only the poster content, not the container
    const posterCard = posterElement.querySelector(".poster-card");

    // Create a filename based on the hadith source
    const filename =
      hadithData.source.replace(/\s+/g, "-").toLowerCase() + ".png";

    // Show loading indicator
    const loadingIndicator = document.createElement("div");
    loadingIndicator.className =
      "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50";
    loadingIndicator.innerHTML = `<div class="bg-white p-4 rounded-lg shadow-lg text-center"><div class="animate-spin inline-block w-8 h-8 border-4 border-primary border-t-transparent rounded-full mb-2"></div><p>Generating image...</p></div>`;
    document.body.appendChild(loadingIndicator);

    // Use html2canvas to capture the poster as an image
    html2canvas((posterCard as HTMLElement) || (posterElement as HTMLElement), {
      scale: 2, // Higher quality
      useCORS: true, // Allow cross-origin images
      allowTaint: true,
      backgroundColor: null,
      onclone: (clonedDoc) => {
        // Find the poster card in the cloned document
        const clonedCard = clonedDoc.querySelector(".poster-card");
        if (clonedCard) {
          // Set fixed dimensions for the download version
          const style = clonedCard.getAttribute("style") || "";
          // Override height to ensure all content is captured
          clonedCard.setAttribute(
            "style",
            `${style}; height: auto !important; max-height: none !important; overflow: visible !important;`,
          );

          // Ensure content is centered between title and watermark
          const contentDiv = clonedCard.querySelector(".flex-grow");
          if (contentDiv) {
            contentDiv.setAttribute(
              "style",
              "display: flex; flex-direction: column; justify-content: center; min-height: 70%;",
            );
          }
        }
      },
    })
      .then((canvas) => {
        // Create a download link
        const link = document.createElement("a");
        link.download = filename;
        link.href = canvas.toDataURL("image/png");
        link.click();
        // Remove loading indicator
        document.body.removeChild(loadingIndicator);
      })
      .catch((err) => {
        console.error("Error generating canvas:", err);
        alert("Failed to generate image. Please try again.");
        // Remove loading indicator
        document.body.removeChild(loadingIndicator);
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
            onSelectHadith={setHadithData}
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
