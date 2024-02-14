// App.js

import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import CounterNav from './Components/CounterNav';
import { Register, Login } from './pages/auth';
import Population from './pages/AddToPop';
import Dashboard from './pages/Dashboard';
import Home from './pages/home';
import axios from 'axios'; // Import Axios for making HTTP requests

const PrivateRoute = ({ element, authenticated, ...props }) => {
  return authenticated ? element : <Navigate to="/login" />;
};

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkLoggedInStatus();
  }, []);

  const checkLoggedInStatus = async () => {
    const storedLoggedIn = localStorage.getItem('access_token') ? true : false;
    setLoggedIn(storedLoggedIn);
    setLoading(false);
    if (storedLoggedIn) {
      // Fetch user data if user is logged in
      try {
        const response = await axios.get('https://population-counter.onrender.com/api/dashboard', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`
          }
        });
        setUser(response.data.user);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoggedIn(false); // Log out user if there's an error fetching user data
        localStorage.removeItem('access_token'); // Remove invalid token from local storage
      }
    }
  };

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem('access_token');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <Router>
        <div>
          <CounterNav isLoggedIn={isLoggedIn} onLogout={handleLogout} user={user} />
        </div>
        <Routes>
          <Route path="/" element={<Home isLoggedIn={isLoggedIn} user={user} />} />
          <Route path="/addToPop" element={isLoggedIn ? <Population /> : <Navigate to="/login" />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          {/* Use PrivateRoute for the Dashboard */}
          <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} authenticated={isLoggedIn} />} />
          {/* Add more routes as needed */}
        </Routes>
      </Router>
    </div>
  );
}

const Logout = ({ onLogout }) => {
  useEffect(() => {
    // Call the onLogout function when component mounts
    onLogout();
  }, [onLogout]);

  return <Navigate to="/login" />;
};

export default App;
