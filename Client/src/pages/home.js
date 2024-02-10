// Home.js
import React from 'react';

const Home = ({ isLoggedIn, user }) => {
  return (
    <div className="Home">
      <h4>Welcome to the Home Page!</h4>
      <div className='my_site_symbol'>
        <div class="circle">
          <span class="text">Population Counter</span>
        </div>
      </div>
      {isLoggedIn && user && (
        <div>
          <p>Hello, {user.username}!</p> {/* Display user data */}
          {/* Display more user data as needed */}
        </div>
      )}
    </div>
  );
};

export default Home;
