import React from 'react';
import { toast } from 'react-toastify';
import { ShoppingCart, Star, IndianRupee } from 'lucide-react';
import { useCart } from '../components/CartContext'; // Import useCart hook

const TodaySpecial = () => {
  const popularItems = [
    { id: 'special-1', name: 'Pav Bhaji', price: 120.00, rating: 4.8, image: 'images/PavBhaji.jpeg', category: 'Lunch' },
    { id: 'special-2', name: 'Chole Bhature', price: 100.99, rating: 4.5, image: 'images/chole-Bhature.jpg', category: 'Lunch' },
    { id: 'special-3', name: 'Rajma Rice', price: 120.49, rating: 4.7, image: 'images/rajma-chawal.jpg', category: 'Lunch' },
    { id: 'special-4', name: 'Fruit Smoothie', price: 200.99, rating: 4.6, image: 'images/fruitsmoothie.jpg', category: 'Beverages' },
  ];

  // Use the cart context instead of local state
  const { addToCart } = useCart();

  // Function to handle add to cart, now using addToCart from context
  const handleAddToCart = (item) => {
    addToCart(item);
    toast.success(`${item.name} added to cart!`, {
      position: "top-right",
      autoClose: 2000,
    });
  };

  // Function to render stars based on rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />);
    }
    
    if (halfStar) {
      stars.push(<Star key="half" className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />);
    }
    
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-3.5 h-3.5 fill-gray-200 text-gray-200" />);
    }
    
    return stars;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50/50 via-orange-50/30 to-orange-100/50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6 sm:mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
            Today's Special
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 max-w-2xl mx-auto px-4">
            Campus favorites you don't want to miss
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {popularItems.map((item, index) => (
            <div key={item.id || index} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md hover:border-orange-200 transition-all duration-200 group">
              <div className="relative h-40 sm:h-48 w-full overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-orange-500/95 backdrop-blur-sm px-2.5 py-1 rounded-lg text-xs border border-orange-300 shadow-sm">
                  <span className="text-white font-semibold flex items-center">
                    <IndianRupee className="w-3 h-3 mr-0.5" />
                    {item.price.toFixed(2)}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                </div>
                <div className="flex items-center mb-3">
                  <div className="flex mr-2">
                    {renderStars(item.rating)}
                  </div>
                  <span className="text-gray-500 text-xs">({item.rating})</span>
                </div>
                <button 
                  onClick={() => handleAddToCart(item)}
                  className="w-full bg-orange-500/10 border-2 border-orange-300 text-orange-600 font-medium py-2.5 px-4 rounded-lg hover:bg-orange-500/20 hover:border-orange-400 transition-all duration-200 flex items-center justify-center text-sm group-hover:shadow-md">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TodaySpecial;