import { useEffect, useState } from "react";
import { getAllPosts } from "../API/Noticias.api.js";
import PostCard from './PostCard';
import '/src/Pages/Noticias.css'; // Importa el archivo de estilos

// COMPONENTE QUE PERMITE LISTAR LAS NOTICIAS
export function PostList() {
    const [posts, setPosts] = useState([]); // Crea instancia posts que almacenará datos del backend

    useEffect(() => {
        async function LoadPost() {
            const res = await getAllPosts(); // Extrae todas las noticias del backend
            setPosts(res.data); // Asigna la data a la instancia posts
        }
        LoadPost();
    }, []);

    return (
        <div className="post-list"> {/* Contenedor para la lista de posts */}
            {posts.map(post => (
                <PostCard key={post.id} post={post} /> // Llama a PostCard por cada post y pasa la data
            ))}
        </div>
    );
}
