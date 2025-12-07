import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClipboardList, History, Plus, LogOut, Menu, X } from 'lucide-react';
import AdminLiveOrders from './AdminLiveOrders';
import AdminPastOrders from './AdminPastOrders';
import AdminAddItem from './AdminAddItem';

const AdminDashboard = () => {
  const [activeView, setActiveView] = useState('live');
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Animate sidebar from left
    setSidebarVisible(true);
    // Animate header from top with slight delay
    setTimeout(() => {
      setHeaderVisible(true);
    }, 200);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  const menuItems = [
    { id: 'live', label: 'Live Orders', icon: ClipboardList },
    { id: 'past', label: 'Past Orders', icon: History },
    { id: 'add_item', label: 'Add Item', icon: Plus },
  ];

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
    <div className="min-h-screen bg-gradient-to-br from-orange-50/50 via-orange-50/30 to-orange-100/50 flex">
      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div 
        className={`fixed lg:static inset-y-0 left-0 w-64 bg-white/95 backdrop-blur-sm shadow-sm flex flex-col border-r border-gray-100 transition-all duration-300 ease-out z-50 lg:z-auto ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } ${sidebarVisible ? 'opacity-100' : 'opacity-0 lg:opacity-100'}`}
      >
        {/* Logo Section */}
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-orange-500/10 rounded-xl flex items-center justify-center border border-orange-200/50">
              <span className="text-orange-600 text-lg font-bold">CB</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-800">CampusBites</h1>
              <p className="text-xs text-gray-500">Admin Panel</p>
            </div>
          </div>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4 space-y-1">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveView(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${
                  activeView === item.id
                    ? 'bg-orange-500/10 text-orange-600 border border-orange-200/50'
                    : 'text-gray-600 hover:bg-gray-50/80'
                }`}
              >
                <IconComponent className={`w-4 h-4 ${activeView === item.id ? 'text-orange-600' : 'text-gray-500'}`} />
                <span className="font-medium text-sm">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg bg-gray-50/80 text-gray-600 hover:bg-gray-100/80 transition-all duration-200 font-medium text-sm"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header 
          className={`bg-white/80 backdrop-blur-sm shadow-sm border-b border-gray-100 px-4 sm:px-6 lg:px-8 py-4 sm:py-5 transition-all duration-700 ease-out ${
            headerVisible ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Menu className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                  {menuItems.find(item => item.id === activeView)?.label || 'Dashboard'}
                </h2>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 sm:w-9 sm:h-9 bg-orange-500/10 rounded-full flex items-center justify-center border border-orange-200/50">
                <span className="text-orange-600 text-xs sm:text-sm font-semibold">A</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          {renderView()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;