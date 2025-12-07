// components/CartPage.js
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCart } from './CartContext';
import { ShoppingCart, Plus, Minus, Trash2, ArrowLeft, IndianRupee, Package } from 'lucide-react';

const CartPage = () => {
  const navigate = useNavigate();
  const { cartItems, totalItems, totalPrice, updateQuantity, removeFromCart, clearCart } = useCart();
  
  
  

  // Handle quantity decrease
  const handleDecreaseQuantity = (itemId) => {
    const item = cartItems.find(item => item.id === itemId);
    if (item) {
      if (item.quantity <= 1) {
        removeFromCart(itemId);
      } else {
        updateQuantity(itemId, item.quantity - 1);
      }
    }
  };

  // Handle quantity increase
  const handleIncreaseQuantity = (itemId) => {
    const item = cartItems.find(item => item.id === itemId);
    if (item) {
      updateQuantity(itemId, item.quantity + 1);
    }
  };

  // Handle removing item completely
  const handleRemoveItem = (itemId) => {
    removeFromCart(itemId);
  };

  // Handle clearing entire cart
  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your entire cart?')) {
      clearCart();
      toast.success('Cart cleared successfully', {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  // Handle checkout form submission
  const handleCheckout = (e) => {
    e.preventDefault();
    
    if (cartItems.length === 0) {
      toast.warning('Your cart is empty. Please add items before placing an order.', {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    // Here you would typically process the order
   
    
    // Clear cart and navigate to menu
    clearCart();
    navigate('/menu');
  };

  // Navigate back to menu
  const handleBackToMenu = () => {
    navigate('/menu');
  };

 

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50/50 via-orange-50/30 to-orange-100/50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <button
              onClick={handleBackToMenu}
              className="flex items-center text-gray-700 hover:text-orange-600 mr-4 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-1.5" />
              <span className="text-sm font-medium">Back to Menu</span>
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-800 flex items-center">
                <ShoppingCart className="h-6 w-6 mr-2 text-orange-600" />
                Your Cart
              </h1>
              <p className="text-sm text-gray-500 mt-1">{totalItems} {totalItems === 1 ? 'item' : 'items'}</p>
            </div>
          </div>
          {cartItems.length > 0 && (
            <button
              onClick={handleClearCart}
              className="flex items-center text-red-600 hover:text-red-700 bg-white border border-red-200 px-4 py-2 rounded-lg hover:bg-red-50 transition-all duration-200 text-sm font-medium"
            >
              <Trash2 className="h-4 w-4 mr-1.5" />
              Clear Cart
            </button>
          )}
        </div>

        {cartItems.length === 0 ? (
          /* Empty Cart State */
          <div className="text-center py-12 sm:py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-orange-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-orange-200/50">
              <ShoppingCart className="h-8 w-8 sm:h-10 sm:w-10 text-orange-600" />
            </div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">Your cart is empty</h2>
            <p className="text-xs sm:text-sm text-gray-500 mb-6 px-4">Looks like you haven't added any items to your cart yet.</p>
            <button
              onClick={handleBackToMenu}
              className="bg-orange-500/10 border border-orange-200 text-orange-600 font-medium py-2.5 px-6 rounded-lg hover:bg-orange-500/15 transition-all duration-200 text-sm"
            >
              Browse Menu
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Cart Items Section */}
            <div className="lg:col-span-2 order-2 lg:order-1">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-5 border-b border-gray-100 bg-orange-500/5">
                  <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                    <Package className="w-5 h-5 mr-2 text-orange-500/70" />
                    Cart Items ({totalItems} {totalItems === 1 ? 'item' : 'items'})
                  </h2>
                </div>
                
                <div className="divide-y divide-gray-100">
                  {cartItems.map((item) => (
                    <div key={item.id} className="p-4 sm:p-5 hover:bg-gray-50/50 transition-colors">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                        {/* Item Image and Basic Info */}
                        <div className="flex items-center space-x-3 sm:space-x-4 flex-1 min-w-0">
                          {/* Item Image */}
                          <div className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-xl overflow-hidden border border-gray-200">
                            {item.image ? (
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <Package className="h-6 w-6 sm:h-8 sm:w-8 text-gray-400" />
                              </div>
                            )}
                          </div>
                          
                          {/* Item Details */}
                          <div className="flex-1 min-w-0">
                            <h3 className="text-sm sm:text-base font-semibold text-gray-800 truncate mb-1">
                              {item.name}
                            </h3>
                            <p className="text-xs sm:text-sm text-gray-500 flex items-center mb-2">
                              <IndianRupee className="w-3 h-3 mr-0.5" />
                              {item.price.toFixed(2)} per item
                            </p>
                            {item.category && (
                              <span className="inline-block bg-orange-500/10 text-orange-600 text-xs px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg border border-orange-200/50 font-medium">
                                {item.category}
                              </span>
                            )}
                          </div>
                        </div>
                        
                        {/* Quantity Controls and Total - Mobile Layout */}
                        <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-2">
                          {/* Quantity Controls */}
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleDecreaseQuantity(item.id)}
                              className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center transition-all duration-200"
                            >
                              <Minus className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                            </button>
                            <span className="text-sm sm:text-base font-semibold min-w-[24px] sm:min-w-[28px] text-center text-gray-800">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleIncreaseQuantity(item.id)}
                              className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center transition-all duration-200"
                            >
                              <Plus className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                            </button>
                          </div>
                          
                          {/* Item Total & Remove */}
                          <div className="text-right">
                            <p className="text-base sm:text-lg font-bold text-gray-800 flex items-center justify-end mb-1 sm:mb-2">
                              <IndianRupee className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-0.5" />
                              {(item.price * item.quantity).toFixed(2)}
                            </p>
                            <button
                              onClick={() => handleRemoveItem(item.id)}
                              className="text-red-600 hover:text-red-700 text-xs font-medium flex items-center sm:ml-auto"
                            >
                              <Trash2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1" />
                              <span className="hidden sm:inline">Remove</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary & Checkout Section */}
            <div className="lg:col-span-1 order-1 lg:order-2">
              <div className="bg-white rounded-2xl shadow-sm border-2 border-orange-200/50 p-4 sm:p-5 sticky top-20 sm:top-24 lg:top-24">
                <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <div className="w-8 h-8 bg-orange-500/10 rounded-lg flex items-center justify-center mr-2 border border-orange-200/50">
                    <Package className="w-4 h-4 text-orange-600" />
                  </div>
                  Order Summary
                </h2>
                
                {/* Order Details */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Items ({totalItems})</span>
                    <span className="font-medium flex items-center">
                      <IndianRupee className="w-3.5 h-3.5 mr-0.5" />
                      {totalPrice.toFixed(2)}
                    </span>
                  </div>
                  
                  <div className="border-t border-gray-100 pt-3">
                    <div className="flex justify-between text-lg font-bold text-gray-800">
                      <span>Total</span>
                      <span className="flex items-center">
                        <IndianRupee className="w-5 h-5 mr-0.5" />
                        {totalPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => navigate('/checkout')}
                  className="w-full bg-orange-500/10 border-2 border-orange-300 text-orange-600 font-medium py-2.5 px-4 rounded-lg hover:bg-orange-500/20 hover:border-orange-400 transition-all duration-200 text-sm shadow-sm hover:shadow-md"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;