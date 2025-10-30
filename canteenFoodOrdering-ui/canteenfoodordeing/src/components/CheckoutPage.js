import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../components/CartContext';
import { CheckCircle, XCircle, AlertCircle, X } from 'lucide-react';

// Toast Notification Component
const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const icons = {
    success: <CheckCircle className="w-6 h-6" />,
    error: <XCircle className="w-6 h-6" />,
    warning: <AlertCircle className="w-6 h-6" />
  };

  const colors = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    warning: 'bg-orange-500'
  };

  return (
    <div className="fixed top-4 right-4 z-50 animate-slideIn">
      <div className={`${colors[type]} text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 min-w-[320px] max-w-md`}>
        {icons[type]}
        <p className="flex-1 font-medium">{message}</p>
        <button 
          onClick={onClose}
          className="hover:bg-white/20 rounded-full p-1 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cartItems, totalPrice, updateQuantity, removeFromCart, clearCart } = useCart();
  
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    paymentMethod: 'razorpay'
  });
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const [toast, setToast] = useState(null);
  
  // Razorpay configuration
  const RAZORPAY_KEY_ID = "rzp_test_RXg0a5Bf1QLwtk";
  const CREATE_ORDER_URL = "http://localhost:8080/api/create-order";
  const VERIFY_PAYMENT_URL = "http://localhost:8080/api/verify-payment";
  
  // Toast helper function
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const closeToast = () => {
    setToast(null);
  };
  
  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => {
      console.log('Razorpay script loaded successfully');
      setRazorpayLoaded(true);
    };
    script.onerror = () => {
      console.error('Failed to load Razorpay script');
      showToast('Failed to load payment gateway. Please refresh the page.', 'error');
    };
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);
  
  // Save order to localStorage for tracking
  const saveOrderToLocalStorage = (orderData) => {
    try {
      const existingOrders = localStorage.getItem('customerOrders');
      const orders = existingOrders ? JSON.parse(existingOrders) : [];
      
      orders.push(orderData);
      localStorage.setItem('customerOrders', JSON.stringify(orders));
      console.log('Order saved to localStorage:', orderData.id);
    } catch (error) {
      console.error('Error saving order:', error);
    }
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo({
      ...customerInfo,
      [name]: value
    });
  };
  
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
  
  const handleIncreaseQuantity = (itemId) => {
    const item = cartItems.find(item => item.id === itemId);
    if (item) {
      updateQuantity(itemId, item.quantity + 1);
    }
  };
  
  const handleRemoveItem = (itemId) => {
    removeFromCart(itemId);
  };
  
  const handleBack = () => {
    navigate('/menu');
  };
  
  // Razorpay Payment Integration
  const initiateRazorpayPayment = async () => {
    if (!customerInfo.name || !customerInfo.email || !customerInfo.phone) {
      showToast('Please fill in all customer details', 'warning');
      return;
    }
    
    if (cartItems.length === 0) {
      showToast('Your cart is empty. Please add items before placing an order.', 'warning');
      return;
    }

    if (!razorpayLoaded) {
      showToast('Payment gateway is still loading. Please wait a moment.', 'warning');
      return;
    }
    
    setIsProcessing(true);
    
    try {
      // Step 1: Create order on backend
      const orderRequestData = {
        amount: totalPrice,
        receipt: `order_${Date.now()}`,
        customerName: customerInfo.name,
        customerEmail: customerInfo.email,
        customerPhone: customerInfo.phone,
        items: cartItems
      };
      
      console.log("Sending data:", JSON.stringify(orderRequestData, null, 2));
      
      const response = await fetch(CREATE_ORDER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderRequestData),
      });
      
      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }
      
      const orderResponse = await response.json();
      console.log("Order created:", orderResponse);
      
      // Step 2: Configure Razorpay options
      const options = {
        key: RAZORPAY_KEY_ID,
        amount: orderResponse.amount,
        currency: "INR",
        name: "Restaurant Name",
        description: "Order Payment",
        order_id: orderResponse.id,
        handler: async function (response) {
          console.log("Payment successful:", response);
          
          // Step 3: Verify payment on backend
          try {
            const verificationResponse = await fetch(VERIFY_PAYMENT_URL, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature
              }),
            });
            
            if (verificationResponse.ok) {
              // Save order to localStorage for tracking
              const orderData = {
                id: response.razorpay_order_id,
                orderDate: new Date().toISOString(),
                status: 'pending',
                items: cartItems.map(item => ({
                  name: item.name,
                  quantity: item.quantity,
                  price: item.price
                })),
                totalAmount: totalPrice,
                customerName: customerInfo.name,
                customerPhone: customerInfo.phone,
                customerEmail: customerInfo.email,
                paymentId: response.razorpay_payment_id
              };
              
              saveOrderToLocalStorage(orderData);
              
              showToast(`Payment verified successfully! Thank you ${customerInfo.name}!`, 'success');
              clearCart();
              
              // Navigate to track orders page after a short delay
              setTimeout(() => {
                navigate('/track-orders');
              }, 2000);
            } else {
              showToast('Payment verification failed. Please contact support.', 'error');
            }
          } catch (error) {
            console.error("Verification error:", error);
            showToast('Could not verify payment. Please contact support.', 'error');
          } finally {
            setIsProcessing(false);
          }
        },
        prefill: {
          name: customerInfo.name,
          email: customerInfo.email,
          contact: customerInfo.phone
        },
        theme: {
          color: "#3399cc"
        },
        modal: {
          ondismiss: function() {
            setIsProcessing(false);
          }
        }
      };
      
      // Step 4: Open Razorpay checkout
      const rzp = new window.Razorpay(options);
      rzp.open();
      
    } catch (error) {
      console.error("Error creating order:", error);
      showToast('Could not connect to payment server. Please try again.', 'error');
      setIsProcessing(false);
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    initiateRazorpayPayment();
  };
  
  return (
    <div className="bg-gray-50 min-h-screen p-6">
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={closeToast}
        />
      )}
      
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Checkout</h1>
        
        {cartItems.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-600 mb-4">Your cart is empty</p>
            <button 
              onClick={handleBack}
              className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-6 rounded-lg"
            >
              Return to Menu
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Order Summary */}
            <div className="md:col-span-1">
              <div className="bg-white p-4 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                
                <div className="max-h-64 overflow-y-auto mb-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="mb-3 pb-3 border-b border-gray-100 last:border-b-0">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <span className="font-medium text-sm">{item.name}</span>
                          <div className="text-green-600 text-sm">₹{item.price.toFixed(2)} each</div>
                        </div>
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-red-500 hover:text-red-700 text-sm ml-2"
                          title="Remove item"
                        >
                          ✕
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleDecreaseQuantity(item.id)}
                            className="bg-gray-200 hover:bg-gray-300 text-gray-700 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold"
                          >
                            −
                          </button>
                          <span className="text-sm font-medium min-w-[20px] text-center">{item.quantity}</span>
                          <button
                            onClick={() => handleIncreaseQuantity(item.id)}
                            className="bg-gray-200 hover:bg-gray-300 text-gray-700 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold"
                          >
                            +
                          </button>
                        </div>
                        <span className="text-green-600 font-medium text-sm">₹{(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="border-t border-gray-200 pt-4 mt-2">
                  <div className="flex justify-between text-gray-600 mb-2">
                    <span>Subtotal</span>
                    <span>₹{totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg mt-3">
                    <span>Total</span>
                    <span>₹{totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Customer Information Form */}
            <div className="md:col-span-2">
              <div className="bg-white p-4 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Your Information</h2>
                
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-gray-700 mb-1" htmlFor="name">Full Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={customerInfo.name}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-1" htmlFor="email">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={customerInfo.email}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-1" htmlFor="phone">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={customerInfo.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      required
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-gray-700 mb-1">Payment Method</label>
                    <div className="flex space-x-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="razorpay"
                          checked={customerInfo.paymentMethod === 'razorpay'}
                          onChange={handleInputChange}
                          className="mr-2"
                        />
                        Online Payment (Razorpay)
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex justify-between mt-6">
                    <button
                      type="button"
                      onClick={handleBack}
                      className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-6 rounded-lg"
                    >
                      Back to Menu
                    </button>
                    <button
                      type="submit"
                      disabled={isProcessing || cartItems.length === 0 || !razorpayLoaded}
                      className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-6 rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                      {!razorpayLoaded ? 'Loading Payment...' : 
                       isProcessing ? 'Processing...' : 
                       'Place Order'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(400px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default CheckoutPage;