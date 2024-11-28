import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Pages/Login';
import Noticias from './Pages/Noticias';
import PublicarNoticias from './Pages/PublicarNoticias';
import { CreateUser } from './Pages/admin';
import { EditUser }  from './Pages/User';
import Navbar from './Components/Navbar';
import Register from './Pages/Register';

import React, { useState, useEffect } from 'react';

const App = () => {
  const [accessToken, setAccessToken] = useState(() => {
    return localStorage.getItem('accessToken');  // Recuperamos el token de localStorage
  });
  const [refreshToken, setRefreshToken] = useState(() => {
    return localStorage.getItem('refreshToken');  // Recuperamos el token de localStorage
  }); 

  // Función para manejar el éxito del login
  const handleLoginSuccess = (token_a, token_r) => {
    setAccessToken(token_a);
    setRefreshToken(token_r);
    console.log(token_a)
    console.log(token_r)
    //localStorage.setItem('accessToken', token_a);  // Guardar el accessToken 
    //localStorage.setItem('refreshToken', token_r);  // Guardar el refreshToken
    //console.log(accessToken)
    //console.log(refreshToken)
  };

  // Función para cerrar sesión
  const handleLogout = () => {
    setAccessToken(null);
    setRefreshToken(null);
    localStorage.removeItem('accessToken');  // Eliminar el token
    localStorage.removeItem('refreshToken');  // Eliminar el token
  };

  useEffect(() => {
    //console.log('accessToken:', accessToken);  // Verificar si el token cambia
    //console.log('refreshToken:', refreshToken);  // Verificar si el token cambia
  });

  return (
    <Router>
      {/* Solo mostramos el Navbar si el usuario está autenticado */}
      {accessToken && <Navbar onLogout={handleLogout} />}
      
      <Routes>
        {/* Si el usuario ya tiene un token, redirige a /noticias en lugar de mostrar login */}
        <Route 
          path="/login" 
          element={accessToken ? <Navigate to="/Noticias" replace /> : <Login onLoginSuccess={handleLoginSuccess} />} 
        />

        {/* Ruta para el registro */}
        <Route
          path="/register"
          element={accessToken ? <Navigate to="/noticias" replace /> : <Register />}
        />

        {/* Ruta protegida para Noticias */}
        <Route
          path="/noticias"
          element={accessToken ? <Noticias accessToken={accessToken} /> : <Navigate to="/login" replace />}
        />

        {/* Ruta protegida para Publicar Noticias */}
        <Route
          path="/PublicarNoticias"
          element={accessToken ? <PublicarNoticias accessToken={accessToken} /> : <Navigate to="/login" replace />}
        />

        {/* Ruta protegida para Editar Noticias */}
        <Route
          path="/PublicarNoticias/:id"
          element={accessToken ? <PublicarNoticias accessToken={accessToken} /> : <Navigate to="/login" replace />}
        />


        {/* Ruta por defecto */}
        <Route
          path="/"
          element={accessToken ? <Navigate to="/noticias" replace /> : <Navigate to="/login" replace />}
        />
      </Routes>
    </Router>
  );
};

export default App;
