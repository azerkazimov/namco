
export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Dark textured background */}
      <div className="absolute inset-0 bg-[url('/mining.png')] bg-cover bg-center opacity-20"></div>
      
      {/* Main content */}
      <div className="relative z-10 px-4 py-12 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Three column layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            
            {/* About Us Column */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">About us</h3>
              <p className="text-white text-sm leading-relaxed">
                To be an established and prominent producer in the energy industry, with the focus on meeting the strict and demanding needs of worldwide customers.
              </p>
              {/* Behavvy Logo */}
              <div className="pt-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                    <div className="w-4 h-4 bg-gray-800 rounded-sm"></div>
                  </div>
                  <span className="text-white font-semibold text-lg">AIMC</span>
                </div>
              </div>
            </div>

            {/* Address Column */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">Address</h3>
              <div className="text-white text-sm leading-relaxed space-y-1">
                <p>PT. Advanced Industrial Maintenance & Consulting</p>
                <p>66 Building, Tower 1, 8th Floor,</p>
                <p>Baku 11410, Azerbaijan</p>
                <p>Baku 11410, Azerbaijan</p>
              </div>
            </div>

            {/* Contact Info Column */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">Contact Info</h3>
              <div className="text-white text-sm leading-relaxed space-y-1">
                <p>+994 535 5566</p>
                <p>+994 536 1342</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom section with blue line separator */}
      <div className="relative z-10 border-t border-blue-500">
        <div className="px-4 py-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <p className="text-white text-sm text-center">
              © Copyright 2025 AIMC 
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
