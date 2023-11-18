import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext'; // Certifique-se de usar o caminho correto para AuthContext

import Home from './Pages/Home';
import Login from './Pages/Login';
import Loginesenha from './Pages/Loginesenha';
import Cadastrar from './Pages/Cadastrar';
import Ticket from './Pages/Ticket';

const PrivateRoute = ({ element }) => {
  const user = useAuth();
  console.log("Valor de user em PrivateRoute:", user);

  return user ? element : <Navigate to="/login" />;
};

function RoutesApp() {
  return (
    <AuthProvider> {/* Certifique-se de envolver suas rotas no AuthProvider */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/loginesenha" element={<Loginesenha />} />
          <Route path="/cadastrar" element={<Cadastrar />} />
          <Route path="/Ticket" element={<PrivateRoute element={<Ticket />} />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default RoutesApp;