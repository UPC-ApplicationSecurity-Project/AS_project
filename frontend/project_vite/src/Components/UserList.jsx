import { useEffect, useState }  from "react"
import { getAllUsers } from "../API/Users.api.js"
import {UserCard} from './UserCard.jsx'

export function UserList() {
    const [users, setUsers] = useState([])//Crea instancia posts que almacenara datos del backend

    
    useEffect (() => {
        async function LoadUsers() { 
            const res = await getAllUsers(); // Extrae todas las noticias del backend
        setUsers(res.data) // Y las asigna la data a instancia posts
        }
        LoadUsers();
        
    }, []);

    return <div>
        {users.map(user => ( 
            <UserCard  key={user.id} user={user} />
        ))}
    </div>;
}
