import React, { useState, useEffect, useRef } from 'react';
import { Utensils, Timer, BadgePercent, Smartphone, BellRing, Gift } from 'lucide-react';

const Features = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [visibleFeatures, setVisibleFeatures] = useState([]);
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const hasAnimatedRef = useRef(false);

  const features = [
    { Icon: Utensils, title: 'Diverse Food Options', description: 'From healthy salads to comfort food, find all your favorite campus dining options in one place.' },
    { Icon: Timer, title: 'Fast Delivery', description: 'Get your food in minutes. Our campus network ensures you\'re never waiting long.' },
    { Icon: BadgePercent, title: 'Student Discounts', description: 'Enjoy exclusive deals and promotions only available to campus residents and students.' },
    { Icon: Smartphone, title: 'Easy to Use', description: 'Our intuitive app makes ordering food as simple as sending a text. Just a few taps and you\'re done!' },
    { Icon: BellRing, title: 'Real-time Tracking', description: 'Follow your order from kitchen to delivery with our real-time tracking system.' },
    { Icon: Gift, title: 'Rewards Program', description: 'Earn points with every order and redeem them for free food, discounts, and exclusive perks.' },
  ];

  useEffect(() => {
    // Check if animation has already run in this session
    const hasAnimated = sessionStorage.getItem('featuresAnimated');
    if (hasAnimated === 'true') {
      setIsVisible(true);
      setVisibleFeatures([0, 1, 2, 3, 4, 5]);
      hasAnimatedRef.current = true;
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Only trigger when scrolling down and element is entering viewport
          if (entry.isIntersecting && !hasAnimatedRef.current) {
            hasAnimatedRef.current = true;
            setIsVisible(true);
            sessionStorage.setItem('featuresAnimated', 'true');
            
            // Animate features in pairs - each row (pair) animates together
            // Row 1: indices 0, 1
            // Row 2: indices 2, 3  
            // Row 3: indices 4, 5
            for (let row = 0; row < 3; row++) {
              const leftIndex = row * 2; // 0, 2, 4
              const rightIndex = row * 2 + 1; // 1, 3, 5
              
              setTimeout(() => {
                setVisibleFeatures(prev => {
                  if (!prev.includes(leftIndex) && !prev.includes(rightIndex)) {
                    return [...prev, leftIndex, rightIndex];
                  }
                  return prev;
                });
              }, 500 + (row * 300)); // 500ms for title, then 300ms between each row
            }
          }
        });
      },
      { 
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px' // Trigger when element is 100px from bottom of viewport
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section id="features" className="py-10 sm:py-12 md:py-16 bg-white relative overflow-hidden" ref={sectionRef}>
      {/* bottom gradient overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-0 h-1/2 w-1/3"
        style={{
          background: 'linear-gradient(0deg, rgba(196,72,20,0.85) 0%, rgba(196,72,20,0.55) 35%, rgba(196,72,20,0.2) 65%, rgba(196,72,20,0) 100%)',
          maskImage: 'linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 65%, rgba(0,0,0,0) 100%)',
          WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 65%, rgba(0,0,0,0) 100%)'
        }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 
          ref={titleRef}
          className={`text-center mb-8 sm:mb-12 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <span className="block text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900">
            Why Choose <span className="text-orange-600">Campus Bites</span>?
          </span>
          <span className="mt-3 inline-block h-1 w-20 sm:w-24 rounded-full bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500"></span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          {features.map((feature, index) => {
            const isEven = index % 2 === 0; // Left column (0, 2, 4)
            const isVisible = visibleFeatures.includes(index);
            
            return (
              <div
                key={index}
                className={`group relative p-5 rounded-2xl shadow-md ring-1 ring-orange-100 bg-white/80 backdrop-blur-sm hover:shadow-lg hover:-translate-y-0.5 transition duration-300 max-w-md w-full mx-auto ${
                  isVisible
                    ? isEven
                      ? 'animate-slide-in-left opacity-100 translate-x-0'
                      : 'animate-slide-in-right opacity-100 translate-x-0'
                    : isEven
                      ? 'opacity-0 -translate-x-20'
                      : 'opacity-0 translate-x-20'
                }`}
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orange-500/10 via-amber-400/10 to-yellow-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                <div className="relative z-10">
                  <div className="mb-3 sm:mb-4 h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-gradient-to-br from-orange-50 to-amber-50 text-orange-600 grid place-items-center">
                    {feature.Icon ? <feature.Icon className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={2.2} /> : null}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;