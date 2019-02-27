import axios from 'axios'

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/'
})

export default {
  posts: ({ page, limit, sort, order }) => api.get(`/posts`, { params: { _page: page, _limit: limit, _sort: sort, _order: order } }),
  post: ({ id }) => api.get(`/posts/${id}`),
  comments: ({ id }) => api.get(`/comments`, { params: { postId: id } })
}
