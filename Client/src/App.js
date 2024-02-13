// App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import CounterNav from './Components/CounterNav';
import { Register, Login } from './pages/auth';
import Population from './pages/AddToPop';
import Dashboard from './pages/Dashboard'; // Update the path accordingly

import Home from './pages/home'; // Import the Home component
import axios from 'axios';

function App() {
  // State and functions to handle user authentication and data
  const [isLoggedIn, setLoggedIn] = useState(false); // Initialize as false
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null); // State to hold user data

  // Check user login status on component mount
  useEffect(() => {
    checkLoggedInStatus();
  }, []);

  // Function to check user login status
  const checkLoggedInStatus = async () => {
    const storedLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setLoggedIn(storedLoggedIn);
    setLoading(false);

    // If logged in, fetch user data

  };

  // Handle user login
  const handleLogin = () => {
    setLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
  };

  // Handle user logout
  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <Router>
        <div>
          <CounterNav isLoggedIn={isLoggedIn} onLogout={handleLogout} user={user} />
        </div>,

        <Routes>
            <Route path="/" element={<Home isLoggedIn={isLoggedIn} user={user} />} />
            <Route path="/addToPop" element={isLoggedIn ? <Population /> : <Navigate to="/login" />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/logout" element={<Navigate to="/login" />} />
            <Route path="/dashboard" element={<Dashboard />} /> {/* Add this Route */}
            {/* Add more routes as needed */}
          </Routes>

      </Router>
    </div>
  );
}

export default App;
