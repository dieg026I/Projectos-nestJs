import React from 'react';
import './App.css';
import 'antd/dist/reset.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import  {HomePage}  from './pages/home/home';
import  LoginPage  from './pages/authentication/login';
import  RegisterPage  from './pages/authentication/register';
import NotFoundPage from './pages/notfound/notfound';
import Cart from './pages/cart/cart';
import ClubLectura from './pages/clubdelectura/clubLectura';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas para páginas existentes */}
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/clubdelectura" element={<ClubLectura />} />

        {/* Ruta para la página NotFound */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    
    </BrowserRouter>

  );
}

export default App;
