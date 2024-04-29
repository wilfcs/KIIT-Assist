"use client"
import BotpressBot from "./components/BotpressBot";
import Carousel from "./components/Carousel";
import Navbar from "./components/Navbar";
import SilderImg01 from "@/public/KIIT-University-Campus.jpg";
import SilderImg02 from "@/public/KIIT Sports.jpg";
import SilderImg03 from "@/public/KIIT Innovation.jpg";
import SilderImg04 from "@/public/KIIT Diversity.jpg";
import SilderIcon01 from "@/public/university-campus.png";
import SilderIcon02 from "@/public/sports.png";
import SilderIcon03 from "@/public/together.png";
import SilderIcon04 from "@/public/innovation.png";

export default function Home() {
  const items = [
    {
      img: SilderImg01,
      desc: "Campus",
      buttonIcon: SilderIcon01,
    },
    {
      img: SilderImg02,
      desc: "Sports",
      buttonIcon: SilderIcon02,
    },
    {
      img: SilderImg03,
      desc: "Diversity",
      buttonIcon: SilderIcon03,
    },
    {
      img: SilderImg04,
      desc: "Innovation",
      buttonIcon: SilderIcon04,
    },
  ];
  return (
    <main className="">
      <Navbar />
      <div className=" flex flex-col pt-20">
        {/* Placeholder for carousel */}
        <div className="w-full max-w-6xl mx-auto px-4 md:px-6 py-2">
          <div className="flex justify-center">
            <Carousel items={items} carouselHeight="h-128" itemHeight="h-96"/>
          </div>
        </div>

        <div className="bg-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-6">
              About KIIT University
            </h2>
            <p className="text-lg text-gray-500 mb-4">
              Established in 1992 and opened five years later, KIIT University
              is today one of the most prestigious universities in India. Its
              commitment to teaching excellence led to the grant of university
              status under Section 3 of UGC Act, 1956 by the Ministry of Human
              Resources Development, Govt. of India in 2004, within only seven
              years of its inception. KIIT is relatively young, but prizes
              excellence and ambition. The contributions of KIIT's faculty,
              students and alumni have been earning national and international
              recognition.
            </p>
            <p className="text-lg text-gray-500 mb-4">
              It serves more than 27,000 students through its 28 Schools
              imparting globally recognised bachelor's, master's and doctoral
              degree programmes in 100 plus disciplines, spanning engineering,
              medicine, management, biotechnology, law and more. Apart from
              global recognition and pedagogical excellence, the University
              provides the best possible academic and non-academic grooming and
              empowerment that enable one to become a global citizen and make an
              impact in the global workplace.
            </p>
            <p className="text-lg text-gray-500 mb-4">
              KIIT is an internationally focused university and welcomes
              students from all corners of the globe. With international
              students enrolled from around 45 countries, it prides itself on
              being a cosmopolitan and multicultural campus. Laying claim to a
              global mindset, the university actively partners with other
              leading higher education institutions around the world to provide
              international opportunities to its students and faculty. With
              tie-ups with 140 leading institutions of the world, KIIT has a
              presence in over 50 countries, including USA, UK, Germany, Russia,
              Czech Republic, Japan, South Korea and Kenya.
            </p>
            <p className="text-lg text-gray-500 mb-8">
              KIIT is a multi-campus university. Its 23 campuses span 25 sq. km.
              and have a built up area of 12 million sq. ft. Apart from academic
              blocks, administrative blocks and student residences, attractions
              on campus include a Rose Garden, Art Gallery, Sculpture Garden,
              Tribal Museum and a 35000 capacity multisport stadium.
            </p>
            <p className="text-2xl font-bold text-gray-900">
              Click on the button on the right to talk to our chatbot -&gt;
            </p>
          </div>
        </div>
      </div>
      <BotpressBot />
    </main>
  );
}
