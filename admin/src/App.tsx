import React from 'react';
import logo from './logo.svg';
import './App.css';

import LoginAdmin from './pages/loginAdmin/loginAdmin';
import Transactions from './pages/transactions/transactions';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {

  return (
    <BrowserRouter>

      <Routes>
        {/* Rutas para páginas existentes */}
        {/*<Route path="/" element={<HomePage />} />*/}
        <Route path="/loginAdmin" element={<LoginAdmin />} />
        <Route path="/transactions" element={<Transactions />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;