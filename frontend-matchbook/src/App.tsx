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
  const isAuthenticated = localStorage.getItem('access_token') != null; 

  // Depurar estado de autenticación
  console.log("Token en localStorage: ", localStorage.getItem('access_token'));
  console.log("Usuario autenticado: ", isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      console.log("Error de ingreso");
      navigate('/login');
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
  
  const [username, setUsername] = useState(''); 
  const [user, setUser] = useState(null);
  return (
    <BrowserRouter>

      <Routes>
        {/* Rutas para páginas existentes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/readingClub" element={<ReadingClub />} />
        <Route path="/home2" element={<ProtectedRoute><HomePageLogin /></ProtectedRoute>} />
        <Route path="/sales" element={<ProtectedRoute><Sales /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/marketplace" element={<Marketplace />} />

        {/* Ruta para la página NotFound */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    
    </BrowserRouter>

  );
}

export default App;