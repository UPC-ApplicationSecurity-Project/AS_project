import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Login';
import Noticias from './Noticias';
import Navbar from './Navbar';
import PublicarNoticias from './PublicarNoticias';  // Nueva página
import Register from './Register';

const App = () => {
  const [authToken, setAuthToken] = useState(() => {
    return localStorage.getItem('authToken');  // Recuperamos el token de localStorage
  });

  // Función para manejar el éxito del login
  const handleLoginSuccess = (token) => {
    setAuthToken(token);
    localStorage.setItem('authToken', token);  // Guardar el token simulado en localStorage
  };

  // Función para cerrar sesión
  const handleLogout = () => {
    setAuthToken(null);
    localStorage.removeItem('authToken');  // Eliminar el token
  };

  useEffect(() => {
    console.log('authToken:', authToken);  // Verificar si el token cambia
  }, [authToken]);

  return (
    <Router>
      {/* Solo mostramos el Navbar si el usuario está autenticado */}
      {authToken && <Navbar isAuthenticated={!!authToken} onLogout={handleLogout} />}
      
      <Routes>
        {/* Si el usuario ya tiene un token, redirige a /noticias en lugar de mostrar login */}
        <Route 
          path="/login" 
          element={authToken ? <Navigate to="/noticias" replace /> : <Login onLoginSuccess={handleLoginSuccess} />} 
        />

        {/* Ruta para el registro */}
        <Route
          path="/register"
          element={authToken ? <Navigate to="/noticias" replace /> : <Register />}
        />

        {/* Ruta protegida para Noticias */}
        <Route
          path="/noticias"
          element={authToken ? <Noticias onLogout={handleLogout} /> : <Navigate to="/login" replace />}
        />

        {/* Ruta protegida para Publicar Noticias */}
        <Route
          path="/publicar"
          element={authToken ? <PublicarNoticias /> : <Navigate to="/login" replace />}
        />

        {/* Ruta por defecto */}
        <Route
          path="/"
          element={authToken ? <Navigate to="/noticias" replace /> : <Navigate to="/login" replace />}
        />
      </Routes>
    </Router>
  );
};

export default App;
