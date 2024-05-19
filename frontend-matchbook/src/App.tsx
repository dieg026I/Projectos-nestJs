import React, { useEffect, useState } from 'react';
import './App.css';
import 'antd/dist/reset.css';
import { BrowserRouter, Route, Routes, useNavigate  } from "react-router-dom";
import  {HomePage}  from './pages/home/home';
import  LoginPage  from './pages/authentication/login';
import  RegisterPage  from './pages/authentication/register';
import NotFoundPage from './pages/notfound/notfound';
import Cart from './pages/cart/cart';
import { HomePageLogin } from './pages/home2/home2';
import Sales from './pages/sales/sales';
import NavBarLogin from './components/common/NavBarLogin/navBarLogin';
import Profile from './pages/profile/profile';
import ReadingClub from './pages/readingClub/readingClub';
import Marketplace from './pages/marketplace/marketplace';


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
  
  const [username, setUsername] = useState(''); 

  return (
    <BrowserRouter>

      <Routes>
        {/* Rutas para páginas existentes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/readingClub" element={<ReadingClub />} />
        <Route path="/home2" element={<HomePageLogin />} />
        <Route path="/sales" element={<Sales />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/marketplace" element={<Marketplace />} />

        {/* Ruta para la página NotFound */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    
    </BrowserRouter>

  );
}

export default App;