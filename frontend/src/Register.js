import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  // Función para validar el email y evitar inyecciones
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  // Función para validar que el nombre de usuario y contraseña no tengan caracteres peligrosos
  const validateInput = (input) => {
    const re = /^[a-zA-Z0-9_]{3,}$/; // Solo letras, números y guiones bajos
    return re.test(input);
  };

  // Función que maneja el registro
  const handleRegister = (e) => {
    e.preventDefault();

    // Validar los campos
    if (!validateInput(username)) {
      setErrorMessage('Nombre de usuario inválido. Solo se permiten letras, números y guiones bajos.');
      return;
    }
    if (!validateEmail(email)) {
      setErrorMessage('Correo electrónico inválido.');
      return;
    }
    if (!validateInput(password)) {
      setErrorMessage('Contraseña inválida. Debe tener al menos 3 caracteres y solo contener letras, números y guiones bajos.');
      return;
    }

    // Si todo es válido, se comentaría esta parte para mandar los datos a la API
    // const userData = {
    //   username,
    //   email,
    //   password,
    // };
    // fetch('/api/register', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(userData),
    // })
    // .then(response => response.json())
    // .then(data => {
    //   if (data.success) {
    //     // Redirigir al login
    //     navigate('/login');
    //   } else {
    //     setErrorMessage(data.message || 'Error en el registro');
    //   }
    // })
    // .catch((error) => {
    //   setErrorMessage('Error en el registro');
    // });

    // Simular redirección al login tras el registro exitoso
    navigate('/login');
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
