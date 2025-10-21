
"use client";

import { useState } from "react";

export default function Contacts() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
  };

  return (
    <div className="min-h-screen relative bg-gradient-to-b from-gray-900 to-black">
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
              <span className="font-normal">CONTACT</span>
              <span className="font-bold">US</span>
              <span className="ml-4 w-16 h-0.5 bg-white/30 inline-block"></span>
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Get in touch with our team for inquiries, partnerships, or any questions about our mining operations
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-8">
                  Get In Touch
                </h2>
                
                {/* Contact Details */}
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-green-400 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold">📍</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">Address</h3>
                      <p className="text-white/90">
                        Jl. Sudirman No. 123<br />
                        Jakarta Selatan 12190<br />
                        Indonesia
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-green-400 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold">📞</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">Phone</h3>
                      <p className="text-white/90">
                        +62 21 1234 5678<br />
                        +62 21 8765 4321
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-green-400 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold">✉️</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">Email</h3>
                      <p className="text-white/90">
                        info@bossmining.com<br />
                        contact@bossmining.com
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-green-400 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold">🕒</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">Business Hours</h3>
                      <p className="text-white/90">
                        Monday - Friday: 8:00 AM - 5:00 PM<br />
                        Saturday: 8:00 AM - 12:00 PM<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 border border-white/20">
              <h2 className="text-2xl font-bold text-white mb-6">Send us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-white font-medium mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                      placeholder="Your full name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-white font-medium mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="company" className="block text-white font-medium mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                    placeholder="Your company name"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-white font-medium mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                    placeholder="What is this about?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-white font-medium mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent resize-none"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-green-400 hover:bg-green-500 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>

          {/* Additional Contact Information */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-green-400 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl">🏢</span>
              </div>
              <h3 className="text-xl font-bold text-white">Headquarters</h3>
              <p className="text-white/80">
                Jakarta, Indonesia<br />
                Main Office
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="w-16 h-16 bg-green-400 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl">⛏️</span>
              </div>
              <h3 className="text-xl font-bold text-white">Mining Sites</h3>
              <p className="text-white/80">
                Multiple locations<br />
                Across Indonesia
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="w-16 h-16 bg-green-400 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl">🌍</span>
              </div>
              <h3 className="text-xl font-bold text-white">Global Reach</h3>
              <p className="text-white/80">
                International<br />
                Partnerships
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
