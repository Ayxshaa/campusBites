import React from 'react';
import { Clock, CreditCard, Menu, CheckCircle2, ArrowRight, Users, Building2, Sparkles, Zap, Shield, TrendingUp } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50/50 via-orange-50/30 to-orange-100/50 pt-24">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">About Campus Bites</h1>
          <p className="text-sm text-gray-500 max-w-2xl mx-auto">
            The intelligent food ordering solution designed to make your campus dining experience seamless and efficient.
          </p>
        </div>

        {/* Bento Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {/* Large Card - Our Solution */}
          <div className="md:col-span-2 lg:row-span-2 bg-white rounded-2xl shadow-sm border-2 border-orange-200/50 p-6 hover:shadow-md hover:border-orange-300 transition-all duration-200">
            <div className="h-full flex flex-col">
              <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center mb-4 border border-orange-200/50">
                <Sparkles className="w-6 h-6 text-orange-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Solution</h2>
              <p className="text-gray-600 mb-4 text-sm leading-relaxed flex-1">
                CampusBites is a cutting-edge food ordering platform developed specifically for busy educational and corporate campuses. Our system eliminates long queues and waiting times, allowing users to order and pay for meals with just a few taps.
              </p>
              <p className="text-gray-600 text-sm leading-relaxed">
                Launched in 2025, CampusBites was created to solve the common frustrations experienced in institutional dining settings. Our platform connects diners directly with canteen operations, creating a seamless experience from menu browsing to food pickup.
              </p>
            </div>
          </div>

          {/* Feature Card 1 - Time Saving */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md hover:border-orange-200 transition-all duration-200">
            <div className="w-10 h-10 bg-orange-500/10 rounded-xl flex items-center justify-center mb-3 border border-orange-200/50">
              <Clock className="w-5 h-5 text-orange-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Time-Saving</h3>
            <p className="text-gray-600 text-sm">
              Pre-order meals for pickup at your convenience, skipping the long queues.
            </p>
          </div>

          {/* Feature Card 2 - Cashless */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md hover:border-orange-200 transition-all duration-200">
            <div className="w-10 h-10 bg-orange-500/10 rounded-xl flex items-center justify-center mb-3 border border-orange-200/50">
              <CreditCard className="w-5 h-5 text-orange-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Cashless Payments</h3>
            <p className="text-gray-600 text-sm">
              Multiple secure payment options including cards, wallets, and campus accounts.
            </p>
          </div>

          {/* Feature Card 3 - Menu Management */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md hover:border-orange-200 transition-all duration-200">
            <div className="w-10 h-10 bg-orange-500/10 rounded-xl flex items-center justify-center mb-3 border border-orange-200/50">
              <Menu className="w-5 h-5 text-orange-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Menu Management</h3>
            <p className="text-gray-600 text-sm">
              Browse daily menus with nutritional information and dietary filters.
            </p>
          </div>

          {/* Feature Card 4 - Fast Delivery */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md hover:border-orange-200 transition-all duration-200">
            <div className="w-10 h-10 bg-orange-500/10 rounded-xl flex items-center justify-center mb-3 border border-orange-200/50">
              <Zap className="w-5 h-5 text-orange-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Fast Service</h3>
            <p className="text-gray-600 text-sm">
              Quick order processing and real-time pickup notifications.
            </p>
          </div>
        </div>

        {/* How It Works - Bento Style */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Step 1 */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md hover:border-orange-200 transition-all duration-200">
              <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center mb-4 border border-orange-200/50">
                <span className="text-orange-600 font-bold text-lg">1</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Browse & Select</h3>
              <p className="text-gray-600 text-sm">
                Browse today's menu, see what's available, and add items to your cart.
              </p>
            </div>
            
            {/* Step 2 */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md hover:border-orange-200 transition-all duration-200">
              <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center mb-4 border border-orange-200/50">
                <span className="text-orange-600 font-bold text-lg">2</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Order & Pay</h3>
              <p className="text-gray-600 text-sm">
                Place your order and pay securely through our integrated payment system.
              </p>
            </div>
            
            {/* Step 3 */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md hover:border-orange-200 transition-all duration-200">
              <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center mb-4 border border-orange-200/50">
                <span className="text-orange-600 font-bold text-lg">3</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Pickup Ready</h3>
              <p className="text-gray-600 text-sm">
                Receive a notification when your order is ready for pickup.
              </p>
            </div>
          </div>
        </div>

        {/* Benefits Section - Bento Grid */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Benefits For Everyone</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* For Students/Staff */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md hover:border-orange-200 transition-all duration-200">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-orange-500/10 rounded-xl flex items-center justify-center mr-3 border border-orange-200/50">
                  <Users className="w-5 h-5 text-orange-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">For Students & Staff</h3>
              </div>
              <ul className="text-gray-600 space-y-2.5">
                <li className="flex items-start text-sm">
                  <CheckCircle2 className="w-4 h-4 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                  Minimize wait times during busy lunch hours
                </li>
                <li className="flex items-start text-sm">
                  <CheckCircle2 className="w-4 h-4 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                  Make informed dietary choices with nutritional information
                </li>
                <li className="flex items-start text-sm">
                  <CheckCircle2 className="w-4 h-4 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                  Easy tracking of spending and order history
                </li>
                <li className="flex items-start text-sm">
                  <CheckCircle2 className="w-4 h-4 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                  Receive special promotions and loyalty rewards
                </li>
              </ul>
            </div>
            
            {/* For Canteen Management */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md hover:border-orange-200 transition-all duration-200">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-orange-500/10 rounded-xl flex items-center justify-center mr-3 border border-orange-200/50">
                  <Building2 className="w-5 h-5 text-orange-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">For Canteen Management</h3>
              </div>
              <ul className="text-gray-600 space-y-2.5">
                <li className="flex items-start text-sm">
                  <CheckCircle2 className="w-4 h-4 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                  Improved kitchen workflow and resource allocation
                </li>
                <li className="flex items-start text-sm">
                  <CheckCircle2 className="w-4 h-4 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                  Reduced food waste through better demand forecasting
                </li>
                <li className="flex items-start text-sm">
                  <CheckCircle2 className="w-4 h-4 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                  Valuable analytics on popular items and peak times
                </li>
                <li className="flex items-start text-sm">
                  <CheckCircle2 className="w-4 h-4 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                  Streamlined digital payment processing
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Stats/Additional Info - Bento Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-12">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-3 sm:p-5 text-center hover:shadow-md transition-all duration-200">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-orange-500/10 rounded-xl flex items-center justify-center mx-auto mb-2 sm:mb-3 border border-orange-200/50">
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-gray-800 mb-1">2025</div>
            <div className="text-xs text-gray-500">Launched</div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-3 sm:p-5 text-center hover:shadow-md transition-all duration-200">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-orange-500/10 rounded-xl flex items-center justify-center mx-auto mb-2 sm:mb-3 border border-orange-200/50">
              <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-gray-800 mb-1">100%</div>
            <div className="text-xs text-gray-500">Secure</div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-3 sm:p-5 text-center hover:shadow-md transition-all duration-200">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-orange-500/10 rounded-xl flex items-center justify-center mx-auto mb-2 sm:mb-3 border border-orange-200/50">
              <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" />
            </div>
            <div className="text-lg sm:text-2xl font-bold text-gray-800 mb-1 leading-tight">College Hours</div>
            <div className="text-xs text-gray-500">Available</div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-3 sm:p-5 text-center hover:shadow-md transition-all duration-200">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-orange-500/10 rounded-xl flex items-center justify-center mx-auto mb-2 sm:mb-3 border border-orange-200/50">
              <Users className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-gray-800 mb-1">10K+</div>
            <div className="text-xs text-gray-500">Users</div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-white rounded-2xl shadow-sm border-2 border-orange-200/50 p-6 sm:p-8 text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3">Get In Touch</h2>
          <p className="text-xs sm:text-sm text-gray-500 max-w-2xl mx-auto mb-6 px-4">
            Have questions about implementing CampusBites in your institution? 
            Want to learn more about our features? Our team is here to help.
          </p>
          <button className="bg-orange-500/10 border border-orange-200 text-orange-600 font-medium py-2.5 px-6 rounded-lg hover:bg-orange-500/15 transition-all duration-200 text-sm inline-flex items-center">
            Contact Us
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;