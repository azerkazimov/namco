export default function MobileFooter() {
  return (
    <footer className="relative bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Dark textured background */}
      <div className="absolute inset-0 bg-[url('/mining.png')] bg-cover bg-center opacity-20"></div>
      
      {/* Main content - Mobile optimized */}
      <div className="relative z-10 px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Stacked layout for mobile */}
          <div className="space-y-8">
            
            {/* About Us Section */}
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-white">About us</h3>
              <p className="text-white text-sm leading-relaxed">
                To be an established and prominent producer in the energy industry, with the focus on meeting the strict and demanding needs of worldwide customers.
              </p>
              {/* Behavvy Logo */}
              <div className="pt-3">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-white rounded flex items-center justify-center">
                    <div className="w-3 h-3 bg-gray-800 rounded-sm"></div>
                  </div>
                  <span className="text-white font-semibold">AIMC</span>
                </div>
              </div>
            </div>

            {/* Address Section */}
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-white">Address</h3>
              <div className="text-white text-sm leading-relaxed space-y-1">
                <p>PT. Behavvy Mining & Coal</p>
                <p>Wisma 66 Building, Tower 1, 8th Floor,</p>
                <p>Letjen S Parman#77</p>
                <p>West Prog 11410, Indonesia</p>
              </div>
            </div>

            {/* Contact Info Section */}
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-white">Contact Info</h3>
              <div className="text-white text-sm leading-relaxed space-y-1">
                <p>+6221 535 5566</p>
                <p>+6221 536 1342</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom section with blue line separator */}
      <div className="relative z-10 border-t border-blue-500">
        <div className="px-4 py-4">
          <div className="max-w-7xl mx-auto">
            <p className="text-white text-xs text-center">
              © Copyright 2024 Behavvy by sahrul amir
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
