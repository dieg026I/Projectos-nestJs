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
import { HomePageLogin } from './pages/home2/home2';
import Sales from './pages/sales/sales';

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
        <Route path="/home2" element={<HomePageLogin />} />
        <Route path="/sales" element={<Sales />} />

        {/* Ruta para la página NotFound */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    
    </BrowserRouter>

  );
}

export default App;
