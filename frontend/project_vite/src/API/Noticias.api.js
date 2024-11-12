import axios from 'axios'

const postApi = axios.create({
     baseURL: 'http://localhost:8000/post/api/list_post/',
 });

export const getAllPosts = () => postApi.get('/');

export const getPost = (id) => postApi.get(`/${id}/`, id);

export const createPosts = (data) => postApi.post('/', data);

export const deletePosts = (id) => postApi.delete(`/${id}/`, id)

export const updatePosts = (id, post) => postApi.put(`/${id}/`, post)

// const NewUserApi = axios.create({
//     baseURL: 'http://localhost:8000/NewUser/api/list_post',
// });

// export const getAllPosts = () => postApi.get('/');
// export const createPosts = (post) => postApi.post('/');