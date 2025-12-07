import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, CheckCircle2, X, Package, User, IndianRupee, Filter } from 'lucide-react';

const MY_ORDERS_URL = "http://localhost:8080/api/admin/my-orders"; // Using the new endpoint

const TrackOrdersPage = () => { // 
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true); // [cite: 157]
  const [selectedOrder, setSelectedOrder] = useState(null); // [cite: 157]
  
  // Get the customer's phone number from local storage
  const customerPhone = useMemo(() => localStorage.getItem('customerPhone'), []);

  // [Order statuses map remains the same: 158]
  const orderStatuses = {
    // New status for live orders
    LIVE: { label: 'Order Placed', color: 'bg-yellow-500/10 border-yellow-200/50 text-yellow-700', icon: Clock },
    // Past order statuses
    COMPLETED: { label: 'Completed', color: 'bg-green-500/10 border-green-200/50 text-green-700', icon: CheckCircle2 },
    REJECTED: { label: 'Cancelled', color: 'bg-red-500/10 border-red-200/50 text-red-700', icon: X }
  };
  
  // [useEffect remains: 159]
  useEffect(() => {
    loadOrders();
  }, [customerPhone]); // Re-run if customerPhone changes (though it shouldn't)

  const loadOrders = async () => {
    if (!customerPhone) {
        console.warn("No customer phone found in local storage.");
        setLoading(false);
        return;
    }
    
    setLoading(true); // 
    try {
        const response = await fetch(`${MY_ORDERS_URL}?phone=${customerPhone}`);
        if (!response.ok) {
            throw new Error('Failed to fetch orders');
        }
        const data = await response.json(); // This will be { liveOrders: [], pastOrders: [] }

        // --- NEW: Process and combine orders ---
        
        // Process live orders
        const liveOrders = data.liveOrders.map(order => ({
            ...order,
            id: `L-${order.id}`, // Add prefix to avoid ID conflicts
            status: 'LIVE',
            items: JSON.parse(order.itemsJson || "[]"),
            totalAmount: order.totalAmount
        }));
        
        // Process past orders
        const pastOrders = data.pastOrders.map(order => ({
            ...order,
            id: `P-${order.id}`, // Add prefix
            status: order.status, // "COMPLETED" or "REJECTED"
            items: JSON.parse(order.itemsJson || "[]"),
            totalAmount: order.totalAmount
        }));

        // Combine and sort by date (newest first)
        const allOrders = [...liveOrders, ...pastOrders].sort((a, b) => 
            new Date(b.orderDate) - new Date(a.orderDate)
        );
        
        setOrders(allOrders);
        // --- END NEW ---

    } catch (error) {
        console.error("Error loading orders:", error);
    } finally {
        setLoading(false);
    }
  }; // [End of loadOrders: 168]

  // [getStatusProgress, formatDate, handleViewDetails, 
  //  handleCloseModal, handleBackToMenu remain the same: 169-175]

  const getStatusProgress = (status) => {
    if (status === 'LIVE') return 33;
    if (status === 'COMPLETED') return 100;
    if (status === 'REJECTED') return 0;
    return 0; // Default
  };

  const formatDate = (dateString) => { // [cite: 171]
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { // [cite: 172]
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleViewDetails = (order) => { // [cite: 173]
    setSelectedOrder(order);
  };
  
  const handleCloseModal = () => { // [cite: 174]
    setSelectedOrder(null);
  };
  
  const handleBackToMenu = () => { // [cite: 175]
    navigate('/menu');
  };

  // [Filter functions are simplified as we only have 3 statuses]
  const filterOrders = (filterStatus) => {
    // We reload from scratch as filtering logic is simple
    loadOrders().then(() => {
        if (filterStatus === 'all') {
            return; // loadOrders already set all
        }
        setOrders(prevOrders => prevOrders.filter(order => {
            if (filterStatus === 'active') {
                return order.status === 'LIVE';
            }
            return order.status === filterStatus;
        }));
    });
  }; // [End of filterOrders: 179]

  // --- JSX (HTML) Section ---
  // Most of this is the same, just updated to use the new data structure
  
  const [activeFilter, setActiveFilter] = useState('all');

  const handleFilter = (filterStatus) => {
    setActiveFilter(filterStatus);
    filterOrders(filterStatus);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50/50 via-orange-50/30 to-orange-100/50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-1">Track Your Orders</h1>
            <p className="text-sm text-gray-500">View and manage all your orders</p>
          </div>
          <button
            onClick={handleBackToMenu}
            className="bg-white border-2 border-gray-200 text-gray-700 font-medium py-2.5 px-4 rounded-lg hover:bg-gray-50 hover:border-orange-200 transition-all duration-200 flex items-center text-sm shadow-sm hover:shadow-md"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Menu
          </button>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => handleFilter('all')}
            className={`px-3 sm:px-4 py-2 rounded-lg font-medium text-xs sm:text-sm transition-all duration-200 flex items-center ${
              activeFilter === 'all'
                ? 'bg-orange-500/10 border-2 border-orange-300 text-orange-600 shadow-sm'
                : 'bg-white border-2 border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-orange-200'
            }`}
          >
            <Filter className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
            All Orders
          </button>
          <button
            onClick={() => handleFilter('active')}
            className={`px-3 sm:px-4 py-2 rounded-lg font-medium text-xs sm:text-sm transition-all duration-200 flex items-center ${
              activeFilter === 'active'
                ? 'bg-orange-500/10 border-2 border-orange-300 text-orange-600 shadow-sm'
                : 'bg-white border-2 border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-orange-200'
            }`}
          >
            <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
            Active Orders
          </button>
          <button
            onClick={() => handleFilter('COMPLETED')}
            className={`px-3 sm:px-4 py-2 rounded-lg font-medium text-xs sm:text-sm transition-all duration-200 flex items-center ${
              activeFilter === 'COMPLETED'
                ? 'bg-orange-500/10 border-2 border-orange-300 text-orange-600 shadow-sm'
                : 'bg-white border-2 border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-orange-200'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
            Completed
          </button>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-orange-500"></div>
            <p className="mt-4 text-gray-600 text-sm">Loading orders...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-sm border-2 border-orange-200/50">
            <div className="w-16 h-16 bg-orange-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border-2 border-orange-300">
              <Package className="w-8 h-8 text-orange-600" />
            </div>
            <p className="text-gray-700 mb-4">{customerPhone ? "No orders found for this account." : "No customer phone found. Please place an order first."}</p>
            <button
              onClick={handleBackToMenu}
              className="bg-orange-500/10 border-2 border-orange-300 text-orange-600 font-medium py-2.5 px-6 rounded-lg hover:bg-orange-500/20 hover:border-orange-400 transition-all duration-200 text-sm shadow-sm hover:shadow-md"
            >
              Start Ordering
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {orders.map((order) => {
              const StatusIcon = orderStatuses[order.status].icon;
              return (
                <div key={order.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md hover:border-orange-200 transition-all duration-200">
                  
                  {/* Order Header */}
                  <div className={`p-5 border-b border-gray-100 ${order.status === 'LIVE' ? 'bg-yellow-500/5' : order.status === 'COMPLETED' ? 'bg-green-500/5' : 'bg-red-500/5'}`}>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <span className="font-bold text-lg text-gray-800">Order #{order.id.replace(/^[LP]-/, '')}</span>
                        <p className="text-xs text-gray-500 mt-1 flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {formatDate(order.orderDate)}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-lg text-xs font-semibold border flex items-center ${orderStatuses[order.status].color}`}>
                        <StatusIcon className="w-3.5 h-3.5 mr-1.5" />
                        {orderStatuses[order.status].label}
                      </span>
                    </div>
                  </div>

                  {/* Order Body */}
                  <div className="p-5">
                    {/* Items Summary */}
                    <div className="mb-4">
                      <h3 className="font-medium text-gray-700 mb-2 text-sm flex items-center">
                        <Package className="w-4 h-4 mr-1.5 text-orange-500/70" />
                        Items ({order.items.length})
                      </h3>
                      <div className="space-y-1.5">
                        {order.items.slice(0, 2).map((item, index) => (
                          <div key={index} className="flex justify-between text-sm text-gray-600 bg-gray-50/80 p-2 rounded-lg">
                            <span>{item.quantity}x {item.name}</span>
                            <span className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        ))}
                        {order.items.length > 2 && (
                          <p className="text-xs text-orange-600 font-medium">+{order.items.length - 2} more items</p>
                        )}
                      </div>
                    </div>

                    {/* Total Amount */}
                    <div className="border-t border-gray-100 pt-3 mb-4">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-gray-700 text-sm">Total</span>
                        <span className="font-bold text-lg text-gray-800 flex items-center">
                          <IndianRupee className="w-4 h-4 mr-0.5" />
                          {order.totalAmount.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    {order.status !== 'REJECTED' && (
                      <div className="mb-4">
                        <div className="w-full bg-gray-100 rounded-full h-1.5">
                          <div
                            className={`h-1.5 rounded-full transition-all duration-500 ${order.status === 'LIVE' ? 'bg-yellow-500' : 'bg-green-500'}`}
                            style={{ width: `${getStatusProgress(order.status)}%` }}
                          ></div>
                        </div>
                      </div>
                    )}

                    {/* View Details Button */}
                    <button
                      onClick={() => handleViewDetails(order)}
                      className="w-full bg-white border-2 border-gray-200 text-gray-700 font-medium py-2.5 rounded-lg hover:bg-gray-50 hover:border-orange-200 transition-all duration-200 text-sm shadow-sm hover:shadow-md"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Order Details Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4">
            <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto border-2 border-orange-200/50">
              
              {/* Modal Header */}
              <div className={`p-4 sm:p-6 border-b border-gray-100 ${selectedOrder.status === 'LIVE' ? 'bg-yellow-500/5' : selectedOrder.status === 'COMPLETED' ? 'bg-green-500/5' : 'bg-red-500/5'}`}>
                <div className="flex justify-between items-start">
                  <div className="flex-1 min-w-0 pr-2">
                    <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-1 truncate">Order #{selectedOrder.id.replace(/^[LP]-/, '')}</h2>
                    <p className="text-xs sm:text-sm text-gray-500 flex items-center">
                      <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1 sm:mr-1.5 flex-shrink-0" />
                      <span className="truncate">{formatDate(selectedOrder.orderDate)}</span>
                    </p>
                  </div>
                  <button
                    onClick={handleCloseModal}
                    className="text-gray-400 hover:text-gray-600 text-xl sm:text-2xl font-bold w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-all flex-shrink-0"
                  >
                    ×
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-4 sm:p-6">
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-700 mb-3 text-sm uppercase tracking-wide">Order Status</h3>
                  <div className={`${orderStatuses[selectedOrder.status].color} px-4 py-2 rounded-lg inline-flex items-center border`}>
                    {(() => {
                      const StatusIcon = orderStatuses[selectedOrder.status].icon;
                      return <StatusIcon className="w-4 h-4 mr-2" />;
                    })()}
                    {orderStatuses[selectedOrder.status].label}
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="font-semibold text-gray-700 mb-3 text-sm uppercase tracking-wide flex items-center">
                    <User className="w-4 h-4 mr-2 text-orange-500/70" />
                    Customer Information
                  </h3>
                  <div className="bg-gray-50/80 p-4 rounded-lg border border-gray-100">
                    <p className="text-sm text-gray-700 mb-1"><span className="font-medium text-gray-600">Name:</span> {selectedOrder.customerName}</p>
                    <p className="text-sm text-gray-700"><span className="font-medium text-gray-600">Phone:</span> {selectedOrder.customerPhone}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="font-semibold text-gray-700 mb-3 text-sm uppercase tracking-wide flex items-center">
                    <Package className="w-4 h-4 mr-2 text-orange-500/70" />
                    Order Items
                  </h3>
                  <div className="space-y-2">
                    {selectedOrder.items.map((item, index) => (
                      <div key={index} className="flex justify-between items-center bg-orange-50/50 p-3 rounded-lg border border-orange-100/50">
                        <div>
                          <p className="font-medium text-gray-800 text-sm">{item.name}</p>
                          <p className="text-xs text-gray-600">Quantity: {item.quantity} × <IndianRupee className="w-3 h-3 inline" />{item.price.toFixed(2)}</p>
                        </div>
                        <p className="font-semibold text-gray-800 text-sm flex items-center">
                          <IndianRupee className="w-3.5 h-3.5 mr-0.5" />
                          {(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-4">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm text-gray-600">Payment ID</span>
                    <span className="text-xs text-gray-500 font-mono">{selectedOrder.razorpayPaymentId}</span>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                    <span className="font-bold text-lg text-gray-800">Total</span>
                    <span className="font-bold text-xl text-gray-800 flex items-center">
                      <IndianRupee className="w-5 h-5 mr-0.5" />
                      {selectedOrder.totalAmount.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="bg-gray-50/80 p-4 flex justify-end border-t border-gray-100">
                <button
                  onClick={handleCloseModal}
                  className="bg-white border-2 border-gray-200 text-gray-700 font-medium py-2.5 px-6 rounded-lg hover:bg-gray-50 hover:border-orange-200 transition-all duration-200 text-sm shadow-sm hover:shadow-md"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackOrdersPage;