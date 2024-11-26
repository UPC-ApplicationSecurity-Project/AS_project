import React, { Component } from 'react';
import { PostList } from '../Components/PostList';
import { Navbar } from '../Components/Navbar';
import './Noticias.css';  // Importa el archivo de estilos

// PÁGINA QUE MUESTRA LAS NOTICIAS
function Noticias(accessToken) {
  return (
    <div className="news-container">
      <h1 style={{ textAlign: 'center', color: '#333' }}>Noticias Recientes</h1>
      <PostList accessToken={accessToken} /> {/* Pasa el token a PostList */}
    </div>
  );
}

export default Noticias;
