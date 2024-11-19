import { useForm } from "react-hook-form";
import { createUsers, updateUsers} from '../API/Users.api' 
import { useNavigate, useParams } from 'react-router-dom';
import { UserList } from '../Components/UserList';


export function CreateUser() {
  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    setValue
   } = useForm ();
   
   const navigate = useNavigate()
 
   const params = useParams()
 
   const onSubmit = handleSubmit(async (Userdata) => {
    if (params.id) {
      updateUsers(params.id, Userdata)
    } else {
     await createUsers(Userdata);
    }
    navigate ('/admin');
   });


  //LLENADO DE DATOS PARA EDITADO DE POST, permite editar noticias con la informacion precargada.

 

 return (
    <>
    <strong>Create User:</strong>
      <div>
        {/* Crea un formulario para ingresar los datos del post */}
        <form onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="username"
            {...register('username', { required: true })}
          />
          {errors.username && <span>Username is required</span>}

          <textarea
            placeholder="Password"
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
      </div><strong>Users: </strong><UserList/>
    </>
  );

}
export default <CreateUser/>;