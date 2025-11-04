import React from 'react';
import { useNavigate } from 'react-router-dom';
import ImageCarousel from './ImageCarousel';
import { useCart } from './CartContext'; // Import the useCart hook
import { ShoppingCart } from 'lucide-react'; // Import the cart icon
import Categories from './Categories';
import Hero from './Hero';
import Features from './Features';

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
      <Hero />
      <Features />

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