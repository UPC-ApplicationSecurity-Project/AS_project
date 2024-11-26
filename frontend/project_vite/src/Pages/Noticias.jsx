import React, { Component } from 'react';
import { PostList } from '../Components/PostList';
import { Navbar } from '../Components/Navbar';
import './Noticias.css';  // Importa el archivo de estilos

// PÁGINA QUE MUESTRA LAS NOTICIAS
function Noticias() {
  return (
    <>
      {/* Contenedor principal para las noticias */}
      <div className="news-container">
        <h1 style={{ textAlign: 'center', color: '#333' }}>Noticias Recientes</h1>
        {/* Muestra la lista de noticias */}
        <PostList />
      </div>
    </>
  );
}

export default Noticias;
