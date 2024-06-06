import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

import LoginAdmin from './pages/loginAdmin/loginAdmin';
import Transactions from './pages/transactions/transactions';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import BookAdmin from './pages/bookAdmin/bookAdmin';
import ReadingClubAdmin from './pages/readingClubAdmin/readingClubAdmin';
import UserAdmin from './pages/userAdmin/userAdmin';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('access_token') != null; 

  // Depurar estado de autenticación
  console.log("Token en localStorage: ", localStorage.getItem('access_token'));
  console.log("Usuario autenticado: ", isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      console.log("Error de ingreso");
      navigate('/loginAdmin');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    console.log("Error de ingreso");
    return null; 
  }

  console.log("Bienvenido a Matchbook");
  return <>{children}</>;
};

function App() {

  return (
    <BrowserRouter>

      <Routes>
        {/* Rutas para páginas existentes */}
        <Route path="/loginAdmin" element={<LoginAdmin />} />
        <Route path="/" element={<ProtectedRoute><Transactions /></ProtectedRoute>} />
        <Route path="/bookAdmin" element={<ProtectedRoute><BookAdmin /></ProtectedRoute>} />
        <Route path="/readingClubAdmin" element={<ProtectedRoute><ReadingClubAdmin /></ProtectedRoute>} />
        <Route path="/userAdmin" element={<ProtectedRoute><UserAdmin /></ProtectedRoute>} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;