import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LandingPage from './components/Landingpage';
import TrackOrdersPage from './components/TrackOrdersPage';
import Navbar from './components/Navbar';
import MenuPage from './components/MenuPage';
import About from './components/About';
import TodaySpecial from './components/TodaySpecial';
import CheckoutPage from './components/CheckoutPage';
import CartPage from './components/CartPage';
import { CartProvider } from './components/CartContext';
import Snacks from './components/Snacks';
import Breakfast from './components/Breakfast';
import Lunch from './components/Lunch';
import Beverages from './components/Beverages';
import AdminDashboard from './admin/AdminDashboard';
import ProtectedAdminRoute from './admin/ProtectedAdminRoute';
import AdminLogin from './admin/AdminLogin';

function App() {
  const location = useLocation();
  const hideNavbar = location.pathname.startsWith("/admin");

  return (
    <CartProvider>
      {/* navbar hidden on any /admin route */}
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route index element={<LandingPage />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/menu" element={<MenuPage/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/specials" element={<TodaySpecial/>} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/snacks" element={<Snacks />} />
        <Route path="/breakfast" element={<Breakfast />} />
        <Route path="/lunch" element={<Lunch />} />
        <Route path="/beverages" element={<Beverages />} />
        <Route path="/track-orders" element={<TrackOrdersPage />} />

        <Route path="/admin/login" element={<AdminLogin />} />

        <Route element={<ProtectedAdminRoute />}>
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        toastClassName="custom-toast"
        bodyClassName="custom-toast-body"
        progressClassName="custom-toast-progress"
      />
    </CartProvider>
  );
}

export default App;
