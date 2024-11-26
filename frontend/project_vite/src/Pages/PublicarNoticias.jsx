import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { createPosts, deletePosts, updatePosts, getPost } from '../API/Noticias.api'; 
import { useNavigate, useParams } from 'react-router-dom';
import { Navbar } from '../Components/Navbar';
import './PublicarNoticias.css'; // Asegúrate de tener un archivo CSS vinculado
import axios from "axios";

export function PublicarNoticias() {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // Estado para el indicador de carga

  const params = useParams();


  // Función para interactuar con la API de VirusTotal
  const checkUrl = async (urlToCheck) => {
    setLoading(true); // Activa el indicador de carga
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




  const onSubmit = handleSubmit(async (data) => {
    console.log('SUBMIT')
    try {
      const isMalicious = await checkUrl(data.link); // Llama a la función para analizar la URL
      if (isMalicious) {
        alert("La URL puede ser maliciosa o perjudicial para los usuarios");
        setLoading(false);
        return;
      }
    } catch (error) {
      console.error("Error verificando la URL:", error);
      alert("Hubo un problema verificando la URL. Por favor, intenta nuevamente.");
      setLoading(false);
      return;
    }
    

    /////
    if (params.id) {
      await updatePosts(params.id, data);
    } else {
      await createPosts(data);
    }
    setLoading(false);
    navigate('/Noticias');
  });

  useEffect(() => {
    async function loadPost() {
      if (params.id) {
        const { data } = await getPost(params.id);
        setValue('title', data.title);
        setValue('body', data.body);
        setValue('link', data.link);
      }
    }
    loadPost();
  }, [params.id, setValue]);

  return (
    <>
      <div className="container">
        <h1>{params.id ? "Editar Noticia" : "Crear Nueva Noticia"}</h1>
        <form className="form" onSubmit={onSubmit}>
          <label>
            Título:
            <input 
              type="text" 
              placeholder="Título de la noticia"
              {...register('title', { required: true })}
              className={errors.title ? "input-error" : ""}
            />
            {errors.title && <span className="error-message">El título es obligatorio</span>}
          </label>

          <label>
            Contenido:
            <textarea 
              rows="10" 
              placeholder="Contenido de la noticia"
              {...register('body', { required: true })}
              className={errors.body ? "input-error" : ""}
            />
            {errors.body && <span className="error-message">El contenido es obligatorio</span>}
          </label>

          <label>
            Enlace:
            <input
              type="text"
              {...register('link', { required: true })}
              placeholder="Ingresa una URL"
              className={errors.link ? "input-error" : ""}
            />
            {errors.link && <span className="error-message">El enlace es obligatorio</span>}
          </label>

          <div className="button-group">
            <button type="submit" className="btn save-btn">Guardar</button>
            {params.id && (
              <button 
                type="button" 
                className="btn delete-btn"
                onClick={async () => {
                  const accepted = window.confirm('¿Estás seguro de eliminar esta noticia?');
                  if (accepted) {
                    await deletePosts(params.id);
                    setLoading(false);
                    navigate('/Noticias');
                  }
                }}
              >
                Eliminar
              </button>
            )}
            <button 
              type="button" 
              className="btn cancel-btn"
              onClick={() => navigate('/Noticias')}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default PublicarNoticias;
