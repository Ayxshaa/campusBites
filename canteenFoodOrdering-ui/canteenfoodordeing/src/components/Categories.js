import React from 'react';
import { Coffee, Utensils, Pizza, Wine, Sunrise } from 'lucide-react';

const Categories = () => {
  const categories = [
    { 
      name: 'Lunch', 
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400', 
      count: 18,
      icon: Utensils
    },
    { 
      name: 'Fast Food', 
      image: 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=400', 
      count: 10,
      icon: Pizza
    },
    { 
      name: 'Beverages', 
      image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400', 
      count: 8,
      icon: Wine
    },
    { 
      name: 'Dinner', 
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400', 
      count: 15,
      icon: Utensils
    },
    { 
      name: 'Breakfast', 
      image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=400', 
      count: 12,
      icon: Coffee
    },
  ];

  return (
    <div className="relative overflow-hidden py-20 min-h-[560px] bg-white">
      {/* Top right gradient overlay */}
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
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            Browse Our <span className="text-orange-600">Categories</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Find exactly what you're craving
          </p>
        </div>

        <div className="mt-16 relative max-w-6xl mx-auto">
          {/* Cards Container */}
          <div className="flex justify-center items-center gap-6 overflow-x-auto pb-4 px-4 md:overflow-x-visible md:px-0 scrollbar-hide md:scrollbar-default">
            {categories.map((category, idx) => {
              const Icon = category.icon;
              
              return (
                <div
                  key={`${category.name}-${idx}`}
                  className="w-[180px] sm:w-[200px] md:w-[220px] flex-shrink-0 md:flex-shrink-0 cursor-pointer"
                >
                  {/* Flip Card */}
                  <div className="flip-card w-full h-[240px] sm:h-[260px] md:h-[280px]">
                    <div className="flip-card-inner w-full h-full relative">
                      {/* Front of card - Show category icon */}
                      <div className="flip-card-front absolute w-full h-full rounded-2xl overflow-hidden shadow-xl">
                        <div className="relative w-full h-full flex items-center justify-center bg-gray-900">
                          {/* Animated border effect */}
                          <div className="absolute inset-0 animate-spin-slow">
                            <div className="w-full h-full" style={{
                              background: 'linear-gradient(90deg, transparent, #ff9966, #ff9966, #ff9966, #ff9966, transparent)'
                            }} />
                          </div>
                          
                          {/* Content */}
                          <div className="relative bg-gray-900 rounded-2xl w-[calc(100%-4px)] h-[calc(100%-4px)] flex flex-col items-center justify-center gap-6 text-white p-6">
                            <Icon size={60} strokeWidth={1.5} />
                            <strong className="text-lg">{category.name}</strong>
                          </div>
                        </div>
                      </div>

                      {/* Back of card - Show image with title and button */}
                      <div className="flip-card-back absolute w-full h-full rounded-2xl overflow-hidden shadow-xl">
                        {/* Background Image */}
                        <div className="absolute inset-0">
                          <img 
                            src={category.image} 
                            alt={category.name}
                            className="w-full h-full object-cover"
                          />
                          {/* Overlay gradient */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                        </div>

                        {/* Content on top of image */}
                        <div className="relative h-full flex flex-col justify-end p-6 text-white">
                          <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                          <p className="text-sm mb-4 text-gray-200">{category.count} Items</p>
                          
                          <a href="/menu">
                            <button 
                              className="bg-white text-gray-900 px-4 py-2 rounded-full text-sm font-bold hover:bg-gray-100 transition-all hover:scale-105 shadow-lg w-full">
                                Browse Now →
                            </button>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .animate-spin-slow {
          animation: spin-slow 5s linear infinite;
        }

        .flip-card {
          perspective: 1000px;
        }

        .flip-card-inner {
          transition: transform 0.6s;
          transform-style: preserve-3d;
        }

        @media (hover: hover) {
          .flip-card:hover .flip-card-inner {
            transform: rotateY(180deg);
          }
        }

        .flip-card-front,
        .flip-card-back {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }

        .flip-card-back {
          transform: rotateY(180deg);
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        @media (min-width: 768px) {
          .scrollbar-default {
            -ms-overflow-style: auto;
            scrollbar-width: auto;
          }

          .scrollbar-default::-webkit-scrollbar {
            display: block;
          }
        }
      `}</style>
    </div>
  );
};

export default Categories;