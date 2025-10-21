
"use client";

import Image from "next/image";

export default function News() {
  const newsData = [
    {
      id: 1,
      date: "12 Agustus 2022",
      title: "Announcement of Extraordinary General Meeting of Shareholders PT. Borneo Olah Sarana Sukses Tbk 2022",
      image: "/plant.png"
    },
    {
      id: 2,
      date: "12 Agustus 2022", 
      title: "Announcement of Extraordinary General Meeting of Shareholders PT. Borneo Olah Sarana Sukses Tbk 2022",
      image: "/plant.png"
    },
    {
      id: 3,
      date: "12 Agustus 2022",
      title: "Announcement of Extraordinary General Meeting of Shareholders PT. Borneo Olah Sarana Sukses Tbk 2022", 
      image: "/plant.png"
    }
  ];

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="mb-12">
          <h2 className="text-4xl lg:text-6xl font-bold text-black mb-4">
            <span className="font-normal">NEWS</span>
            <span className="font-bold">UPDATE</span>
            <span className="ml-4 w-16 h-0.5 bg-gray-300 inline-block"></span>
          </h2>
        </div>

        {/* News Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {newsData.map((news) => (
            <div key={news.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
              {/* News Image */}
              <div className="relative w-full h-48">
                <Image
                  src={news.image}
                  alt="Industrial plant"
                  fill
                  className="object-cover"
                />
              </div>
              
              {/* News Content */}
              <div className="p-6 space-y-3">
                <p className="text-sm text-gray-500 font-medium">
                  {news.date}
                </p>
                
                <h3 className="text-lg font-bold text-black leading-tight">
                  {news.title}
                </h3>
                
                <div className="pt-2">
                  <a 
                    href="#" 
                    className="text-green-500 hover:text-green-600 font-medium underline transition-colors duration-200"
                  >
                    Read More
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center space-x-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
          <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
        </div>
      </div>
    </section>
  );
}
