import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setError] = useState('');

  const dangerousChars = /[`´'"\\<>{}]/;

  const navigate = useNavigate();


  // Función para validar el email y evitar inyecciones
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  // Función para validar que el nombre de usuario y contraseña no tengan caracteres peligrosos
  const validateUsername = (input) => {
    const re = /^[a-zA-Z0-9_]{3,}$/; // Solo letras, números y guiones bajos
    return re.test(input);
  };

  
  // Función que maneja el registro
  const handleRegister = async (e) => {
    e.preventDefault();
    // Campos no  vacios
    if (!username || !email || !password) {
      setError('Todos los campos son obligatorios');
      return;
    }
    else if (dangerousChars.test(username) || dangerousChars.test(password)) {
      setError('No se permiten caracteres especiales en los campos');
      return;
    }
    // Validar los campos
    else if (!validateUsername(username)) {
      setError('Nombre de usuario inválido. Solo se permiten letras, números y guiones bajos.');
      return;
    }
    else if (!validateEmail(email)) {
      setError('Correo electrónico inválido.');
      return;
    }

    else{   // Si todo es válido, se mandan los datos a la API
      const userData = {
        username,
        email,
        password,
      };
    
      try {
        // Llamada a la API
        const response = await fetch('http://127.0.0.1:8000/NewUser/api/list_NewUser/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });
    
        // Revisar código de estado HTTP
        if (!response.ok) {
          const errorData = await response.json();
          setError(errorData.message || 'Error al registrar usuario');
          alert(errorData.message)
          return;
        }
    
        // Procesar respuesta exitosa
        const data = await response.json();
        console.log('Status code:', response.status);
        console.log('Datos de respuesta:', data);
    
        // Redirigir tras éxito
        navigate('/login');
      } catch (error) {
        // Manejo de errores en caso de fallo en la conexión o la solicitud
        console.error('Error en el registro:', error);
        setError('No se pudo conectar con el servidor. Inténtalo más tarde.');
      }

        // Simular redirección al login tras el registro exitoso
        // navigate('/login');
    }
  };

  return (
    <div style={styles.container}>
      <h2>Registro</h2>
      <form onSubmit={handleRegister} style={styles.form}>
        <div style={styles.formGroup}>
          <label>Nombre de Usuario:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label>Correo Electrónico:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
        </div>

        {/* Mostrar mensaje de error */}
        {errorMessage && <p style={styles.error}>{errorMessage}</p>}

        <button type="submit" style={styles.button}>Registrarse</button>
      </form>

      {/* Enlace para volver al login */}
      <p style={styles.link}>
        ¿Ya tienes una cuenta? <Link to="/login" style={styles.linkStyle}>Iniciar sesión</Link>
      </p>
    </div>
  );
};

// Estilos CSS en JavaScript
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

export default Register;
