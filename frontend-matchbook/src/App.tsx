import React, { useEffect } from 'react';
import './App.css';
import 'antd/dist/reset.css';
import { BrowserRouter, Route, Routes, useNavigate  } from "react-router-dom";
import  {HomePage}  from './pages/home/home';
import  LoginPage  from './pages/authentication/login';
import  RegisterPage  from './pages/authentication/register';
import NotFoundPage from './pages/notfound/notfound';
import Cart from './pages/cart/cart';
import ClubLectura from './pages/clubdelectura/clubLectura';
import { HomePageLogin } from './pages/home2/home2';
import Sales from './pages/sales/sales';


const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('access_token') !== null; 

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas para páginas existentes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/clubdelectura" element={<ClubLectura />} />
        <Route path="/home2" element={<ProtectedRoute><HomePageLogin /></ProtectedRoute>} />
        <Route path="/sales" element={<ProtectedRoute><Sales /></ProtectedRoute>} />

        {/* Ruta para la página NotFound */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    
    </BrowserRouter>

  );
}

export default App;