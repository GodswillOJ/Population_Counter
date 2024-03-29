import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faInstagram, faTwitter, faFacebook, faWhatsapp } from '@fortawesome/free-brands-svg-icons'; 

function FindData() {
  const [users, setUsers] = useState([]);
  const [state, setState] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchUsersByState = async () => {
    try {
      setLoading(true);
      const accessToken = localStorage.getItem('access_token');
      const response = await axios.get(`https://population-counter.onrender.com/api/usersByState/${state}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users by state:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (state) {
      fetchUsersByState();
    }
  }, [state]);

  const states = [
    'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno', 'Cross River', 'Delta',
    'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'Gombe', 'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi',
    'Kwara', 'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba',
    'Yobe', 'Zamfara',
  ];

  return (
    <div>
      <div className="Find_data">
        <div><Link to="/addToPop"><p>Add New</p></Link></div>
        <h2>Find Users by State</h2>
        <div>
          {/* State Selection Dropdown */}
          <div className="form-group select-wrapper" id="selectWrap">
            <label htmlFor="stateSelect">Select State:</label>
            <select
              id="stateSelect"
              value={state}
              onChange={(e) => setState(e.target.value)}
            >
              <option value="">Select State</option>
              {states.map((state, index) => (
                <option key={index} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>
        </div>
        {/* Display Users in Table */}
        <div>
          <h3>Users in {state}</h3>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>DOB</th>
                  <th>Address</th>
                  {/* Add more columns as needed */}
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={index}>
                    <td style={{ padding: '8px' }}>{user.name}</td>
                    <td style={{ padding: '8px' }}>
                      {user.dateOfBirth ? user.dateOfBirth.substring(0, 10) : ''}
                    </td>
                    <td style={{ padding: '8px' }}>{user.address}</td>
                    {/* Add more cells for additional user data */}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <div id="Footer_Dash">
            <div>
            <Link to="https://www.linkedin.com/in/godswill-ogono-861802144/"><li><FontAwesomeIcon icon={faLinkedin} /></li></Link>
            <Link to="https://www.twitter.com/"><li><FontAwesomeIcon icon={faTwitter} /></li></Link>
            <Link to="https://www.instagram.com/godswill_oj/"><li><FontAwesomeIcon icon={faInstagram} /></li></Link>
            <Link to="https://api.whatsapp.com/send?phone=2347036744231&text=Hello, more information!"><li><FontAwesomeIcon icon={faWhatsapp} /></li></Link>
            <Link to="https://wwww.facebook.com/"><li><FontAwesomeIcon icon={faFacebook} /></li></Link>
            </div>
        </div>
    </div>
  );
}

export default FindData;
