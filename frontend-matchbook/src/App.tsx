import React from 'react';
import './App.css';
import 'antd/dist/reset.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import  {HomePage}  from './pages/home/home';
import  LoginPage  from './pages/authentication/login';
import  RegisterPage  from './pages/authentication/register';
import NotFoundPage from './pages/notfound/notfound';





function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas para páginas existentes */}
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Ruta para la página NotFound */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    
    </BrowserRouter>

  );
}



  /*
function App() {
  return (
    <BrowserRouter>
      <MyRoutes />
    </BrowserRouter>

    
  );
}
*/


export default App;
