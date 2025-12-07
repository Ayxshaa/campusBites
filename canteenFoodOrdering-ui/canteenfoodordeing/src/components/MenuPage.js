// components/MenuPage.js
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import ItemsService from '../services/ItemsService';
import { useCart } from '../components/CartContext'; // Import useCart hook
import { Menu, X, ShoppingCart, Star, IndianRupee } from 'lucide-react';
import { useMemo } from 'react';

const MenuPage = () => {
  
  const navigate = useNavigate();
  const location = useLocation();
  
  // Use the cart context instead of local state
  const { cartItems, addToCart, totalItems, totalPrice, clearCart } = useCart();
  
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categoryMenuOpen, setCategoryMenuOpen] = useState(false);
  
  // Define the categories
  const categories = useMemo(() => ['All', 'Breakfast', 'Lunch', 'Snacks', 'Beverages'], []);

 useEffect(() => {
  const itemsService = new ItemsService();
  loadMenuItems(itemsService);

  const params = new URLSearchParams(location.search);
  const categoryParam = params.get('category');

  if (categoryParam && categories.includes(categoryParam)) {
    setSelectedCategory(categoryParam);
  }

  if (location.state?.clearCart) {
    clearCart();
    window.history.replaceState({}, document.title);
  }
}, [location.search, location.state, clearCart, categories]);


  const loadMenuItems = (itemsService) => {
    itemsService.getItems()
      .then(response => {
        console.log('API Response:', response.data);
        setMenuItems(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching menu items:', error);
        setError('Failed to load menu items. Please try again later.');
        setLoading(false);
      });
  };

  const toggleCategoryMenu = () => {
    setCategoryMenuOpen(!categoryMenuOpen);
  };

  const selectCategory = (category) => {
  setSelectedCategory(category);

  // Update the URL with the selected category
  navigate(`?category=${category}`);

  // Close the menu on mobile
  if (window.innerWidth < 768) {
    setCategoryMenuOpen(false);
  }
};

  // Function to filter menu items by category (case-insensitive and trimmed)
  const filteredMenuItems = selectedCategory === 'All' 
    ? menuItems 
    : menuItems.filter(item => {
        const itemCategory = item.category ? item.category.trim() : '';
        const selectedCat = selectedCategory.trim();
        return itemCategory.toLowerCase() === selectedCat.toLowerCase();
      });

  // Function to render stars based on rating
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

  // Function to handle add to cart, now using addToCart from context
  const handleAddToCart = (item) => {
    addToCart(item);
    toast.success(`${item.name} added to cart!`, {
      position: "top-right",
      autoClose: 2000,
    });
  };
  
  // Function to handle checkout button click
  const handleCheckout = () => {
    // Navigate to checkout page with cart data from context
    navigate('/checkout', {
      state: {
        cartItems: cartItems,
        cartTotal: totalPrice
      }
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 bg-gradient-to-br from-orange-50/50 via-orange-50/30 to-orange-100/50">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed top-20 left-0 right-0 mx-10 bg-white/95 backdrop-blur-sm border border-red-200/50 p-4 rounded-2xl shadow-sm z-50">
        <div className="text-red-600 mb-3 text-sm">{error}</div>
        <button 
          className="bg-red-500/10 border border-red-200 text-red-600 font-medium py-2 px-4 rounded-lg hover:bg-red-500/15 transition-all duration-200 text-sm"
          onClick={() => loadMenuItems(new ItemsService())}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-orange-50/50 via-orange-50/30 to-orange-100/50 min-h-screen pt-16">
      {/* Mobile Category Toggle Button */}
      <div className="md:hidden fixed top-16 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-100 z-20 p-3 sm:p-4">
        <button 
          onClick={toggleCategoryMenu}
          className="flex items-center justify-between w-full p-2.5 bg-orange-500/10 border border-orange-200/50 text-orange-600 rounded-lg hover:bg-orange-500/15 transition-all duration-200"
        >
          <span className="font-medium text-sm">Categories: {selectedCategory}</span>
          {categoryMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      <div className="flex">
        {/* Categories Side Column - Desktop */}
        <div className="hidden md:block w-64 bg-white/95 backdrop-blur-sm shadow-sm border-r border-gray-100 fixed left-0 top-16 bottom-0 overflow-y-auto z-10">
          <div className="p-5 bg-orange-500/5 border-b border-orange-100/50">
            <h2 className="text-lg font-bold text-gray-800">Categories</h2>
          </div>
          <ul className="py-2">
            {categories.map((category, index) => (
              <li key={category}>
                <button
                  onClick={() => selectCategory(category)}
                  className={`w-full text-left py-2.5 px-5 border-b border-gray-100/50 transition-all duration-200 flex items-center text-sm ${
                    selectedCategory === category
                      ? 'bg-orange-500/10 text-orange-600 font-medium border-l-4 border-l-orange-500'
                      : 'hover:bg-gray-50/80 text-gray-700'
                  }`}
                >
                  {index > 0 && (
                    <span className="mr-3 w-6 h-6 flex items-center justify-center bg-orange-500/10 text-orange-600 rounded-lg text-xs font-semibold border border-orange-200/50">
                      {index}
                    </span>
                  )}
                  <span className="font-medium">{category}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Mobile Categories - Collapsible */}
        {categoryMenuOpen && (
          <div className="md:hidden fixed top-[88px] sm:top-[96px] left-0 right-0 bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-100 z-20 max-h-64 overflow-y-auto">
            <ul>
              {categories.map((category, index) => (
                <li key={category}>
                  <button
                    onClick={() => selectCategory(category)}
                    className={`w-full text-left py-2.5 px-5 border-b border-gray-100/50 transition-all duration-200 flex items-center text-sm ${
                      selectedCategory === category
                        ? 'bg-orange-500/10 text-orange-600 font-medium border-l-4 border-l-orange-500'
                        : 'hover:bg-gray-50/80 text-gray-700'
                    }`}
                  >
                    {index > 0 && (
                      <span className="mr-3 w-6 h-6 flex items-center justify-center bg-orange-500/10 text-orange-600 rounded-lg text-xs font-semibold border border-orange-200/50">
                        {index}
                      </span>
                    )}
                    <span className="font-medium">{category}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {/* Main Content Area - Responsive positioning */}
        <div className="md:ml-64 flex-1 p-4 sm:p-6 pt-28 sm:pt-32 md:pt-6">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">Our Menu</h1>
          
          {/* Menu Items Grid */}
          <div className="max-w-6xl mx-auto">
            {filteredMenuItems.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100">
                <p className="text-gray-500">No menu items available for this category</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {filteredMenuItems.map((item, index) => (
                  <div key={item.id || index} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md hover:border-orange-200 transition-all duration-200 group">
                    <div className="relative h-40 sm:h-48 w-full overflow-hidden">
                      {item.image ? (
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                      <div className="absolute top-2 right-2 bg-orange-500/95 backdrop-blur-sm px-2.5 py-1 rounded-lg text-xs border border-orange-300 shadow-sm">
                        <span className="text-white font-semibold flex items-center">
                          <IndianRupee className="w-3 h-3 mr-0.5" />
                          {typeof item.price === 'number' ? item.price.toFixed(2) : item.price}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.name}</h3>
                      
                      <div className="flex items-center mb-3">
                        <div className="flex text-sm mr-2">
                          {renderStars(item.rating)}
                        </div>
                        <span className="text-gray-500 text-xs">({item.rating})</span>
                      </div>
                      
                      <button 
                        onClick={() => handleAddToCart(item)}
                        className="w-full bg-orange-500/10 border-2 border-orange-300 text-orange-600 font-medium py-2.5 px-4 rounded-lg hover:bg-orange-500/20 hover:border-orange-400 transition-all duration-200 flex items-center justify-center text-sm group-hover:shadow-md"
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Cart Summary - Only show if cart has items */}
      {cartItems.length > 0 && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-30">
          <div className="bg-white/95 backdrop-blur-sm shadow-lg rounded-2xl p-3 sm:p-4 border border-gray-100 min-w-[180px] sm:min-w-[200px]">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-gray-800 text-xs sm:text-sm">Cart</span>
              <span className="bg-orange-500/10 text-orange-600 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg text-xs font-semibold border border-orange-200/50">
                {totalItems} {totalItems === 1 ? 'item' : 'items'}
              </span>
            </div>
            <div className="text-gray-800 font-medium text-xs sm:text-sm mb-3 flex items-center">
              <IndianRupee className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-0.5" />
              {totalPrice.toFixed(2)}
            </div>
            <button 
              onClick={handleCheckout}
              className="w-full bg-orange-500/10 border border-orange-200 text-orange-600 font-medium py-1.5 sm:py-2 px-3 sm:px-4 rounded-lg hover:bg-orange-500/15 transition-all duration-200 text-xs sm:text-sm"
            >
              Checkout
            </button>
          </div>
        </div>  
      )}
    </div>
  );
};

export default MenuPage;