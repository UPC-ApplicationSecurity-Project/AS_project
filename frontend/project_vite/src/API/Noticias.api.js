import axios from 'axios'

const postApi = axios.create({
     baseURL: 'https://localhost:8000/post/api/list_post/',
 });

export const getAllPosts = ({accessToken}) => postApi.get('/', {
    headers: {
      Authorization: `Bearer ${accessToken}`, // Correctly include the token
    },

});

export const getPost = (id, {accessToken}) => postApi.get(`/${id}/`, id, {
  headers: {
    Authorization: `Bearer ${accessToken}`, // Correctly include the token
  },
});

export const createPosts = (data, {accessToken}) => postApi.post('/', data, {
  headers: {
    Authorization: `Bearer ${accessToken}`, // Correctly include the token
  },
});

export const deletePosts = (id, {accessToken}) => postApi.delete(`/${id}/`, id, {
  headers: {
    Authorization: `Bearer ${accessToken}`, // Correctly include the token
  },
});

export const updatePosts = (id, post, {accessToken}) => postApi.put(`/${id}/`, post, {
  headers: {
    Authorization: `Bearer ${accessToken}`, // Correctly include the token
  },
});
