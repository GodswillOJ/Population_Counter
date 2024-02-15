import React from 'react';
import { Navigate } from 'react-router-dom';
import CounterApp from '../Components/CounterApp';
import MyFooter from '../Components/myFooter'

function Population() {
  // Render the CounterApp component if user is authenticated
  return (
    <div>
      <CounterApp />
      <MyFooter />
    </div>
  );
}

export default Population;
