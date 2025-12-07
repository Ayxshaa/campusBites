// [Imports remain the same: 75-76]
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ArrowLeft, Package, User, Mail, Phone, CreditCard, IndianRupee, Plus, Minus, Trash2 } from 'lucide-react';
import { useCart } from '../components/CartContext';

const CheckoutPage = () => { // 
  const navigate = useNavigate();
  const { cartItems, totalPrice, updateQuantity, removeFromCart, clearCart } = useCart(); // 
  const [customerInfo, setCustomerInfo] = useState({ // 
    name: '',
    email: '',
    phone: '',
    paymentMethod: 'razorpay'
  });
  const [isProcessing, setIsProcessing] = useState(false); // [cite: 79]
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  
  const RAZORPAY_KEY_ID = "rzp_test_RXg0a5Bf1QLwtk";
  const CREATE_ORDER_URL = "http://localhost:8080/api/create-order"; // [cite: 80]
  const VERIFY_PAYMENT_URL = "http://localhost:8080/api/verify-payment"; // [cite: 80]
  
  // Load Razorpay script (useEffect remains the same) [cite: 80-81]
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
      toast.error('Failed to load payment gateway. Please refresh the page.', {
        position: "top-right",
        autoClose: 4000,
      });
    };
   
     document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  // --- REMOVED saveOrderToLocalStorage FUNCTION [cite: 82-84] ---
  // The backend now handles all storage.

  // [Functions handleInputChange, handleDecreaseQuantity, handleIncreaseQuantity,
  //  handleRemoveItem, handleBack all remain the same: 85-93]
  
  const handleInputChange = (e) => { // [cite: 85]
    const { name, value } = e.target;
    setCustomerInfo({ // [cite: 86]
      ...customerInfo,
      [name]: value
    });
  };

  const handleDecreaseQuantity = (itemId) => { // [cite: 87]
    const item = cartItems.find(item => item.id === itemId);
    if (item) { // [cite: 88]
      if (item.quantity <= 1) {
        removeFromCart(itemId); // [cite: 88]
      } else {
        updateQuantity(itemId, item.quantity - 1); // [cite: 89]
      }
    }
  };
  
  const handleIncreaseQuantity = (itemId) => { // [cite: 90]
    const item = cartItems.find(item => item.id === itemId);
    if (item) { // [cite: 91]
      updateQuantity(itemId, item.quantity + 1);
    }
  };
  
  const handleRemoveItem = (itemId) => { // [cite: 92]
    removeFromCart(itemId);
  };
  
  const handleBack = () => { // [cite: 93]
    navigate('/menu');
  };

  // Razorpay Payment Integration
  const initiateRazorpayPayment = async () => {
    if (!customerInfo.name || !customerInfo.email || !customerInfo.phone) { // [cite: 94]
      toast.warning('Please fill in all customer details', {
        position: "top-right",
        autoClose: 3000,
      });
      return; // [cite: 95]
    }
    
    if (cartItems.length === 0) { // [cite: 95]
      toast.warning('Your cart is empty. Please add items before placing an order.', {
        position: "top-right",
        autoClose: 3000,
      });
      return; // [cite: 96]
    }

    if (!razorpayLoaded) { // [cite: 96]
      toast.info('Payment gateway is still loading. Please wait a moment.', {
        position: "top-right",
        autoClose: 3000,
      });
      return; // [cite: 97]
    }
    
    setIsProcessing(true); // [cite: 97]
    
    try {
      // Step 1: Create order on backend (This is just for Razorpay)
      const orderRequestData = {
        amount: totalPrice,
        receipt: `order_${Date.now()}`
        // We no longer need to send customer/item data here [cite: 98]
      };
      
      const response = await fetch(CREATE_ORDER_URL, { // [cite: 99]
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderRequestData),
      });
      
      if (!response.ok) { // [cite: 100]
        throw new Error(`Server responded with ${response.status}`);
      }
      
      const orderResponse = await response.json(); // [cite: 101]
      console.log("Razorpay Order created:", orderResponse);

      // Step 2: Configure Razorpay options
      const options = {
        key: RAZORPAY_KEY_ID,
        amount: orderResponse.amount,
        currency: "INR",
        name: "Campus Bites", // Changed
        description: "Order Payment",
        order_id: orderResponse.id,
        handler: async function (response) {
          console.log("Payment successful:", response);
          
          // --- MODIFICATION: Step 3: Verify payment and SAVE order on backend ---
          try {
          
            // --- NEW: Build the complete order payload ---
            const verificationPayload = {
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                customerInfo: customerInfo,
                cartItems: cartItems,
                totalPrice: totalPrice
            };
            // --- END NEW ---

            const verificationResponse = await fetch(VERIFY_PAYMENT_URL, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(verificationPayload), // Send the complete payload
            });

            if (verificationResponse.ok) { // [cite: 105]
              // --- NEW: Save phone to localStorage for TrackOrdersPage ---
              // This is the fix for Question 3
              try {
                localStorage.setItem('customerPhone', customerInfo.phone);
              } catch (e) {
                console.warn("Could not save phone to local storage", e);
              }
              // --- END NEW ---
              
              // --- REMOVED saveOrderToLocalStorage  ---
              
              toast.success(`Payment Verified Successfully! Thank you, ${customerInfo.name}!`, {
                position: "top-right",
                autoClose: 3000,
              });
              clearCart();
              
              // Navigate to track orders page
              navigate('/track-orders'); // 
            } else {
              toast.error("Payment verification failed!", {
                position: "top-right",
                autoClose: 4000,
              });
            }
          } catch (error) {
            console.error("Verification error:", error); // [cite: 110]
            toast.error("Could not verify payment. Please contact support.", {
              position: "top-right",
              autoClose: 4000,
            });
          } finally {
            setIsProcessing(false); // [cite: 111]
          }
        },
        prefill: {
          name: customerInfo.name,
          email: customerInfo.email,
          contact: customerInfo.phone
        },
        theme: {
          color: "#ff610c" // Changed to match your branding [cite: 39]
        },
        modal: {
           ondismiss: function() { // [cite: 113]
            setIsProcessing(false);
           } // [cite: 114]
        }
      };

      // Step 4: Open Razorpay checkout
      const rzp = new window.Razorpay(options); // [cite: 115]
      rzp.open();
      
    } catch (error) { // [cite: 116]
      console.error("Error creating order:", error);
      toast.error("Could not connect to payment server. Please try again.", {
        position: "top-right",
        autoClose: 4000,
      });
      setIsProcessing(false);
    }
  };

  const handleSubmit = (e) => { // [cite: 118]
    e.preventDefault();
    initiateRazorpayPayment();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50/50 via-orange-50/30 to-orange-100/50 pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-2xl font-bold text-gray-800 mb-1">Checkout</h1>
                <p className="text-sm text-gray-500">Complete your order details</p>
              </div>
              <button
                onClick={handleBack}
                className="bg-white border border-gray-200 text-gray-700 font-medium py-2.5 px-4 rounded-lg hover:bg-gray-50 transition-all duration-200 flex items-center text-sm"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Menu
              </button>
            </div>

            {cartItems.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
                    <div className="w-16 h-16 bg-orange-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-orange-200/50">
                        <Package className="w-8 h-8 text-orange-600" />
                    </div>
                    <p className="text-gray-700 mb-4">Your cart is empty</p>
                    <button 
                        onClick={handleBack}
                        className="bg-orange-500/10 border border-orange-200 text-orange-600 font-medium py-2.5 px-6 rounded-lg hover:bg-orange-500/15 transition-all duration-200 text-sm"
                    >
                        Return to Menu
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {/* Order Summary */}
                    <div className="lg:col-span-1 order-2 lg:order-1">
                        <div className="bg-white rounded-2xl shadow-sm border-2 border-orange-200/50 p-4 sm:p-5 sticky top-20 sm:top-24 lg:top-24">
                            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                <div className="w-8 h-8 bg-orange-500/10 rounded-lg flex items-center justify-center mr-2 border border-orange-200/50">
                                    <Package className="w-4 h-4 text-orange-600" />
                                </div>
                                Order Summary
                            </h2>
                            <div className="max-h-80 overflow-y-auto mb-4 pr-2">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="mb-3 pb-3 border-b border-gray-100 last:border-b-0 last:mb-0 last:pb-0">
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="flex-1">
                                                <span className="font-medium text-sm text-gray-800">{item.name}</span>
                                                <div className="text-gray-500 text-xs flex items-center mt-0.5">
                                                    <IndianRupee className="w-3 h-3 mr-0.5" />
                                                    {item.price.toFixed(2)} each
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => handleRemoveItem(item.id)}
                                                className="text-red-600 hover:text-red-700 text-xs ml-2 flex items-center"
                                                title="Remove item"
                                            >
                                                <Trash2 className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-2">
                                                <button
                                                    onClick={() => handleDecreaseQuantity(item.id)}
                                                    className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-200"
                                                >
                                                    <Minus className="h-3.5 w-3.5" />
                                                </button>
                                                <span className="text-sm font-semibold min-w-[24px] text-center text-gray-800">{item.quantity}</span>
                                                <button
                                                    onClick={() => handleIncreaseQuantity(item.id)}
                                                    className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-200"
                                                >
                                                    <Plus className="h-3.5 w-3.5" />
                                                </button>
                                            </div>
                                            <span className="text-gray-800 font-semibold text-sm flex items-center">
                                                <IndianRupee className="w-3.5 h-3.5 mr-0.5" />
                                                {(item.price * item.quantity).toFixed(2)}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="border-t border-gray-100 pt-4">
                                <div className="flex justify-between text-sm text-gray-600 mb-3">
                                    <span>Subtotal</span>
                                    <span className="font-medium flex items-center">
                                        <IndianRupee className="w-3.5 h-3.5 mr-0.5" />
                                        {totalPrice.toFixed(2)}
                                    </span>
                                </div>
                                <div className="flex justify-between font-bold text-lg text-gray-800 pt-3 border-t border-gray-100">
                                    <span>Total</span>
                                    <span className="flex items-center">
                                        <IndianRupee className="w-5 h-5 mr-0.5" />
                                        {totalPrice.toFixed(2)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Customer Information Form */}
                    <div className="lg:col-span-2 order-1 lg:order-2">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">
                            <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-4 sm:mb-6 flex items-center">
                                <User className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-orange-500/70" />
                                Your Information
                            </h2>
                            <form onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mb-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center" htmlFor="name">
                                            <User className="w-4 h-4 mr-1.5 text-orange-500/70" />
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={customerInfo.name}
                                            onChange={handleInputChange}
                                            className="w-full h-11 border border-gray-200 rounded-lg px-4 py-2.5 focus:border-orange-400 focus:ring-1 focus:ring-orange-200 bg-white transition-all duration-200 text-sm"
                                            placeholder="Enter your full name"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center" htmlFor="email">
                                            <Mail className="w-4 h-4 mr-1.5 text-orange-500/70" />
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={customerInfo.email}
                                            onChange={handleInputChange}
                                            className="w-full h-11 border border-gray-200 rounded-lg px-4 py-2.5 focus:border-orange-400 focus:ring-1 focus:ring-orange-200 bg-white transition-all duration-200 text-sm"
                                            placeholder="Enter your email"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center" htmlFor="phone">
                                        <Phone className="w-4 h-4 mr-1.5 text-orange-500/70" />
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={customerInfo.phone}
                                        onChange={handleInputChange}
                                        className="w-full h-11 border border-gray-200 rounded-lg px-4 py-2.5 focus:border-orange-400 focus:ring-1 focus:ring-orange-200 bg-white transition-all duration-200 text-sm"
                                        placeholder="Enter your phone number"
                                        required
                                    />
                                </div>
                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center">
                                        <CreditCard className="w-4 h-4 mr-1.5 text-orange-500/70" />
                                        Payment Method
                                    </label>
                                    <div className="bg-gray-50/80 rounded-lg p-4 border border-gray-100">
                                        <label className="flex items-center cursor-pointer">
                                            <input
                                                type="radio"
                                                name="paymentMethod"
                                                value="razorpay"
                                                checked={customerInfo.paymentMethod === 'razorpay'}
                                                onChange={handleInputChange}
                                                className="mr-3 w-4 h-4 text-orange-500 focus:ring-orange-200"
                                            />
                                            <span className="text-sm text-gray-700">Online Payment (Razorpay)</span>
                                        </label>
                                    </div>
                                </div>
                                <div className="flex flex-col-reverse sm:flex-row justify-between items-stretch sm:items-center gap-3 sm:gap-0 pt-4 border-t border-gray-100">
                                    <button
                                        type="button"
                                        onClick={handleBack}
                                        className="bg-white border border-gray-200 text-gray-700 font-medium py-2.5 px-4 sm:px-6 rounded-lg hover:bg-gray-50 transition-all duration-200 text-sm w-full sm:w-auto"
                                    >
                                        Back to Menu
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isProcessing || cartItems.length === 0 || !razorpayLoaded}
                                        className="bg-orange-500/10 border-2 border-orange-300 text-orange-600 font-medium py-2.5 px-4 sm:px-6 rounded-lg hover:bg-orange-500/20 hover:border-orange-400 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm shadow-sm hover:shadow-md w-full sm:w-auto"
                                    >
                                        {!razorpayLoaded ?
                                            'Loading Payment...' : 
                                            isProcessing ?
                                            'Processing...' : 
                                            'Place Order'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    </div>
  );
};

export default CheckoutPage;