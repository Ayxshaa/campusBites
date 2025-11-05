import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Categories = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [visualOffset, setVisualOffset] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const DEFAULT_SPEED = 0.08; // pixels per ms (~80px/s)
  const marqueeSpeedRef = useRef(DEFAULT_SPEED);
  const rafIdRef = useRef(null);
  const lastTsRef = useRef(null);
  
  const SCROLL_TRANSITION_DURATION = 300;
  const CARD_WIDTH = 280;
  const GAP = 24;
  
  const categories = [
    { name: 'Lunch', image: 'images/lunch.jpg', count: 18, price: 5.00, rating: 5.0, color: 'from-red-400 to-red-500' },
    { name: 'Fast Food', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuDicjACF8jqE3vr1WxFItibReuZEnXbVclA&s', count: 10, price: 3.00, rating: 5.0, color: 'from-orange-400 to-orange-500' },
    { name: 'Beverages', image: 'images/beverages.jpeg', count: 8, price: 4.00, rating: 5.0, color: 'from-green-400 to-green-500' },
    { name: 'Dinner', image: 'images/lunch.jpg', count: 15, price: 5.00, rating: 5.0, color: 'from-indigo-500 to-indigo-600' },
    { name: 'Breakfast', image: 'images/lunch.jpg', count: 12, price: 4.50, rating: 5.0, color: 'from-pink-400 to-pink-500' },
    { name: 'Desserts', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuDicjACF8jqE3vr1WxFItibReuZEnXbVclA&s', count: 20, price: 6.00, rating: 5.0, color: 'from-purple-400 to-purple-500' },
    { name: 'Snacks', image: 'images/beverages.jpeg', count: 14, price: 3.50, rating: 5.0, color: 'from-yellow-400 to-yellow-500' },
    { name: 'Coffee', image: 'images/beverages.jpeg', count: 9, price: 2.50, rating: 5.0, color: 'from-teal-400 to-teal-500' },
  ];

  // Color palette from provided screenshot (alternating across cards)
  const cardColors = ['#fbd288', '#540405', '#f87004', '#fb9f05', '#ae3e07'];

  // Create infinite array (categories + categories)
  const infiniteCategories = [...categories, ...categories];
  const totalShift = categories.length * (CARD_WIDTH + GAP);

  const handleScroll = useCallback((direction) => {
    if (isScrolling) return;

    setIsScrolling(true);
    setIsTransitioning(true);

    const categoryCount = categories.length;
    const shiftAmount = CARD_WIDTH + GAP;

    // Calculate new index
    let newIndex;
    if (direction === "right") {
      newIndex = (currentIndex + 1) % categoryCount;
    } else {
      newIndex = (currentIndex - 1 + categoryCount) % categoryCount;
    }

    // Calculate target offset
    let targetOffset = visualOffset + (direction === "right" ? -shiftAmount : shiftAmount);

    let finalOffset = targetOffset;
    let doJump = false;

    // Check for wrap around
    if (direction === "right" && currentIndex === categoryCount - 1) {
      finalOffset = 0;
      doJump = true;
    } else if (direction === "left" && currentIndex === 0) {
      finalOffset = -(categoryCount - 1) * shiftAmount;
      doJump = true;
    }

    // Update state with transitional offset
    setVisualOffset(targetOffset);
    setCurrentIndex(newIndex);

    // Wait for transition to complete
    setTimeout(() => {
      if (doJump) {
        // Disable transition for instant jump
        setIsTransitioning(false);
        setVisualOffset(finalOffset);
        
        // Re-enable transition after jump
        requestAnimationFrame(() => {
          setIsTransitioning(true);
          setTimeout(() => setIsTransitioning(false), 50);
        });
      } else {
        setIsTransitioning(false);
      }
      setIsScrolling(false);
    }, SCROLL_TRANSITION_DURATION);

  }, [isScrolling, currentIndex, categories.length, visualOffset]);

  // Marquee-style continuous scroll using requestAnimationFrame
  useEffect(() => {
    function step(timestamp) {
      if (lastTsRef.current == null) {
        lastTsRef.current = timestamp;
      }
      const delta = timestamp - lastTsRef.current;
      lastTsRef.current = timestamp;

      const speed = marqueeSpeedRef.current; // px per ms
      setVisualOffset((prev) => {
        let next = prev - delta * speed; // move right->left
        if (next <= -totalShift) {
          next += totalShift; // wrap seamlessly
        }
        return next;
      });

      rafIdRef.current = requestAnimationFrame(step);
    }

    rafIdRef.current = requestAnimationFrame(step);
    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
      lastTsRef.current = null;
    };
  }, [totalShift]);

  // Arrow controls should adjust marquee position instantly with wrap
  const nudgeBy = useCallback((direction) => {
    const shiftAmount = CARD_WIDTH + GAP;
    setVisualOffset((prev) => {
      let next = direction === 'right' ? prev - shiftAmount : prev + shiftAmount;
      while (next <= -totalShift) next += totalShift;
      while (next > 0) next -= totalShift;
      return next;
    });
  }, [totalShift]);

  // Animate on button press (like before): short slide with easing and pause marquee
  const animateNudge = useCallback((direction) => {
    const shiftAmount = CARD_WIDTH + GAP;
    const originalSpeed = marqueeSpeedRef.current;
    marqueeSpeedRef.current = 0; // pause marquee
    setIsTransitioning(true);
    setVisualOffset((prev) => direction === 'right' ? prev - shiftAmount : prev + shiftAmount);
    setTimeout(() => {
      // normalize after transition completes to keep offset within [-totalShift, 0]
      setIsTransitioning(false);
      setVisualOffset((prev) => {
        let next = prev;
        while (next <= -totalShift) next += totalShift;
        while (next > 0) next -= totalShift;
        return next;
      });
      marqueeSpeedRef.current = originalSpeed || DEFAULT_SPEED; // resume
    }, SCROLL_TRANSITION_DURATION);
  }, [SCROLL_TRANSITION_DURATION, totalShift]);

  return (
    <div className="relative overflow-hidden py-20 min-h-[560px]">
      {/* right-side top->bottom gradient overlay using #C44814 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 right-0 h-1/2 w-1/3"
        style={{
          background: 'linear-gradient(180deg, rgba(196,72,20,0.85) 0%, rgba(196,72,20,0.55) 35%, rgba(196,72,20,0.2) 65%, rgba(196,72,20,0) 100%)',
          maskImage: 'linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 65%, rgba(0,0,0,0) 100%)',
          WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 65%, rgba(0,0,0,0) 100%)'
        }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Browse Our Categories
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Find exactly what you're craving
          </p>
        </div>

        <div className="mt-10 relative w-screen overflow-hidden left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
          {/* Left Arrow */}
          <button
            onClick={() => animateNudge("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all hover:scale-105"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>

          {/* Cards Container - full width, no white parent */}
          <div className="relative pt-16">
            <div 
              className="flex"
              style={{ 
                transform: `translateX(${visualOffset}px)`,
                transition: isTransitioning ? `transform ${SCROLL_TRANSITION_DURATION}ms ease-out` : 'none',
                gap: `${GAP}px`,
                width: `${infiniteCategories.length * (CARD_WIDTH + GAP) - GAP}px`
              }}
            >
              {infiniteCategories.map((category, idx) => (
                <div
                  key={`${category.name}-${idx}`}
                  className="flex-shrink-0 relative"
                  style={{ width: `${CARD_WIDTH}px` }}
                >
                  {/* Product Image - Positioned Above Card */}
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 z-10">
                    <div className="bg-white rounded-full w-32 h-32 flex items-center justify-center shadow-xl border-4 border-white">
                      <div className="w-28 h-28 rounded-full overflow-hidden">
                        <img 
                          src={category.image} 
                          alt={category.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div
                    className="rounded-3xl p-6 pt-20 shadow-xl"
                    style={{ background: cardColors[idx % cardColors.length] }}
                  >
                    {/* Product Info */}
                    <div className={(cardColors[idx % cardColors.length] === '#fbd288') ? 'text-gray-900 space-y-3' : 'text-white space-y-3'}>
                      <h3 className="text-xl font-bold text-center tracking-wide">{category.name}</h3>
                      
                      {/* Quantity */}
                      <div className="text-center">
                        <span className="text-3xl font-bold">{category.count} Items</span>
                      </div>

                      {/* Browse Button and Quantity */}
                      <div className="flex items-center justify-between gap-2 px-1">
                        <button className="bg-white text-gray-700 px-4 py-2.5 rounded-full text-sm font-bold hover:bg-gray-50 transition-colors transition-transform hover:scale-105 shadow-md flex items-center gap-1">
                          Browse Now
                          <span className="text-xs">›</span>
                        </button>
                        <div className="flex items-center gap-1 text-sm font-semibold bg-white/20 backdrop-blur-sm px-2.5 py-1.5 rounded-full">
                          <span className="text-base">★</span>
                          <span>{category.count}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => animateNudge("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all hover:scale-105"
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Categories;