import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { createPosts, deletePosts, updatePosts, getPost} from '../API/Noticias.api' 
import { useNavigate, useParams } from 'react-router-dom';
import { Navbar } from '../Components/Navbar';

//PÁGINA QUE PERMITE EDITAR O CREAR UNA NOTICIA.

export function PublicarNoticias() {
  //Define elemntos de la libreria useform para usarlas luego
  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    setValue
   } = useForm ();
   //Crea instancia de las funciones para usarlas luego:
   //UseNavigate(): Para redireccionar a otras paginas web
   const navigate = useNavigate()
   //UseParams(): Para extraer los datos de data mas adelante
   const params = useParams()
   //Crea instancia de handlesubmit, permite usar los valores de data
   const onSubmit = handleSubmit(async (data) => {
    if (params.id) {//Si el id de data existe permite Update la noticia de lo contrario permite Crear la noticia
      updatePosts(params.id, data)//Funcion de API updatePost()
    } else {
     await createPosts(data);//Funcion de API createPost()
    }
    navigate ('/Noticias');// luego de editar o crear redirecciona a noticias
   });


  //LLENADO DE DATOS PARA EDITADO DE POST, permite editar noticias con la informacion precargada.
  useEffect(() => {
    async function loadPost() {
    if (params.id) {
      const {data} = await getPost(params.id);
      setValue('title', data.title)
      setValue('body', data.body)
      setValue('status', data.status)
      setValue('user', data.user)
    }
  }
  loadPost();
 }, [])


  return (<><Navbar />
    <div>
      {/*Crea un formulario para ingresar los datos del post*/}
      <form onSubmit={onSubmit}>
        <input 
        type="text" 
        placeholder="title"
        {...register('title', {required: true})}>{/*Establece campo title obligatorio*/}
        </input>
        {errors.title && <span>Title is required</span>}

        <textarea 
        rows="10" 
        placeholder="Body"
        {...register('body', {required: true})}>{/*Establece campo body obligatorio*/}
        </textarea>
        {errors.body && <span>Body is required</span>}

        <select 
        placeholder="Status"
        {...register('status', {required: true})}>{/*Establece campo body obligatorio*/}
          <option value="Private">Private</option>{/*Limita selección de valores 2 opciones*/}
          <option value="Public">Public</option>
        </select>
        {errors.status && <span>Status is required</span>}

        <input 
        type="text" 
        placeholder="user"
        {...register('user', {required: true})}>{/*Establece campo user obligatorio*/}
        </input>
        {errors.username && <span>Username is required</span>}

        <button>Save</button>{/*boton para guarda datos*/}
      </form>
      {/*Establece si la url temrina en .../PublicarNoticias/id se mostrará el botón delete -> que llama al API DeletePost */}
      {params.id && <button onClick = {async() => {
        const accepted = window.confirm('are you sure?')
        if (accepted) {
          await deletePosts(params.id);
          navigate('/Noticias');
        }
      }}> Delete </button>}
      {/*Al presionar el boton cancelar redirecciona a Noticias sin guardar ningun valor*/}
      {<button onClick={() => {
      navigate('/Noticias');
    } }> Cancelar </button>}
    </div></>
  );
}

export default PublicarNoticias;
