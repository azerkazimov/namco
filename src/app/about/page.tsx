
"use client";

import Image from "next/image";

export default function About() {
  return (
    <div className="min-h-screen relative bg-gradient-to-b from-gray-900 to-black ">
      {/* Background with mining-operation.webp and dark overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{
          backgroundImage: "url(/mining-operation.webp)",
        }}
      />
      
      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 to-black/90" />
      
      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center pt-[100px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          {/* Section Title */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4">
              <span className="font-normal">ABOUT</span>
              <span className="font-bold">BOSS</span>
              <span className="ml-4 w-16 h-0.5 bg-white/30 inline-block"></span>
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              PT. Borneo Olah Sarana Sukses Tbk is ideally positioned to fulfill the ever growing energy needs of our customers for the foreseeable future
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Left side - Company Info */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h2 className="text-3xl lg:text-4xl font-bold text-white">
                  Our Mission
                </h2>
                <p className="text-lg text-white/90 leading-relaxed">
                  We are committed to sustainable mining practices and environmental responsibility while delivering high-quality mineral resources to meet global demand.
                </p>
              </div>

              <div className="space-y-6">
                <h2 className="text-3xl lg:text-4xl font-bold text-white">
                  Our Vision
                </h2>
                <p className="text-lg text-white/90 leading-relaxed">
                  To be a leading mining company that sets the standard for excellence in mineral extraction, environmental stewardship, and community development.
                </p>
              </div>

              {/* Watch our video button */}
              <div className="flex justify-start">
                <button className="bg-green-400 hover:bg-green-500 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200">
                  Watch our video
                </button>
              </div>
            </div>

            {/* Right side - Company Image */}
            <div className="relative">
              <div className="relative w-full h-96 lg:h-[500px] rounded-lg overflow-hidden shadow-2xl">
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

          {/* Company Values Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-400 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-white">S</span>
              </div>
              <h3 className="text-xl font-bold text-white">Sustainability</h3>
              <p className="text-white/80">
                Committed to environmentally responsible mining practices that protect our planet for future generations.
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-400 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-white">Q</span>
              </div>
              <h3 className="text-xl font-bold text-white">Quality</h3>
              <p className="text-white/80">
                Delivering the highest quality mineral resources through advanced extraction and processing technologies.
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-400 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-white">I</span>
              </div>
              <h3 className="text-xl font-bold text-white">Innovation</h3>
              <p className="text-white/80">
                Continuously advancing our mining techniques and technologies to improve efficiency and safety.
              </p>
            </div>
          </div>

          {/* Statistics Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl lg:text-4xl font-bold text-white">15+</div>
              <div className="text-white/80">Years Experience</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl lg:text-4xl font-bold text-white">500+</div>
              <div className="text-white/80">Employees</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl lg:text-4xl font-bold text-white">50+</div>
              <div className="text-white/80">Projects Completed</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl lg:text-4xl font-bold text-white">100%</div>
              <div className="text-white/80">Safety Record</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
