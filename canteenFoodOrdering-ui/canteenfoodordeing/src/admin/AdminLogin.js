import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ADMIN_LOGIN_URL = "http://localhost:8080/auth/login";

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(ADMIN_LOGIN_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Invalid username or password');
      }

      const data = await response.json(); // { token: "..." }

      // --- THIS IS THE KEY ---
      // Save the token to localStorage
      localStorage.setItem('adminToken', data.token);

      // Redirect to the admin dashboard
      navigate('/admin');

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 via-orange-50 to-amber-50 p-6 relative overflow-hidden">
      {/* Gradient Overlay Effects */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-200/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-200/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
      
      <div className="w-full max-w-md relative z-10">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-white rounded-2xl shadow-md mb-4 border-2 border-orange-200/50">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500/20 to-amber-500/20 rounded-xl flex items-center justify-center border-2 border-orange-300">
              <span className="text-orange-600 text-lg font-bold">CB</span>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-1">CampusBites</h1>
          <p className="text-sm text-gray-500">Admin Portal</p>
        </div>

        {/* Login Card */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg p-8 border-2 border-orange-200/50">
          <h2 className="text-xl font-bold text-center text-gray-800 mb-6 relative">
            <span className="relative z-10">Admin Login</span>
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full h-11 border-2 border-gray-200 rounded-lg px-4 py-2.5 focus:border-orange-400 focus:ring-2 focus:ring-orange-200 bg-white transition-all duration-200 text-sm"
                placeholder="Enter username"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-11 border-2 border-gray-200 rounded-lg px-4 py-2.5 focus:border-orange-400 focus:ring-2 focus:ring-orange-200 bg-white transition-all duration-200 text-sm"
                placeholder="Enter password"
                required
              />
            </div>

            {error && (
              <div className="bg-red-50/80 border border-red-200/50 rounded-lg p-3">
                <p className="text-sm text-red-600 text-center">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-orange-500/10 border-2 border-orange-300 text-orange-600 font-medium py-2.5 px-6 rounded-lg hover:from-orange-500/20 hover:via-amber-500/20 hover:to-orange-500/20 hover:border-orange-400 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm shadow-sm hover:shadow-md"
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;