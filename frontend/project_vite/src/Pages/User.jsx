import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { CreateUser } from "./admin";
import { deleteUsers, updateUsers, getUser} from '../API/Users.api' 
import { useNavigate, useParams } from 'react-router-dom';


export function EditUser(){
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
   const onSubmit = handleSubmit(async (Userdata) => {
    if (params.id) {//Si el id de Userdata existe permite Update la noticia de lo contrario permite Crear la noticia
      updateUsers(params.id, Userdata)//Funcion de API updatePost()
    } else {
     await createUsers(Userdata);//Funcion de API createPost()
    }
    navigate ('/admin');// luego de editar o crear redirecciona a noticias
   });


  //LLENADO DE DATOS PARA EDITADO DE USUARIO, permite editar noticias con la informacion precargada.
  useEffect(() => {
    async function loadUser() {
    if (params.id) {
      const {data} = await getUser(params.id);
      console.log(data)
      setValue('username', data.username)
      setValue('role', data.role)
    }
  }
  loadUser();
 }, [])
 

 return (<div>
    {/* Crea un formulario para ingresar los datos del post */}
    <form onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="username"
        {...register('username', { required: true })}
      />
      {errors.username && <span>Username is required</span>}

      <textarea
        placeholder="New password"
        {...register('password', { required: true })}
      />
      {errors.password && <span>Password is required</span>}

      <select
        placeholder="role"
        {...register('role', { required: true })}
      >
        <option value="Admin">Admin</option>
        <option value="Usuario">Usuario</option>
      </select>
      {errors.Role && <span>Role is required</span>}

      <button>Save</button>
    </form>
    
    {/*Establece si la url temrina en .../PublicarNoticias/id se mostrará el botón delete -> que llama al API DeletePost */}
    {<button
      onClick={async () => {
        const accepted = window.confirm('Are you sure?');
        if (accepted) {
          await deleteUsers(params.id);
          navigate('/admin/');
        }
      }}>Delete</button>}
    {<button onClick={() => {
        navigate('/admin/');
    } }>Cancelar</button>}
  </div>
);
}

export default CreateUser;






 