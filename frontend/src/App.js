// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Login';
import Noticias from './Noticias';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });

  // Función para manejar el éxito del login
  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true'); // Guardar en localStorage
  };

  // Función para cerrar sesión
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated'); // Eliminar el estado de autenticación
  };

  useEffect(() => {
    console.log('isAuthenticated:', isAuthenticated); // Verificar si el estado cambia
  }, [isAuthenticated]);

  return (
    <Router>
      <Routes>
        {/* Si el usuario ya está autenticado, redirige a /noticias en lugar de mostrar login */}
        <Route 
          path="/login" 
          element={isAuthenticated ? <Navigate to="/noticias" replace /> : <Login onLoginSuccess={handleLoginSuccess} />} 
        />

        {/* Ruta protegida para Noticias */}
        <Route
          path="/noticias"
          element={isAuthenticated ? <Noticias onLogout={handleLogout} /> : <Navigate to="/login" replace />}
        />

        {/* Ruta por defecto */}
        <Route
          path="/"
          element={isAuthenticated ? <Navigate to="/noticias" replace /> : <Navigate to="/login" replace />}
        />
      </Routes>
    </Router>
  );
};

export default App;
