import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ClaimPage from './pages/ClaimPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/claim" element={<ClaimPage />} />
    </Routes>
  );
}

export default App;