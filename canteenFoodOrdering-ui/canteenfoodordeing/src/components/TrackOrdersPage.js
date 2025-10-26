import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TrackOrdersPage = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Simulated order statuses
  const orderStatuses = {
    pending: { label: 'Order Placed', color: 'bg-yellow-500', icon: '📝' },
    confirmed: { label: 'Confirmed', color: 'bg-blue-500', icon: '✅' },
    preparing: { label: 'Preparing', color: 'bg-orange-500', icon: '👨‍🍳' },
    ready: { label: 'Ready for Pickup', color: 'bg-green-500', icon: '🎉' },
    completed: { label: 'Completed', color: 'bg-gray-500', icon: '✔️' },
    cancelled: { label: 'Cancelled', color: 'bg-red-500', icon: '❌' }
  };

  useEffect(() => {
    // Load orders from localStorage (simulated)
    loadOrders();
  }, []);

  const loadOrders = () => {
    setLoading(true);
    
    // Get orders from localStorage
    const savedOrders = localStorage.getItem('customerOrders');
    if (savedOrders) {
      const parsedOrders = JSON.parse(savedOrders);
      // Sort by date (newest first)
      const sortedOrders = parsedOrders.sort((a, b) => 
        new Date(b.orderDate) - new Date(a.orderDate)
      );
      setOrders(sortedOrders);
    } else {
      // Demo orders for testing
      const demoOrders = [
        {
          id: 'ORD001',
          orderDate: new Date().toISOString(),
          status: 'preparing',
          items: [
            { name: 'Margherita Pizza', quantity: 2, price: 299 },
            { name: 'Garlic Bread', quantity: 1, price: 99 }
          ],
          totalAmount: 697,
          customerName: 'John Doe',
          customerPhone: '9876543210',
          paymentId: 'pay_xyz123'
        },
        {
          id: 'ORD002',
          orderDate: new Date(Date.now() - 86400000).toISOString(),
          status: 'completed',
          items: [
            { name: 'Veggie Burger', quantity: 1, price: 149 }
          ],
          totalAmount: 149,
          customerName: 'John Doe',
          customerPhone: '9876543210',
          paymentId: 'pay_abc456'
        }
      ];
      setOrders(demoOrders);
    }
    
    setLoading(false);
  };

  const getStatusProgress = (status) => {
    const statusOrder = ['pending', 'confirmed', 'preparing', 'ready', 'completed'];
    const currentIndex = statusOrder.indexOf(status);
    return ((currentIndex + 1) / statusOrder.length) * 100;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
  };

  const handleCloseModal = () => {
    setSelectedOrder(null);
  };

  const handleBackToMenu = () => {
    navigate('/menu');
  };

  const filterOrders = (filterStatus) => {
    if (filterStatus === 'all') {
      loadOrders();
    } else if (filterStatus === 'active') {
      const activeOrders = orders.filter(order => 
        ['pending', 'confirmed', 'preparing', 'ready'].includes(order.status)
      );
      setOrders(activeOrders);
    } else {
      const filteredOrders = orders.filter(order => order.status === filterStatus);
      setOrders(filteredOrders);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Track Your Orders</h1>
          <button
            onClick={handleBackToMenu}
            className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-lg"
          >
            Back to Menu
          </button>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => filterOrders('all')}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg"
          >
            All Orders
          </button>
          <button
            onClick={() => filterOrders('active')}
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg"
          >
            Active Orders
          </button>
          <button
            onClick={() => filterOrders('preparing')}
            className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-lg"
          >
            Preparing
          </button>
          <button
            onClick={() => filterOrders('completed')}
            className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg"
          >
            Completed
          </button>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-10">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
            <p className="mt-4 text-gray-600">Loading orders...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-10 bg-white rounded-lg shadow">
            <p className="text-gray-600 mb-4">No orders found</p>
            <button
              onClick={handleBackToMenu}
              className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-6 rounded-lg"
            >
              Start Ordering
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                {/* Order Header */}
                <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-lg">{order.id}</span>
                    <span className={`${orderStatuses[order.status].color} text-white px-3 py-1 rounded-full text-sm font-medium`}>
                      {orderStatuses[order.status].icon} {orderStatuses[order.status].label}
                    </span>
                  </div>
                  <p className="text-sm opacity-90">{formatDate(order.orderDate)}</p>
                </div>

                {/* Order Body */}
                <div className="p-4">
                  {/* Items Summary */}
                  <div className="mb-4">
                    <h3 className="font-semibold text-gray-700 mb-2">Items ({order.items.length})</h3>
                    <div className="space-y-1">
                      {order.items.slice(0, 2).map((item, index) => (
                        <div key={index} className="flex justify-between text-sm text-gray-600">
                          <span>{item.quantity}x {item.name}</span>
                          <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                      {order.items.length > 2 && (
                        <p className="text-sm text-orange-500">+{order.items.length - 2} more items</p>
                      )}
                    </div>
                  </div>

                  {/* Total Amount */}
                  <div className="border-t pt-3 mb-4">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-700">Total</span>
                      <span className="font-bold text-lg text-green-600">₹{order.totalAmount.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  {order.status !== 'cancelled' && order.status !== 'completed' && (
                    <div className="mb-4">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-orange-500 to-green-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${getStatusProgress(order.status)}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  {/* View Details Button */}
                  <button
                    onClick={() => handleViewDetails(order)}
                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 rounded-lg transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Order Details Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold">{selectedOrder.id}</h2>
                    <p className="text-sm opacity-90">{formatDate(selectedOrder.orderDate)}</p>
                  </div>
                  <button
                    onClick={handleCloseModal}
                    className="text-white hover:text-gray-200 text-2xl font-bold"
                  >
                    ×
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6">
                {/* Status */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-700 mb-2">Order Status</h3>
                  <div className={`${orderStatuses[selectedOrder.status].color} text-white px-4 py-2 rounded-lg inline-block`}>
                    {orderStatuses[selectedOrder.status].icon} {orderStatuses[selectedOrder.status].label}
                  </div>
                </div>

                {/* Customer Info */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-700 mb-2">Customer Information</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-600"><strong>Name:</strong> {selectedOrder.customerName}</p>
                    <p className="text-gray-600"><strong>Phone:</strong> {selectedOrder.customerPhone}</p>
                  </div>
                </div>

                {/* Items */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-700 mb-2">Order Items</h3>
                  <div className="space-y-2">
                    {selectedOrder.items.map((item, index) => (
                      <div key={index} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-800">{item.name}</p>
                          <p className="text-sm text-gray-600">Quantity: {item.quantity} × ₹{item.price.toFixed(2)}</p>
                        </div>
                        <p className="font-semibold text-green-600">₹{(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Payment Info */}
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-800">₹{selectedOrder.totalAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Payment ID</span>
                    <span className="text-sm text-gray-500">{selectedOrder.paymentId}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t">
                    <span className="font-bold text-lg text-gray-800">Total</span>
                    <span className="font-bold text-xl text-green-600">₹{selectedOrder.totalAmount.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="bg-gray-50 p-4 flex justify-end">
                <button
                  onClick={handleCloseModal}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-6 rounded-lg"
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