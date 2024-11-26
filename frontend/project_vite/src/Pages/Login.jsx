import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const dangerousChars = /[`´'"\\<>{}]/;
  const validUsernameCharacters = /^[A-Za-z0-9_]+$/;

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    // Campos no  vacios
    if (!username || !password) {
      setError('Todos los campos son obligatorios');
      return;
    }
    else if( !validUsernameCharacters.test(username)){
      setError('Campo username no válido. Solo puede contener letras, números y guines bajos');
    }
    // Validar que no haya caracteres peligrosos -> evitar SQLinjection
    else if (dangerousChars.test(username) || dangerousChars.test(password)) {
      setError('No se permiten caracteres especiales en los campos');
      return;
    }
    
    else{
      // llamada a API con username y password como argumentos
      const userData = {
        username,
        password,
      };
      try {
        // Llamada a la API
        const response = await fetch('http://127.0.0.1:8000/api/token/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });
    
        // Revisar código de estado HTTP
        if (!response.ok) {
          if (response.status == 401){
            setError('Nombre de ususario o contraseña incorrectos.')
          }
          else{
             setError( 'Error al acceder. Intentelo más tarde');
          }
          const errorData = await response.json();
          return;
        }
    
        // Procesar respuesta exitosa y guardar token
        const data = await response.json();
        console.log('Status code:', response.status);
        console.log('Datos de respuesta:', data);
        onLoginSuccess(data.access, data.refresh);
        setError('ok')
        
        // Redirigir tras éxito
      } catch (error) {
        // Manejo de errores en caso de fallo en la conexión o la solicitud
        console.error('Error en el registro:');
        setError('No se pudo conectar con el servidor. Inténtalo más tarde.');
      }

     


    //
    }

  };
  
  return (
    <div style={styles.container}>
      <div style={styles.background}></div> {/* Fondo animado */}
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
      {/* Enlace para volver al Registrarse */}
      <p style={styles.link}>
        ¿Todavía no tienes una cuenta? <Link to="/register" style={styles.linkStyle}>Registrarse</Link>
      </p>
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
    backgroundColor: '#f5f5f5', // eliminar si se pone imagen de fondo
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundImage: 'url("")',  // Reemplazas esta URL con una imagen
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    zIndex: -1,
    animation: 'moveBackground 10s infinite linear',
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
