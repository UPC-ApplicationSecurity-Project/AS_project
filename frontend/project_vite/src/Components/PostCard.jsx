import { useNavigate } from "react-router-dom";
import '/src/Pages/Noticias.css'; // Asegúrate de que los estilos estén importados

// COMPONENTE WEB QUE GUARDA LOS VALORES DE CADA NOTICIA
export function PostCard({ post }) {

    const navigate = useNavigate();

    return (
        <div 
            className="post-card" // Aplica la clase de estilo para la tarjeta
            onClick={() => {
                 if (post.link){
                     window.location.href = post.link
                 }
                 //navigate('/PublicarNoticias/' + post.id); // Redirecciona para editar la noticia
            }}
        >
            {/* Título de la noticia */}
            <h2 className="post-title">{post.title}</h2>
            <h2 className="post-link">{post.link ? post.link : ''}</h2>

            {/* Cuerpo de la noticia */}
            <p className="post-content">{post.body}</p>
        </div>
    );
}

export default PostCard;
