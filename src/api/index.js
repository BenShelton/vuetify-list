import axios from 'axios'

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/'
})

export default {
  posts: params => api.get(`/posts`, { params }),
  post: ({ id }) => api.get(`/posts/${id}`),
  comments: ({ id }) => api.get('/comments', { params: { postId: id } })
}
