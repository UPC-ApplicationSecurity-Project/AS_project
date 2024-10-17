// src/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const dangerousChars = /[`'"\<>]/;


  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Validar que no haya caracteres peligrosos -> evitar SQLinjection
    if (dangerousChars.test(username) || dangerousChars.test(password)) {
        setError('No se permiten caracteres especiales en los campos');
        return;
        }

    // Campos no  vacios
    else if (!username || !password) {
      setError('Todos los campos son obligatorios');
      return;
    }
    // aquí habrá que hacer llamada a API con username y password como argumentos
    else if (username === '1' && password === '1') {
      setError('');
      console.log('Autenticación correcta');
      onLoginSuccess(); // Actualiza el estado de autenticación
      navigate('/noticias'); // Redirige a Noticias.js
    } else {
      setError('Usuario o contraseña incorrectos');
    }
  };

  return (
    <div style={styles.container}>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleLogin} style={styles.form}>
        <div style={styles.inputContainer}>
          <label htmlFor="username">Nombre de Usuario:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
          />
        </div>
        <div style={styles.inputContainer}>
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
        </div>
        {error && <p style={styles.error}>{error}</p>}
        <button type="submit" style={styles.button}>Ingresar</button>
      </form>
    </div>
  );
}


// Estilos básicos en línea (puedes moverlos a un archivo CSS si prefieres)
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


export default Login;
