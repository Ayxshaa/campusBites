import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Categories = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [visualOffset, setVisualOffset] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
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

  // Create infinite array (categories + categories)
  const infiniteCategories = [...categories, ...categories];

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

  return (
    <div className="py-12 bg-gradient-to-br from-orange-100 via-orange-50 to-pink-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Browse Our Categories
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Find exactly what you're craving
          </p>
        </div>

        <div className="mt-10 relative">
          {/* Left Arrow */}
          <button
            onClick={() => handleScroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all hover:scale-105"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>

          {/* Cards Container */}
          <div className="bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-sm rounded-[3rem] shadow-2xl p-12 mx-16 overflow-hidden">
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
                    <div className={`bg-gradient-to-br ${category.color} rounded-3xl p-6 pt-20 shadow-xl transform transition-transform hover:scale-105`}>
                      {/* Product Info */}
                      <div className="text-white space-y-3">
                        <h3 className="text-xl font-bold text-center tracking-wide">{category.name}</h3>
                        
                        {/* Quantity */}
                        <div className="text-center">
                          <span className="text-3xl font-bold">{category.count} Items</span>
                        </div>

                        {/* Browse Button and Quantity */}
                        <div className="flex items-center justify-between gap-2 px-1">
                          <button className="bg-white text-gray-700 px-4 py-2.5 rounded-full text-sm font-bold hover:bg-gray-50 transition-colors shadow-md flex items-center gap-1">
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
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => handleScroll("right")}
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