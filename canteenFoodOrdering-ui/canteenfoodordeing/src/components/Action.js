import React, { useEffect, useRef, useState } from 'react';

const Action = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const palette = ['#fbd288', '#f87004', '#fb9f05', '#ae3e07'];

  useEffect(() => {
    if (!sectionRef.current) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.25 }
    );
    io.observe(sectionRef.current);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative bg-gradient-to-r from-orange-50 via-orange-100 to-orange-700"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
          <div>
            <h2
              className={`font-extrabold text-4xl sm:text-5xl lg:text-6xl transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{ color: '#ae3e07' }}
            >
              Ready to Order?
            </h2>
            <span
              className={`mt-3 inline-block h-1 w-28 rounded-full transition-all duration-700 ${
                isVisible ? 'opacity-90 scale-x-100' : 'opacity-0 scale-x-50'
              }`}
              style={{ backgroundColor: '#ae3e07' }}
            />
            <p className="mt-3 max-w-md text-lg text-green-900">
              Create an account now to start ordering from Campus Bites and earn rewards with every purchase.
            </p>
            <div className="mt-8 space-x-4">
              <a
                href="/menu"
                className="inline-block text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 hover:brightness-110"
                style={{ backgroundColor: '#ae3e07' }}
              >
                View Menu
              </a>
            </div>
          </div>
          <div className="mt-8 lg:mt-0">
            <div className="rounded-lg shadow-xl overflow-hidden">
              <img src="images/phone.jpeg" alt="Campus Bites app on phone" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Action;


