import React from 'react';

function Noticias({ onLogout }) {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Bienvenido a Noticias</h1>
      {/* <button onClick={onLogout} style={styles.button}>Cerrar Sesión</button> */}
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  title: {
    fontSize: '4rem',
    fontWeight: 'bold',
  },
  button: {
    marginTop: '20px',
    padding: '10px',
    backgroundColor: '#FF4136',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default Noticias;
