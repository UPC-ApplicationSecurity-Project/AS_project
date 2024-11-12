import { useNavigate } from "react-router-dom"

//COMPENENTE WEB QUE GUARDA LOS VALORES DE CADA NOTICIA

//Funcion que permite redireccionar a ../PublicarNoticias para editar Noticia
export function PostCard({ post }) {

    const navigate = useNavigate()

    return (
    <div style={{background: "yellow"}}
    
        onClick={() => {
            navigate('/PublicarNoticias/' + post.id)//Permite editar la noticia con una pagina web personalizada con su id
        }}
    >   {/*Muestra el titulo y cuerpo de todas las noticias*/} 
        <h1/>{post.title}<h1/> 
        <p>{post.body}</p>
    </div>
    );
}

export default PostCard;