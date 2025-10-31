import React from 'react';
import { useNavigate } from 'react-router-dom';
import ImageCarousel from './ImageCarousel';
import { useCart } from './CartContext'; // Import the useCart hook
import { ShoppingCart } from 'lucide-react'; // Import the cart icon
import Categories from './Categories';

const LandingPage = () => {
  const navigate = useNavigate();
  // Use the cart context to access cart functionality
  const { addToCart } = useCart();

  

  // Popular items - Now with proper structure to match MenuPage items
  const popularItems = [
    { 
      id: 'p1', 
      name: 'Chicken Sandwich', 
      price: 204.99, 
      rating: 4.8, 
      image: 'images/grilledsandwich.jpg',
      category: 'Lunch'
    },
    { 
      id: 'p2', 
      name: 'Veggie Wrap', 
      price: 39.99, 
      rating: 4.5, 
      image: 'images/vegie.jpg',
      category: 'Lunch' 
    },
    { 
      id: 'p3', 
      name: 'Cheese Pizza', 
      price: 500.49, 
      rating: 4.7, 
      image: 'images/Pizza.jpg',
      category: 'Fast Food'
    },
    { 
      id: 'p4', 
      name: 'Fruit Smoothie', 
      price: 200.99, 
      rating: 4.6, 
      image: 'images/fruitsmoothie.jpg',
      category: 'Beverages'
    },
  ];

  // Function to handle add to cart, using the same approach as MenuPage
  const handleAddToCart = (item) => {
    addToCart(item);
    // Show a brief notification (optional)
    alert(`${item.name} added to cart!`);
  };

  // Function to render stars based on rating (same as MenuPage)
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={`full-${i}`} className="text-yellow-400">★</span>);
    }
    
    if (halfStar) {
      stars.push(<span key="half" className="text-yellow-400">★</span>);
    }
    
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="text-gray-300">☆</span>);
    }
    
    return stars;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - redesigned to match the screenshot */}
      <div className="relative bg-gradient-to-r from-orange-50 via-orange-50 to-orange-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-14 md:py-18 lg:py-20">
          <div className="lg:grid lg:grid-cols-2 lg:gap-10 items-center">
            {/* Left copy */}
            <div>
              <h1 className="font-extrabold tracking-tight text-gray-900 leading-tight" style={{ fontFamily: 'Merriweather, serif' }}>
                <span className="block text-4xl md:text-5xl lg:text-6xl">Campus Bites:</span>
                <span className="block mt-2 text-4xl md:text-5xl lg:text-6xl">Fast, Fresh &amp; Delicious</span>
              </h1>
              <p className="mt-6 max-w-xl text-base md:text-lg text-gray-600">
                Skip the lines and order ahead! Get your favorite campus food delivered or ready for pickup when you arrive.
              </p>
              <div className="mt-8 flex items-center space-x-5">
                <button onClick={() => navigate('/menu')} className="bg-red-500 text-white font-semibold py-3 px-6 rounded-full shadow-md hover:bg-red-600 transition">
                  Order Now
                </button>
                <button aria-label="Play" className="h-11 w-11 rounded-full bg-black text-white grid place-items-center shadow-md hover:opacity-90">
                  <span className="ml-0.5">▶</span>
                </button>
              </div>
            </div>

            {/* Right visual */}
            <div className="relative mt-12 lg:mt-0">
              {/* Bowl image */}
              <div className="relative mx-auto w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden ring-8 ring-orange-200 shadow-xl">
                <img src="images/main.jpeg" alt="Healthy bowl" className="w-full h-full object-cover" />
              </div>

              {/* 20% Off badge */}
              <div className="absolute -top-4 -right-2 sm:-right-6 lg:-right-4 bg-lime-300 text-gray-800 rounded-full w-20 h-20 sm:w-24 sm:h-24 grid place-items-center font-extrabold shadow-md" style={{ fontFamily: 'Merriweather, serif' }}>
                <div className="text-center">
                  <div className="text-xl sm:text-2xl">20%</div>
                  <div className="text-xs sm:text-sm">Off</div>
                </div>
              </div>

              {/* Info card overlapping */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur rounded-2xl shadow-xl px-5 py-4 w-[90%] sm:w-80">
                <div className="flex items-start space-x-3">
                  <div className="text-gray-800 text-xl">🚚</div>
                  <div>
                    <p className="font-semibold text-gray-900">Fast Delivery</p>
                    <p className="text-xs text-gray-500">Promise to Deliver within 90 Mins</p>
                  </div>
                </div>
                <div className="mt-4 flex items-start space-x-3">
                  <div className="text-gray-800 text-xl">📦</div>
                  <div>
                    <p className="font-semibold text-gray-900">Pick Up</p>
                    <p className="text-xs text-gray-500">Pickup delivery at your doorstep</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Subtle wavy divider at bottom of hero (small waves) */}
        <div className="absolute inset-x-0 bottom-0 translate-y-6 pointer-events-none">
          <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" className="w-full h-16" preserveAspectRatio="none">
            {/* Slightly larger multi-crest wave */}
            <path d="M0,40 C120,15 240,65 360,40 C480,15 600,65 720,40 C840,15 960,65 1080,40 C1200,15 1320,65 1440,40 L1440,80 L0,80 Z" fill="#ffffff"></path>
          </svg>
        </div>
      </div>

      {/* New Features Section - styled to match hero */}
      <section id="features" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center mb-12">
            <span className="block text-3xl sm:text-4xl font-extrabold text-gray-900" style={{ fontFamily: 'Merriweather, serif' }}>
              Why Choose <span className="text-orange-600">Campus Bites</span>
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="group relative bg-gradient-to-b from-white to-orange-50 p-6 rounded-2xl shadow-md ring-1 ring-orange-100 hover:shadow-lg hover:-translate-y-0.5 transition duration-300">
              <div className="mb-4 h-12 w-12 rounded-full bg-orange-100 text-orange-600 grid place-items-center text-2xl">🍔</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Merriweather, serif' }}>Diverse Food Options</h3>
              <p className="text-gray-600">From healthy salads to comfort food, find all your favorite campus dining options in one place.</p>
            </div>

            <div className="group relative bg-gradient-to-b from-white to-orange-50 p-6 rounded-2xl shadow-md ring-1 ring-orange-100 hover:shadow-lg hover:-translate-y-0.5 transition duration-300">
              <div className="mb-4 h-12 w-12 rounded-full bg-orange-100 text-orange-600 grid place-items-center text-2xl">⏱️</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Merriweather, serif' }}>Fast Delivery</h3>
              <p className="text-gray-600">Get your food in minutes. Our campus network ensures you're never waiting long.</p>
            </div>

            <div className="group relative bg-gradient-to-b from-white to-orange-50 p-6 rounded-2xl shadow-md ring-1 ring-orange-100 hover:shadow-lg hover:-translate-y-0.5 transition duration-300">
              <div className="mb-4 h-12 w-12 rounded-full bg-orange-100 text-orange-600 grid place-items-center text-2xl">💰</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Merriweather, serif' }}>Student Discounts</h3>
              <p className="text-gray-600">Enjoy exclusive deals and promotions only available to campus residents and students.</p>
            </div>

            <div className="group relative bg-gradient-to-b from-white to-orange-50 p-6 rounded-2xl shadow-md ring-1 ring-orange-100 hover:shadow-lg hover:-translate-y-0.5 transition duration-300">
              <div className="mb-4 h-12 w-12 rounded-full bg-orange-100 text-orange-600 grid place-items-center text-2xl">📱</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Merriweather, serif' }}>Easy to Use</h3>
              <p className="text-gray-600">Our intuitive app makes ordering food as simple as sending a text. Just a few taps and you're done!</p>
            </div>

            <div className="group relative bg-gradient-to-b from-white to-orange-50 p-6 rounded-2xl shadow-md ring-1 ring-orange-100 hover:shadow-lg hover:-translate-y-0.5 transition duration-300">
              <div className="mb-4 h-12 w-12 rounded-full bg-orange-100 text-orange-600 grid place-items-center text-2xl">🔔</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Merriweather, serif' }}>Real-time Tracking</h3>
              <p className="text-gray-600">Follow your order from kitchen to delivery with our real-time tracking system.</p>
            </div>

            <div className="group relative bg-gradient-to-b from-white to-orange-50 p-6 rounded-2xl shadow-md ring-1 ring-orange-100 hover:shadow-lg hover:-translate-y-0.5 transition duration-300">
              <div className="mb-4 h-12 w-12 rounded-full bg-orange-100 text-orange-600 grid place-items-center text-2xl">🎁</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Merriweather, serif' }}>Rewards Program</h3>
              <p className="text-gray-600">Earn points with every order and redeem them for free food, discounts, and exclusive perks.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <Categories />

      {/* Popular Items */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Popular Right Now
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Campus favorites you don't want to miss
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {popularItems.map((item, index) => (
              <div key={index} className="relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-40 object-cover"
                  />
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                    <div className="flex items-center">
                      {renderStars(item.rating)}
                      <span className="ml-1 text-gray-600 text-xs">({item.rating})</span>
                    </div>
                  </div>
                  <p className="mt-1 text-sm font-bold text-gray-900">₹{item.price.toFixed(2)}</p>
                  <button 
                    onClick={() => handleAddToCart(item)}
                    className="mt-4 w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition duration-300 flex items-center justify-center"
                  >
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-orange-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
            <div>
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                Ready to Order?
              </h2>
              <p className="mt-3 max-w-md text-lg text-orange-100">
                Create an account now to start ordering from Campus Bites and earn rewards with every purchase.
              </p>
              <div className="mt-8 space-x-4">
                <a href="/menu" className="inline-block bg-orange-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-orange-700 transition duration-300">
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

      {/* Footer */}
      <footer className="bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-white text-lg font-bold mb-4">Campus Bites</h3>
              <p className="text-gray-300">The best food ordering platform for your campus needs.</p>
            </div>
            <div>
              <h3 className="text-white text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="/menu" className="text-gray-300 hover:text-orange-300">Menu</a></li>
                <li><a href="/about" className="text-gray-300 hover:text-orange-300">About Us</a></li>
                <li><a href="/contact" className="text-gray-300 hover:text-orange-300">Contact</a></li>
                <li><a href="/faq" className="text-gray-300 hover:text-orange-300">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white text-lg font-bold mb-4">Contact Us</h3>
              <address className="text-gray-300 not-italic">
                <p>CSE 4th year</p>
                <p>University Campus</p>
                <p>Email: canteen@campusbites.com</p>
                <p>Phone: (123) 456-7890</p>
              </address>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center">
            <p className="text-gray-300">© {new Date().getFullYear()} Campus Bites. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;