import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Pages/Login';
import Noticias from './Pages/Noticias';
import PublicarNoticias from './Pages/PublicarNoticias';
import { CreateUser } from './Pages/admin';
import { EditUser }  from './Pages/User';
import Navbar from './Components/Navbar';
import Register from './Pages/Register';

function App() {
  return (
    //Redireccionamiento a las páginas web
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to="login"/>} /> 
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/Noticias" element={<Noticias/>} />
      <Route path="/PublicarNoticias" element={<PublicarNoticias/>} />
      <Route path="/PublicarNoticias/:id" element={<PublicarNoticias/>} />
      <Route path="/admin" element={<CreateUser/>} />
      <Route path="/user/" element={<EditUser/>} />
      <Route path="/user/:id" element={<EditUser/>} />
    </Routes>  
    </BrowserRouter>
  )

}

export default App;
