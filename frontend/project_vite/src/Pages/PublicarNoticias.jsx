import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { createPosts, deletePosts, updatePosts, getPost } from '../API/Noticias.api'; 
import { useNavigate, useParams } from 'react-router-dom';
import { Navbar } from '../Components/Navbar';
import './PublicarNoticias.css'; // Asegúrate de tener un archivo CSS vinculado

export function PublicarNoticias() {
  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    setValue
   } = useForm();
   const navigate = useNavigate();
   const params = useParams();

   const onSubmit = handleSubmit(async (data) => {
    if (params.id) {
      await updatePosts(params.id, data);
    } else {
      await createPosts(data);
    }
    navigate('/Noticias');
   });

  useEffect(() => {
    async function loadPost() {
      if (params.id) {
        const { data } = await getPost(params.id);
        setValue('title', data.title);
        setValue('body', data.body);
        setValue('status', data.status);
        setValue('user', data.user);
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
            Estado:
            <select {...register('status', { required: true })}>
              <option value="Private">Privado</option>
              <option value="Public">Público</option>
            </select>
            {errors.status && <span className="error-message">El estado es obligatorio</span>}
          </label>

          <label>
            Usuario:
            <input 
              type="text" 
              placeholder="Usuario"
              {...register('user', { required: true })}
              className={errors.user ? "input-error" : ""}
            />
            {errors.user && <span className="error-message">El usuario es obligatorio</span>}
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
