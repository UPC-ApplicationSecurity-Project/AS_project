import { useNavigate } from "react-router-dom"
import EditUser from '../Pages/User'

//COMPENENTE WEB QUE GUARDA LOS VALORES DE CADA NOTICIA

//Funcion que permite redireccionar a ../PublicarNoticias para editar Noticia
export function UserCard({ user }) {

    const navigate = useNavigate()

    return (
    <div style={{background: "green"}}
    
         onClick={() => {
             navigate('/user/' + user.id)//Permite editar la noticia con una pagina web personalizada con su id
         }}
    >   {/*Muestra el titulo y cuerpo de todas las noticias*/} 
        <h1/>{user.username}<h1/> 
        <p>{user.role}</p>
    </div>
    );
}

export default UserCard