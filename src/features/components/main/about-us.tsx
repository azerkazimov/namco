"use client";

import Image from "next/image";

export default function AboutUs() {
  return (
    <section className="relative bg-gray-900 py-16 lg:py-24 mt-16">
      <div className="absolute inset-x-0 top-[-96px] h-44 bg-gradient-to-b from-transparent to-black/80 z-0" />
      {/* Background pattern */}
      <div className="absolute inset-0 bg-gray-900">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 opacity-50"></div>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-gray-800 to-transparent opacity-30"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-6xl font-bold text-white">
                <span className="font-normal">ABOUT</span>
                <span className="font-bold">BOSS</span>
              </h2>

              <p className="text-lg text-white max-w-lg">
                is ideally positioned to fulfill the ever growing energy needs
                of our customers for the foreseeable future
              </p>
            </div>

            {/* Watch our video button */}
            <div className="flex justify-start">
              <button className="bg-green-400 hover:bg-green-500 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200">
                Watch our video
              </button>
            </div>
          </div>

          {/* Right side - Conveyor image */}
          <div className="relative">
            <div className="relative w-full h-96 lg:h-[500px] rounded-lg overflow-hidden">
              <Image
                src="/conveyor.png"
                alt="Industrial conveyor belt"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
