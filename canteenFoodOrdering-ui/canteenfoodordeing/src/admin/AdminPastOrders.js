import React, { useState, useEffect } from 'react';
import { Calendar, CheckCircle2, ClipboardList, IndianRupee, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

const PAST_ORDERS_URL = "http://localhost:8080/api/admin/past-orders";

// A helper component for displaying a single past order
const PastOrderCard = ({ order }) => {
    
    const items = JSON.parse(order.itemsJson || "[]");
    const isCompleted = order.status === 'COMPLETED';

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className={`bg-white rounded-2xl shadow-sm border-l-4 overflow-hidden hover:shadow-md transition-all duration-200 ${
            isCompleted ? 'border-green-400' : 'border-red-400'
        }`}>
            <div className="p-5">
                {/* Header */}
                <div className="flex justify-between items-start mb-4 pb-4 border-b border-gray-100">
                    <div>
                        <h3 className="text-lg font-bold text-gray-800 mb-2">Order #{order.originalOrderId}</h3>
                        <div className="space-y-1">
                            <p className="text-sm text-gray-500 flex items-center">
                                <Calendar className="w-3.5 h-3.5 mr-1.5 text-gray-400" />
                                Ordered: {formatDate(order.orderDate)}
                            </p>
                            <p className="text-sm text-gray-500 flex items-center">
                                <CheckCircle2 className="w-3.5 h-3.5 mr-1.5 text-gray-400" />
                                Handled: {formatDate(order.completedDate)}
                            </p>
                        </div>
                    </div>
                    <div className="text-right">
                        <span className={`inline-block px-3 py-1 rounded-lg text-xs font-semibold ${
                            isCompleted 
                                ? 'bg-green-500/10 text-green-700 border border-green-200/50' 
                                : 'bg-red-500/10 text-red-700 border border-red-200/50'
                        }`}>
                            {order.status}
                        </span>
                        <p className="text-xl font-bold text-gray-800 mt-2">₹{order.totalAmount.toFixed(2)}</p>
                    </div>
                </div>

                {/* Customer Info */}
                <div className="mb-4">
                    <div className="bg-gray-50/80 rounded-lg p-3 space-y-1.5">
                        <p className="text-sm text-gray-700"><span className="font-medium text-gray-600">Customer:</span> {order.customerName}</p>
                        <p className="text-sm text-gray-700"><span className="font-medium text-gray-600">Phone:</span> {order.customerPhone}</p>
                    </div>
                </div>
                
                {/* Items */}
                <details className="text-sm">
                    <summary className="font-medium text-gray-700 cursor-pointer flex items-center hover:text-orange-600 transition-colors text-xs uppercase tracking-wide">
                        <ClipboardList className="w-3.5 h-3.5 mr-1.5 text-orange-500/70" />
                        View Items ({items.length})
                    </summary>
                    <div className="space-y-1.5 mt-3 p-3 bg-orange-50/50 rounded-lg border border-orange-100/50">
                        {items.map((item, index) => (
                            <div key={index} className="flex justify-between items-center py-1.5 border-b border-orange-200/30 last:border-0">
                                <span className="text-gray-700 font-medium text-sm">{item.quantity}x {item.name}</span>
                                <span className="text-gray-800 font-semibold text-sm">₹{(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                        ))}
                        <div className="flex justify-between font-bold pt-2 mt-2 border-t border-orange-200/50">
                            <span className="text-gray-800">Total</span>
                            <span className="text-gray-800">₹{order.totalAmount.toFixed(2)}</span>
                        </div>
                    </div>
                </details>
            </div>
        </div>
    );
};


const AdminPastOrders = () => {
    const [pastOrders, setPastOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch only once on component mount
        const fetchPastOrders = async () => {
            const token = localStorage.getItem('adminToken'); // <-- GET TOKEN
            try {
                const response = await fetch(PAST_ORDERS_URL, {
                headers: {
                    'Authorization': `Bearer ${token}` // <-- ADD TOKEN
                }
            });
                if (!response.ok) {
                    throw new Error('Failed to fetch past orders.');
                }
                const data = await response.json();
                setPastOrders(data);
                setError(null);
            } catch (err) {
                console.error(err);
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };
        
        fetchPastOrders();
    }, []); // Empty dependency array ensures this runs only once

    const completedCount = pastOrders.filter(order => order.status === 'COMPLETED').length;
    const rejectedCount = pastOrders.filter(order => order.status === 'REJECTED').length;
    const totalRevenue = pastOrders
        .filter(order => order.status === 'COMPLETED')
        .reduce((sum, order) => sum + order.totalAmount, 0);

    return (
        <div className="w-full">
            {/* Stats Bar */}
            <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Total Orders</p>
                            <p className="text-2xl font-bold text-gray-800">{pastOrders.length}</p>
                        </div>
                        <div className="w-11 h-11 bg-orange-500/10 rounded-xl flex items-center justify-center border border-orange-200/50">
                            <ClipboardList className="w-5 h-5 text-orange-600" />
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Completed</p>
                            <p className="text-2xl font-bold text-green-600">{completedCount}</p>
                        </div>
                        <div className="w-11 h-11 bg-green-500/10 rounded-xl flex items-center justify-center border border-green-200/50">
                            <CheckCircle2 className="w-5 h-5 text-green-600" />
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Total Revenue</p>
                            <p className="text-2xl font-bold text-gray-800">₹{totalRevenue.toFixed(2)}</p>
                        </div>
                        <div className="w-11 h-11 bg-blue-500/10 rounded-xl flex items-center justify-center border border-blue-200/50">
                            <IndianRupee className="w-5 h-5 text-blue-600" />
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
            {!isLoading && !error && pastOrders.length === 0 && (
                <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100">
                    <div className="w-16 h-16 bg-orange-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-orange-200/50">
                        <FileText className="w-8 h-8 text-orange-600" />
                    </div>
                    <p className="text-lg font-semibold text-gray-700 mb-1">No past orders found</p>
                    <p className="text-sm text-gray-400">Orders will appear here once they are completed or rejected</p>
                </div>
            )}

            {/* Orders List */}
            {!isLoading && pastOrders.length > 0 && (
                <div className="space-y-4">
                    {pastOrders.map(order => (
                        <PastOrderCard key={order.id} order={order} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminPastOrders;