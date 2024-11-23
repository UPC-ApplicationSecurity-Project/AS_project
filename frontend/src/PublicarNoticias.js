import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function PublicarNoticias() {

  const [titulo, setTitulo] = useState('');
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false); // Estado para el indicador de carga

  const dangerousChars = /[`´'"\\<>{}]/;

  const navigate = useNavigate();

  



  const handleSubmit = async () => {
    if (!titulo || !url) {
      // setError('Todos los campos son obligatorios');
      alert('Todos los campos son obligatorios');
      return;
    }
    // Validar que no haya caracteres peligrosos -> evitar SQLinjection
    else if (dangerousChars.test(titulo) || dangerousChars.test(url)) {
      // setError('No se permiten caracteres especiales en los campos');
      alert('No se permiten caracteres especiales en los campos');
      return;
    }
    setLoading(true); // Activa el indicador de carga
    try {
      const isMalicious = await checkUrl(url); // Llama a la función para analizar la URL
      if (isMalicious) {
        alert("La URL puede ser maliciosa o perjudicial para los usuarios");
        setLoading(false);
        return;
      }
    } catch (error) {
      console.error("Error verificando la URL:", error);
      alert("Hubo un problema verificando la URL. Por favor, intenta nuevamente.");
      return;
    }
    // finally {
    //   setLoading(false); // Desactiva el indicador de carga
    // }

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
        setLoading(false); // Desactiva el indicador de carga
        // Redirigir a la página de Noticias
        navigate('/noticias');
      })
      .catch((error) => {
        console.error('Error al enviar la noticia:', error);
        // setError('Hubo un error al enviar la noticia.');
        alert('Hubo un error al enviar la noticia.');
        setLoading(false); // Desactiva el indicador de carga
        return;
      });


  };

  // Función para interactuar con la API de VirusTotal
  const checkUrl = async (urlToCheck) => {
    const apiKey = "5f7636be24bdbdc757982d629550721cc1fb7d536517da47b8ae34f59d61e0af"; // Reemplaza con tu clave API
    const baseUrl = "https://www.virustotal.com/api/v3";
  
    // Paso 1: Envía la URL para análisis
    const response = await axios.post(
      `${baseUrl}/urls`,
      `url=${encodeURIComponent(urlToCheck)}`, // La URL debe enviarse como una cadena codificada
      {
        headers: {
          "x-apikey": apiKey,
          "Content-Type": "application/x-www-form-urlencoded", // Tipo correcto para enviar datos URL-encoded
        },
      }
    );
    // Obtén el ID del análisis
    const analysisId = response.data.data.id;
    // Paso 2: Consulta el estado del análisis
    const analysisResponse = await axios.get(`${baseUrl}/analyses/${analysisId}`, {
      headers: { "x-apikey": apiKey },
    });
    // Verifica los resultados del análisis
    const stats = analysisResponse.data.data.attributes.stats;
    return stats.malicious > 0; // Retorna true si hay detecciones maliciosas
  };
  












  return (
    <div style={styles.container}>
      <h2>Publicar Nueva Noticia</h2>
      <form /*onSubmit={handleSubmit}*/ style={styles.form}>
        <div style={styles.inputContainer}>
          <label htmlFor="titulo">Título:</label>
          <input
            type="text"
            id="titulo"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            style={styles.input}
            disabled={loading} // Desactiva mientras se carga
          />
        </div>
        <div style={styles.inputContainer}>
          <label htmlFor="url">URL:</label>
          {/* <input
            type="url"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            style={styles.input}
          /> */}
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Ingresa una URL"
            style={styles.input}
            disabled={loading} // Desactiva mientras se carga
          />
        </div>
        {/* <button type="submit" style={styles.button} disabled={loading}>Publicar</button> */}

        <button
        onClick={handleSubmit}
        style={{
          padding: "10px 20px",
          backgroundColor: loading ? "#ccc" : "#007BFF",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: loading ? "not-allowed" : "pointer",
        }}
        disabled={loading} // Desactiva mientras se carga
      >
        {loading ? "Verificando..." : "Publicar"}
      </button>

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
