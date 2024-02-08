// App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import CounterNav from './Components/CounterNav';
import { Register, Login } from './pages/auth';
import Population from './pages/AddToPop';
import LoadDashboard from './pages/Dashboard';
import Home from './pages/Home'; // Import the Home component
import axios from 'axios';

function App() {
  // State and functions to handle user authentication and data
  const [isLoggedIn, setLoggedIn] = useState(null);
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
    if (storedLoggedIn) {
      try {
        const response = await axios.get('http://localhost:5000/api/home'); // Assuming your backend endpoint to fetch user data is '/api/home'
        setUser(response.data.user); // Assuming the response contains user data under the key 'user'
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }
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
          <CounterNav isLoggedIn={isLoggedIn} onLogout={handleLogout} user={user} /> {/* Pass user data to CounterNav */}
        </div>

        <Routes>
          <Route path="/" element={<Home isLoggedIn={isLoggedIn} user={user} />} /> {/* Pass user data to Home */}
          <Route path="/addToPop" element={isLoggedIn ? <Population /> : <Navigate to="/login" />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/dashboard" element={isLoggedIn ? <LoadDashboard /> : <Navigate to="/login" />} />
          <Route path="/logout" element={<Navigate to="/login" />} />
          {/* Add more routes as needed */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
