import { useEffect, useState }  from "react"
import { getAllPosts } from "../API/Noticias.api.js"
import PostCard from './PostCard'

//COMPONENTE WEB QUE PERMITE LISTAR LAS TAREAS LA FUNCION API GETALLPOSTS


export function PostList() {
    const [posts, setPosts] = useState([])//Crea instancia posts que almacenara datos del backend

    
    useEffect (() => {
        async function LoadPost() { 
            const res = await getAllPosts(); // Extrae todas las noticias del backend
        setPosts(res.data) // Y las asigna la data a instancia posts
        }
        LoadPost();
        
    }, []);

    return <div>
        {posts.map(post => ( //mapea cada uno de los elementos de posts (Noticia1, Noticia2, ....)
            <PostCard  key={post.id} post={post} />//llama a la funcion PostCard y le envia el id de las noticias
        ))}
    </div>;
}