import React from 'react';

const Footer = () => {
  return (
    <footer 
      className="relative overflow-hidden"
      style={{ marginTop: '-1px' }}
    >
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("/images/FooterImage.avif")',
          opacity: 0.7
        }}
      />
      
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-white text-xl sm:text-2xl font-bold mb-2 sm:mb-3">Campus Bites</h3>
            <p className="text-gray-200 text-sm sm:text-base">
              The best food ordering platform for your campus needs. Delicious meals, delivered fresh!
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Quick Links</h3>
            <ul className="space-y-1.5 sm:space-y-2">
              <li><a href="/menu" className="text-gray-200 hover:text-white transition-colors text-sm sm:text-base">Menu</a></li>
              <li><a href="/about" className="text-gray-200 hover:text-white transition-colors text-sm sm:text-base">About Us</a></li>
              <li><a href="/contact" className="text-gray-200 hover:text-white transition-colors text-sm sm:text-base">Contact</a></li>
              <li><a href="/faq" className="text-gray-200 hover:text-white transition-colors text-sm sm:text-base">FAQ</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Contact Us</h3>
            <address className="text-gray-200 not-italic space-y-1.5 sm:space-y-2 text-sm sm:text-base">
              <p>CSE 4th year<br />University Campus</p>
              <p>canteen@campusbites.com</p>
              <p>(123) 456-7890</p>
            </address>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-gray-400/30">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-200 text-sm">
              © {new Date().getFullYear()} Campus Bites. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="/privacy" className="text-gray-200 hover:text-white transition-colors">Privacy Policy</a>
              <a href="/terms" className="text-gray-200 hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;