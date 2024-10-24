import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function PublicarNoticias() {
  const [titulo, setTitulo] = useState('');
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar que ambos campos estén llenos
    if (!titulo || !url) {
      setError('Por favor, completa ambos campos.');
      return;
    }

    setError('');

    // Simular el envío de la noticia a una API
    const nuevaNoticia = { titulo, url };
    
    // Simulación de una llamada a la API
    fetch('/api/noticias', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nuevaNoticia),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Noticia enviada:', data);
        // Redirigir a la página de Noticias
        navigate('/noticias');
      })
      .catch((error) => {
        console.error('Error al enviar la noticia:', error);
        setError('Hubo un error al enviar la noticia.');
      });
  };

  return (
    <div style={styles.container}>
      <h2>Publicar Nueva Noticia</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputContainer}>
          <label htmlFor="titulo">Título:</label>
          <input
            type="text"
            id="titulo"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            style={styles.input}
          />
        </div>
        <div style={styles.inputContainer}>
          <label htmlFor="url">URL:</label>
          <input
            type="url"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            style={styles.input}
          />
        </div>
        {error && <p style={styles.error}>{error}</p>}
        <button type="submit" style={styles.button}>Publicar</button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f5f5f5',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '300px',
    padding: '30px',
    border: '1px solid #ccc',
    borderRadius: '30px',
    backgroundColor: 'white',
  },
  inputContainer: {
    marginBottom: '15px',
  },
  input: {
    width: '100%',
    padding: '8px',
    margin: '5px 0',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    fontWeight: 'bold',
    marginBottom: '15px',
  },
};

export default PublicarNoticias;
