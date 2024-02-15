import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MyFooter from '../Components/myFooter'// Import MyFooter component

const Home = ({ isLoggedIn }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (isLoggedIn) {
          const accessToken = localStorage.getItem('access_token');
          const response = await axios.get('https://population-counter.onrender.com/api/', {
            headers: {
              Authorization: `Bearer ${accessToken}` // Include the access token in the request headers
            }
          });
          setUserData(response.data);
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
        <div className="circle">
          <span className="text">Population Counter</span>
        </div>
      </div>
      {/* Render MyFooter component */}
      <MyFooter />
    </div>
  );
};

export default Home;
