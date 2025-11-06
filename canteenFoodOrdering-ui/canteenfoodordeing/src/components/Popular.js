import React from 'react';
import { ShoppingCart, Heart } from 'lucide-react';

// Palette aligned with Categories.js
const cardColors = ['#fbd288', '#540405', '#f87004', '#fb9f05', '#ae3e07'];

const DefaultStars = ({ rating = 0 }) => {
  const stars = Math.round(rating);
  return (
    <div className="flex items-center text-yellow-500">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < stars ? 'opacity-100' : 'opacity-30'}>★</span>
      ))}
    </div>
  );
};

/**
 * Popular section component - screenshot styled.
 * Props:
 * - items: Array<{ image, name, price, rating }>
 * - onAddToCart: (item) => void
 * - renderStars: (rating:number) => ReactNode
 * - title?: string (defaults to previous copy)
 * - subtitle?: string
 */
const Popular = ({ items = [], onAddToCart, renderStars, title = 'Popular Right Now', subtitle = "Campus favorites you don't want to miss" }) => {
  const Stars = renderStars || ((r) => <DefaultStars rating={r} />);

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">{title}</h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">{subtitle}</p>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, index) => (
            <div
              key={index}
              className="group relative rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
              style={{ background: `${cardColors[0]}33` }}
            >
              {/* Hover highlight overlay */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                style={{ background: cardColors[4] }}
                aria-hidden="true"
              />

              {/* Top controls */}
              <div className="absolute top-3 right-3 z-10">
                <button className="p-1.5 rounded-full bg-white text-gray-500 group-hover:bg-white/20 group-hover:text-white hover:scale-105 transition">
                  <Heart size={16} />
                </button>
              </div>

              {/* Image */}
              <div className="pt-6 px-6 relative z-10">
                <div className="w-full grid place-items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className={`object-contain ${index === 0 ? 'h-40' : 'h-36'} drop-shadow`}
                  />
                </div>
              </div>

              {/* Body */}
              <div className="p-5 relative z-10">
                <h3 className="text-base font-semibold text-gray-900 group-hover:text-white">{item.name}</h3>
                <div className="mt-2 flex items-center gap-2">
                  <Stars rating={item.rating} />
                  <span className="text-xs text-gray-600 group-hover:text-white/80">({item.rating})</span>
                </div>
                <p className="mt-2 text-sm text-gray-600 group-hover:text-white/80">Delictus facere exerci tationem dolor perspiciatis nulla...</p>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-base font-bold text-rose-700 group-hover:text-white">₹{Number(item.price).toFixed(2)}</span>
                  <button
                    onClick={() => onAddToCart && onAddToCart(item)}
                    className="h-8 w-8 grid place-items-center rounded bg-rose-100 text-rose-700 group-hover:bg-white/20 group-hover:text-white"
                  >
                    <ShoppingCart size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Popular;


