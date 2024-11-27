import axios from 'axios'

const postApi = axios.create({
     baseURL: 'https://localhost:8000/post/api/list_post/',
 });

 export const getAllPosts = ({accessToken}) => postApi.get('/', {
    headers: {
      Authorization: `Bearer ${accessToken}`, // Correctly include the token
    },

  });

export const getPost = (id) => postApi.get(`/${id}/`, id);

export const createPosts = (data) => postApi.post('/', data);

export const deletePosts = (id) => postApi.delete(`/${id}/`, id)

export const updatePosts = (id, post) => postApi.put(`/${id}/`, post)
