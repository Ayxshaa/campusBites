import React, { useState } from 'react';
import AdminLiveOrders from './AdminLiveOrders';   // The component I gave you
import AdminPastOrders from './AdminPastOrders';   // The component I gave you
import AdminAddItem from './AdminAddItem';         // Your renamed "Add Item" form

const AdminDashboard = () => {
  // State to manage which view is active
  const [activeView, setActiveView] = useState('live'); // 'live', 'past', or 'add_item'

  // Helper function to dynamically set the style for the active button
  const getButtonClass = (viewName) => {
    return activeView === viewName
      ? 'text-lg font-medium text-white bg-orange-500 py-2 px-4 rounded-lg shadow-md'
      : 'text-lg font-medium text-gray-600 hover:text-orange-500 py-2 px-4';
  };

  // Helper function to render the correct component based on state
  const renderView = () => {
    switch (activeView) {
      case 'live':
        return <AdminLiveOrders />;
      case 'past':
        return <AdminPastOrders />;
      case 'add_item':
        return <AdminAddItem />;
      default:
        return <AdminLiveOrders />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* === UNIFIED ADMIN HEADER === */}
        <div className="flex justify-between items-center mb-6 p-4 bg-white shadow rounded-lg">
          <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
          
          {/* Navigation buttons that change the state */}
          <div className="flex gap-4">
            <button
              onClick={() => setActiveView('live')}
              className={getButtonClass('live')}
            >
              Live Orders
            </button>
            <button
              onClick={() => setActiveView('past')}
              className={getButtonClass('past')}
            >
              Past Orders
            </button>
            <button
              onClick={() => setActiveView('add_item')}
              className={getButtonClass('add_item')}
            >
              Add New Item
            </button>
          </div>
        </div>

        {/* === CONTENT AREA === */}
        {/* This is where the active component will be rendered */}
        <div className="content-area">
          {renderView()}
        </div>
        
      </div>
    </div>
  );
};

export default AdminDashboard;