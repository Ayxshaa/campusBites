import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import { Clock, User, ClipboardList, X, Check, IndianRupee, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom'; // Assuming you use react-router for navigation

const LIVE_ORDERS_URL = "http://localhost:8080/api/admin/live-orders";
const COMPLETE_ORDER_URL = "http://localhost:8080/api/admin/complete";
const REJECT_ORDER_URL = "http://localhost:8080/api/admin/reject";

// A helper component for displaying a single order
const LiveOrderCard = ({ order, onComplete, onReject }) => {
    
    // Parse the items JSON string
    const items = JSON.parse(order.itemsJson || "[]");

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString('en-IN', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-200">
            <div className="p-5">
                {/* Header */}
                <div className="flex justify-between items-start mb-4 pb-4 border-b border-gray-100">
                    <div>
                        <h3 className="text-lg font-bold text-gray-800 mb-1">Order #{order.id}</h3>
                        <p className="text-sm text-gray-500 flex items-center">
                            <Clock className="w-3.5 h-3.5 mr-1.5 text-gray-400" />
                            {formatDate(order.orderDate)}
                        </p>
                    </div>
                    <div className="text-right">
                        <span className="text-xl font-bold text-gray-800">₹{order.totalAmount.toFixed(2)}</span>
                        <p className="text-xs text-gray-400 mt-0.5">Total</p>
                    </div>
                </div>

                {/* Customer Details */}
                <div className="mb-4">
                    <h4 className="font-medium text-gray-700 mb-2 flex items-center text-xs uppercase tracking-wide">
                        <User className="w-3.5 h-3.5 mr-1.5 text-orange-500/70" />
                        Customer
                    </h4>
                    <div className="bg-gray-50/80 rounded-lg p-3 space-y-1.5">
                        <p className="text-sm text-gray-700"><span className="font-medium text-gray-600">Name:</span> {order.customerName}</p>
                        <p className="text-sm text-gray-700"><span className="font-medium text-gray-600">Phone:</span> {order.customerPhone}</p>
                        <p className="text-sm text-gray-700"><span className="font-medium text-gray-600">Email:</span> {order.customerEmail}</p>
                    </div>
                </div>

                {/* Items */}
                <div className="mb-4">
                    <h4 className="font-medium text-gray-700 mb-2 flex items-center text-xs uppercase tracking-wide">
                        <ClipboardList className="w-3.5 h-3.5 mr-1.5 text-orange-500/70" />
                        Items ({items.length})
                    </h4>
                    <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                        {items.map((item, index) => (
                            <div key={index} className="flex justify-between items-center bg-orange-50/50 p-2.5 rounded-lg border border-orange-100/50">
                                <div className="flex-1">
                                    <p className="font-medium text-sm text-gray-800">{item.name}</p>
                                    <p className="text-xs text-gray-500">₹{item.price.toFixed(2)} each</p>
                                </div>
                                <span className="bg-orange-500/10 text-orange-600 px-2.5 py-1 rounded-lg text-xs font-semibold border border-orange-200/50">
                                    {item.quantity}x
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2.5 mt-4 pt-4 border-t border-gray-100">
                    <button
                        onClick={() => onReject(order.id)}
                        className="flex-1 bg-white border border-red-200 text-red-600 font-medium py-2.5 px-4 rounded-lg hover:bg-red-50 transition-all duration-200 flex items-center justify-center text-sm"
                    >
                        <X className="w-4 h-4 mr-1.5" />
                        Reject
                    </button>
                    <button
                        onClick={() => onComplete(order.id)}
                        className="flex-1 bg-orange-500/10 border border-orange-200 text-orange-600 font-medium py-2.5 px-4 rounded-lg hover:bg-orange-500/15 transition-all duration-200 flex items-center justify-center text-sm"
                    >
                        <Check className="w-4 h-4 mr-1.5" />
                        Complete
                    </button>
                </div>
            </div>
        </div>
    );
};


const AdminLiveOrders = () => {
    const [liveOrders, setLiveOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Use useCallback to memoize the fetch function
    const fetchLiveOrders = useCallback(async () => {
        try {
            const token = localStorage.getItem('adminToken'); // <-- GET TOKEN
            const response = await fetch(LIVE_ORDERS_URL, {
            headers: {
                'Authorization': `Bearer ${token}` // <-- ADD TOKEN
            }});
            
            if (!response.ok) {
                throw new Error('Failed to fetch live orders.');
            }
            const data = await response.json();
            setLiveOrders(data);
            setError(null);
        } catch (err) {
            console.error(err);
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    }, []); // Empty dependency array means this function is created once

    // UseEffect for initial load and polling
    useEffect(() => {
        // Fetch immediately on component mount
        fetchLiveOrders();

        // Set up the polling interval (every 3 seconds)
        const pollInterval = setInterval(() => {
            console.log("Polling for new orders...");
            fetchLiveOrders();
        }, 3000);

        // Cleanup function: clear the interval when the component unmounts
        return () => {
            clearInterval(pollInterval);
        };
    }, [fetchLiveOrders]); // Depend on the memoized fetchLiveOrders function

const handleAction = async (id, actionType) => {
    const token = localStorage.getItem('adminToken'); // <-- GET TOKEN
    const url = actionType === 'complete' ? `${COMPLETE_ORDER_URL}/${id}` : `${REJECT_ORDER_URL}/${id}`;
 
        try {
            const response = await fetch(url, { 
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}` // <-- ADD TOKEN
            }
        });

            if (!response.ok) {
                throw new Error(`Failed to ${actionType} order.`);
            }
            console.log(`Order ${id} marked as ${actionType}`);
            // Immediately remove the order from the UI for a snappy feel
            setLiveOrders(prevOrders => prevOrders.filter(order => order.id !== id));
            // The polling will confirm the state soon anyway
        } catch (err) {
            console.error(err);
            toast.error(`Error: ${err.message}`, {
              position: "top-right",
              autoClose: 4000,
            });
        }
    };

    const handleComplete = (id) => handleAction(id, 'complete');
    const handleReject = (id) => handleAction(id, 'reject');

    return (
        <div className="w-full">
            {/* Stats Bar */}
            <div className="mb-4 sm:mb-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-5 border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Total Orders</p>
                            <p className="text-xl sm:text-2xl font-bold text-gray-800">{liveOrders.length}</p>
                        </div>
                        <div className="w-9 h-9 sm:w-11 sm:h-11 bg-orange-500/10 rounded-xl flex items-center justify-center border border-orange-200/50">
                            <ClipboardList className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" />
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-5 border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Status</p>
                            <p className="text-xl sm:text-2xl font-bold text-orange-600">Live</p>
                        </div>
                        <div className="w-9 h-9 sm:w-11 sm:h-11 bg-green-500/10 rounded-xl flex items-center justify-center border border-green-200/50">
                            <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-5 border border-gray-100 sm:col-span-2 md:col-span-1">
                    <div className="flex items-center justify-between">
                        <div className="min-w-0 flex-1">
                            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Total Value</p>
                            <p className="text-lg sm:text-2xl font-bold text-gray-800 truncate">
                                ₹{liveOrders.reduce((sum, order) => sum + order.totalAmount, 0).toFixed(2)}
                            </p>
                        </div>
                        <div className="w-9 h-9 sm:w-11 sm:h-11 bg-blue-500/10 rounded-xl flex items-center justify-center border border-blue-200/50 flex-shrink-0 ml-2">
                            <IndianRupee className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Loading / Error / No Orders States */}
            {isLoading && (
                <div className="text-center py-20">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
                    <p className="mt-4 text-gray-600">Loading orders...</p>
                </div>
            )}
            {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
                    <p className="text-red-600 font-semibold">Error: {error}</p>
                </div>
            )}
            {!isLoading && !error && liveOrders.length === 0 && (
                <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100">
                    <div className="w-16 h-16 bg-orange-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-orange-200/50">
                        <CheckCircle2 className="w-8 h-8 text-orange-600" />
                    </div>
                    <p className="text-lg font-semibold text-gray-700 mb-1">No live orders right now!</p>
                    <p className="text-sm text-gray-400">All caught up</p>
                </div>
            )}

            {/* Orders Grid */}
            {!isLoading && liveOrders.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                    {liveOrders.map(order => (
                        <LiveOrderCard 
                            key={order.id} 
                            order={order}
                            onComplete={handleComplete}
                            onReject={handleReject}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminLiveOrders;