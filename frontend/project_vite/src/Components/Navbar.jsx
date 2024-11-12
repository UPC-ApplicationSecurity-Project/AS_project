import React from 'react';
import { Link } from 'react-router-dom';

export function Navbar({ isAuthenticated, onLogout }) {
  return (
    <nav style={styles.navbar}>
      {/* Sección del logo o nombre de la página */}
      <div style={styles.brand}>
        MiSitioDeNoticias
        {/* <Link to="/" style={{ ...styles.button, ...styles.brandButton }}>MiSitioNoticias</Link> */}
      </div>

      {/* Opciones de navegación */}
      <ul style={styles.navList}>
        <li style={styles.navItem}>
          <Link to="/noticias" style={{ ...styles.button, ...styles.noticiasButton }}>Noticias</Link>
        </li>
        <li style={styles.navItem}>
          <Link to="/PublicarNoticias" style={{ ...styles.button, ...styles.publicarButton }}>Publicar Noticias</Link>
        </li>
        <li style={styles.navItem}>
          <button onClick={onLogout} style={{ ...styles.button, ...styles.logoutButton }}>Cerrar Sesión</button>
        </li>
      </ul>
    </nav>
  );
}

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#333',
    color: 'white',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  brand: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  navList: {
    display: 'flex',
    listStyleType: 'none',
    margin: 0,
    padding: 0,
  },
  navItem: {
    fontSize: '1.5rem',
    marginLeft: '20px',
  },
  // Estilo base de los botones
  button: {
    padding: '8px 12px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
    color: 'white',
    textDecoration: 'none',
    transition: 'background-color 0.3s ease',
  },
  // Estilos individuales para cada opción
  brandButton: {
    backgroundColor: '#007BFF',  // Azul para el logo/nombre
  },
  noticiasButton: {
    backgroundColor: '#17A2B8',  // Azul claro para Noticias
  },
  publicarButton: {
    backgroundColor: '#28A745',  // Verde para Publicar Noticias
  },
  logoutButton: {
    backgroundColor: '#FF4136',  // Rojo para Cerrar Sesión
  },
  // Hover effect para todos los botones
  buttonHover: {
    opacity: 0.9,
  },
};

export default Navbar;
