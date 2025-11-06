import React, { useEffect, useRef, useState } from 'react';

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, []);

  return (
    <>
      {/* Animated Footer */}
      <footer 
        ref={footerRef}
        className="relative overflow-hidden"
        style={{ 
          background: 'linear-gradient(135deg, #540405 0%, #ae3e07 50%, #C54915 100%)',
          marginTop: '-1px'
        }}
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div 
            className={`absolute top-0 left-0 w-96 h-96 bg-[#f87004] rounded-full mix-blend-multiply filter blur-3xl opacity-20 transition-all duration-1000 ${
              isVisible ? 'translate-x-0 translate-y-0' : '-translate-x-full -translate-y-full'
            }`}
          />
          <div 
            className={`absolute bottom-0 right-0 w-96 h-96 bg-[#fb9f05] rounded-full mix-blend-multiply filter blur-3xl opacity-20 transition-all duration-1000 delay-300 ${
              isVisible ? 'translate-x-0 translate-y-0' : 'translate-x-full translate-y-full'
            }`}
          />
          <div 
            className={`absolute top-1/2 left-1/2 w-96 h-96 bg-[#fbd288] rounded-full mix-blend-multiply filter blur-3xl opacity-10 transition-all duration-1000 delay-500 ${
              isVisible ? 'scale-100' : 'scale-0'
            }`}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Main content grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Column 1 - Brand */}
            <div 
              className={`transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="group">
                <h3 className="text-[#fbd288] text-2xl font-bold mb-4 transition-all duration-300 group-hover:text-[#fb9f05] group-hover:scale-105 inline-block">
                  Campus Bites
                </h3>
                <div className="h-1 w-16 bg-gradient-to-r from-[#f87004] to-[#fb9f05] mb-4 transition-all duration-300 group-hover:w-24"></div>
              </div>
              <p className="text-white/90 leading-relaxed">
                The best food ordering platform for your campus needs. Delicious meals, delivered fresh!
              </p>
            </div>

            {/* Column 2 - Quick Links */}
            <div 
              className={`transition-all duration-700 delay-200 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <h3 className="text-[#fbd288] text-2xl font-bold mb-4">Quick Links</h3>
              <div className="h-1 w-16 bg-gradient-to-r from-[#f87004] to-[#fb9f05] mb-4"></div>
              <ul className="space-y-3">
                {[
                  { name: 'Menu', href: '/menu' },
                  { name: 'About Us', href: '/about' },
                  { name: 'Contact', href: '/contact' },
                  { name: 'FAQ', href: '/faq' }
                ].map((link, index) => (
                  <li 
                    key={link.name}
                    className={`transition-all duration-500 ${
                      isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                    }`}
                    style={{ transitionDelay: `${400 + index * 100}ms` }}
                  >
                    <a 
                      href={link.href} 
                      className="text-white/90 hover:text-[#fbd288] transition-all duration-300 inline-flex items-center group"
                    >
                      <span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">→</span>
                      <span className="group-hover:translate-x-2 transition-transform duration-300">{link.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3 - Contact */}
            <div 
              className={`transition-all duration-700 delay-300 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <h3 className="text-[#fbd288] text-2xl font-bold mb-4">Contact Us</h3>
              <div className="h-1 w-16 bg-gradient-to-r from-[#f87004] to-[#fb9f05] mb-4"></div>
              <address className="text-white/90 not-italic space-y-2">
                <p className="flex items-start hover:text-[#fbd288] transition-colors duration-300">
                  <span className="mr-2">📍</span>
                  <span>CSE 4th year<br />University Campus</span>
                </p>
                <p className="flex items-center hover:text-[#fbd288] transition-colors duration-300">
                  <span className="mr-2">✉️</span>
                  <span>canteen@campusbites.com</span>
                </p>
                <p className="flex items-center hover:text-[#fbd288] transition-colors duration-300">
                  <span className="mr-2">📞</span>
                  <span>(123) 456-7890</span>
                </p>
              </address>
              
              {/* Social Icons */}
              <div className="flex gap-4 mt-6">
                {['F', 'T', 'I', 'L'].map((icon, index) => (
                  <div
                    key={icon}
                    className={`w-10 h-10 bg-white/10 hover:bg-[#f87004] rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 hover:rotate-12 ${
                      isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                    }`}
                    style={{ transitionDelay: `${700 + index * 100}ms` }}
                  >
                    <span className="text-white font-bold">{icon}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div 
            className={`pt-8 border-t border-white/20 transition-all duration-700 delay-500 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-white/90 text-center md:text-left">
                © {new Date().getFullYear()} Campus Bites. All rights reserved.
              </p>
              <div className="flex gap-6 text-sm">
                <a href="/privacy" className="text-white/90 hover:text-[#fbd288] transition-colors duration-300">
                  Privacy Policy
                </a>
                <a href="/terms" className="text-white/90 hover:text-[#fbd288] transition-colors duration-300">
                  Terms of Service
                </a>
              </div>
            </div>
          </div>
        </div>


      </footer>
    </>
  );
};

export default Footer;