import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

const Home = ({ isLoggedIn }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (isLoggedIn) {
          const accessToken = localStorage.getItem('access_token');
          const response = await axios.get('https://population-counter-cxgx.onrender.com/api/dashboard', {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          });
          setUserData(response.data.userData);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [isLoggedIn]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="Home">
      {isLoggedIn && userData && (
        <div id="my_home_cont">
          <div id="my_home_det">
            <h4>Welcome, {userData.username}</h4>
          </div>
        </div>
      )}
      <div className='my_site_symbol'>
        <div class="circle">
          <span class="text">Population Counter</span>
        </div>
      </div>
    </div>
  );
};

export default Home;

