import { BrowserRouter as Router, Route, Routes, Navigate, BrowserRouter } from 'react-router-dom';
import Login from './Pages/Login';
import Noticias from './Pages/Noticias';
import PublicarNoticias from './Pages/PublicarNoticias';


function App() {
  return (
    //Redireccionamiento a las páginas web
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to="login"/>} /> 
      <Route path="/login" element={<Login/>} />
      <Route path="/Noticias" element={<Noticias/>} />
      <Route path="/PublicarNoticias" element={<PublicarNoticias/>} />
      <Route path="/PublicarNoticias/:id" element={<PublicarNoticias/>} />
    </Routes>  
    </BrowserRouter>
  )

}

export default App;