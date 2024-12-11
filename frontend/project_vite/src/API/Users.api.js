import axios from 'axios'

const NewUserApi = axios.create({
    baseURL: 'https://localhost:8000/NewUser/api/list_NewUser/',
 });

 export const getAllUsers = () => NewUserApi.get('/');

export const getUser = (id) => NewUserApi.get(`/${id}/`, id);

export const createUsers = (data) => NewUserApi.post('/', data);

export const deleteUsers = (id) => NewUserApi.delete(`/${id}/`, id)

export const updateUsers = (id, user) => NewUserApi.put(`/${id}/`, user)
