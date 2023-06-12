// src/App.js
import React from 'react';
import "./App.css"
import HouseLayout from './components/HouseLayout';

const App = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Housing Layout UI</h1>
      <HouseLayout />
    </div>
  );
};

export default App;


