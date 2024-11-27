import { useEffect, useState } from "react";
import { getAllPosts } from "../API/Noticias.api.js";
import PostCard from './PostCard';
import '/src/Pages/Noticias.css'; // Importa el archivo de estilos

// COMPONENTE QUE PERMITE LISTAR LAS NOTICIAS
export function PostList({ accessToken }) { // Recibe accessToken como prop
    const [posts, setPosts] = useState([]); // Crea instancia posts que almacenará datos del backend
    const [error, setError] = useState(null); // Para manejar errores

    useEffect(() => {
        async function LoadPost() {
            try {
                console.log('PostList',accessToken);
                const res = await getAllPosts(accessToken); // Llama a la API con el token
                setPosts(res.data);
                console.log(res);// Asigna la data a la instancia posts
            } catch (err) {
                setError('No se pudieron cargar las noticias.'); // Maneja errores de la API
                console.error(err);
            }
        }
        LoadPost();
    }, [accessToken]);

    if (error) {
        return <div className="error-message">{error}</div>; // Muestra mensaje de error si ocurre
    }

    return (
        <div className="post-list">
            {posts.map(post => (
                <PostCard key={post.id} post={post} /> // Llama a PostCard por cada post y pasa la data
            ))}
        </div>
    );
}
