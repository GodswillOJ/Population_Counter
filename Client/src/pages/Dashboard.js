import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom'; // Import Navigate for redirection
import Chart from 'chart.js/auto';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({});
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Track authentication state

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        // Check if the access token is present in local storage
        const accessToken = localStorage.getItem('access_token');
        if (accessToken) {
          setIsAuthenticated(true);
          // Fetch user data for the dashboard
          const response = await axios.get('https://population-counter.onrender.com/api/dashboard', {
            headers: {
              Authorization: `Bearer ${accessToken}` // Include the access token in the request headers
            }
          });
          setUserData(response.data);
          setDashboardData(response.data);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
  
    checkAuthentication();
  }, []);

  useEffect(() => {
    // Check if the elements exist before creating the charts
    const clicksChartElement = document.getElementById('myClicks');
    const ordersChartElement = document.getElementById('myChart');

    if (clicksChartElement && ordersChartElement) {
      // Create Chart for clicks
      const clicksChart = new Chart(clicksChartElement, {
        type: 'bar',
        data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June'],
          datasets: [
            {
              label: 'Clicks',
              data: [12, 19, 3, 5, 2, 3],
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        },
      });

      // Create Chart for orders
      const ordersChart = new Chart(ordersChartElement, {
        type: 'bar',
        data: {
          labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
          datasets: [
            {
              label: 'Orders',
              data: [12, 19, 3, 5, 2, 3],
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1,
            },
          ],
        },
      });

      // Cleanup when the component unmounts
      return () => {
        clicksChart.destroy();
        ordersChart.destroy();
      };
    }
  }, [dashboardData]);

  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen((prevOpen) => !prevOpen);
  };
  

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />; // Redirect unauthorized users to login page
  }

  return (
    <div>
      <h2>Dashboard</h2>
      {userData && (
        <div>
          {/* <p>Username: {userData.username}</p>
          <p>Email: {userData.email}</p> */}
          <div className="userDashBoard">
              <header className={`nav dropdown fixed-header ${isDropdownOpen ? 'open' : ''}`} id="menu">
                <button onClick={toggleDropdown}>
                  <div id="my_logo"><i className="fa-solid fa-house"></i> Gotech_dashboard</div>
                  <i id="my_logo_down" className="fa-solid fa-chevron-down"></i>
                </button>
                <ul className={`dropdown-content ${isDropdownOpen ? 'show' : ''}`} id="myDropdown">
                  <Link to=""><li><p>Dashboard</p></li></Link>
                  <Link to=""><li><p>Profile</p></li></Link>
                  <Link to=""><li><p>Cart</p></li></Link>
                  <Link to=""><li><p>Settings</p></li></Link>
                  <Link to="/addToPop"><li><p>Add Data</p></li></Link>
                  <Link to=""><li><p>Messages</p></li></Link>
                </ul>
              </header>


              <div id="dash_board">
                <div className="dashboard_sec">
                    <div id="dash_head">
                    <h2>User Dashboard</h2>
                        <ul id="entry_cont">
                          {Object.entries(dashboardData).map(([key, value]) => (
                            <li id="my_entries" key={key}>
                              <strong>{key}:</strong> {value}
                            </li>
                            
                          ))}
                        </ul>
                        <div id="highlights">
                            <h1>Good Day, Samantha!</h1>
                            <p>Hey Samantha, Here is your store overview</p>
                        </div>

                        <div id="total_sales">
                            <div className="sales_visits">
                                <p>New clicks</p>
                                <h3>10,200</h3>
                            </div>
                            <div className="sales_total">
                                <p>New sales</p>
                                <h3>10,200</h3>
                            </div>
                        </div>

                        <div id="sales_notification">
                            <li className="not_product">
                                <p>10 new admin notification</p>
                                <Link to="" >view notification <i className="fa-solid fa-circle-chevron-right"></i></Link>
                            </li>
                            <li className="not_product">
                                <p>18 new order notification</p>
                                <Link to="" >view notification <i className="fa-solid fa-circle-chevron-right"></i></Link>
                            </li>
                            <li className="not_product">
                                <p>5 pending order payments notification</p>
                                <Link to="" >view notification <i className="fa-solid fa-circle-chevron-right"></i></Link>
                            </li>
                        </div>
                    </div>
                </div>

                <div id="visual_split">
                    
                    <div id="dash_visuals">

                        <div className="order-chart">
                            <canvas id="myClicks"></canvas>
                        </div>  
                        

                        <div className="order-chart">
                            <canvas id="myChart"></canvas>
                        </div>
                    </div>
                </div>
              </div>
          </div>
        </div>
      )}
      
    </div>
  );
};

export default Dashboard;
