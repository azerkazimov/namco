"use client";

import MarcaciteOre3D from "@/components/ui/3d-ore-marcacite";

export default function MarcaciteOreTypes() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="mb-12">
          <h2 className="text-4xl lg:text-6xl font-bold text-black mb-4">
            <span className="font-normal">MARCACITE</span>
            <span className="font-bold">ORE</span>
            <span className="ml-4 w-16 h-0.5 bg-gray-300 inline-block"></span>
          </h2>
        </div>

        {/* Ore Card */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
            {/* 3D Model Section */}
            <div className="relative w-full h-96 bg-gray-100">
              <MarcaciteOre3D />
            </div>
            
            {/* Content */}
            <div className="p-8 space-y-6">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-black">
                  Marcacite Ore
                </h3>
                <div className="h-px w-full bg-gray-200"></div>
              </div>
              
              <p className="text-lg text-gray-700 leading-relaxed">
                Marcacite ore is a type of ore that is used to make marcacite. Marcacite is a
                metal that is used in the production of metal. Metal is also used
                in the production of marcacite. Marcacite is also used in the production of marcacite. Marcacite is also used in the production of marcacite. Marcacite is also used in the production of marcacite. Marcacite is also used in the production of marcacite. Marcacite is also used in the production of marcacite. Marcacite is also used in the production of marcacite. Marcacite is also used in the production of marcacite. Marcacite is also used in the production of marcacite.
              </p>
              
              <div className="pt-4">
                <button className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200">
                  See More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
