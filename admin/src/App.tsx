import React from 'react';
import logo from './logo.svg';
import './App.css';

import LoginAdmin from './pages/loginAdmin/loginAdmin';
import Transactions from './pages/transactions/transactions';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BookAdmin from './pages/bookAdmin/bookAdmin';
import ProfileAdmin from './pages/profileAdmin/profileAdmin';
import ReadingClubAdmin from './pages/readingClubAdmin/readingClubAdmin';
import UserAdmin from './pages/userAdmin/userAdmin';

function App() {

  return (
    <BrowserRouter>

      <Routes>
        {/* Rutas para páginas existentes */}
        {/*<Route path="/" element={<HomePage />} />*/}
        <Route path="/loginAdmin" element={<LoginAdmin />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/bookAdmin" element={<BookAdmin />} />
        <Route path="/profileAdmin" element={<ProfileAdmin />} />
        <Route path="/readingClubAdmin" element={<ReadingClubAdmin />} />
        <Route path="/userAdmin" element={<UserAdmin />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;