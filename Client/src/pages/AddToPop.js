import React from 'react';
import { Navigate } from 'react-router-dom';
import CounterApp from '../Components/CounterApp';

function Population() {
  // Render the CounterApp component if user is authenticated
  return (
    <div>
      <CounterApp />
    </div>
  );
}

export default Population;
