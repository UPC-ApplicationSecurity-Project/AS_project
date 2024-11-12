import React, { Component } from 'react';
import { PostList } from '../Components/PostList';
import { Navbar } from '../Components/Navbar';

//PÁGINA QUE MUESTRA LAS NOTICIAS

function Noticias(){
  
   return (
// Muestra barra de navegación
  <><Navbar />
{/*Muestra lista de Noticias*/} 
  <PostList /></>)

}


export default Noticias;
