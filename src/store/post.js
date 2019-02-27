import api from '@/api'

// TODO: The naming of this store module is not friendly seeing as 'posts' also exists, this should be changed to something less confusing

const state = {
  id: null,
  userId: null,
  title: null,
  body: null,
  comments: [],
  loading: true,
  error: null
}

const actions = {
  load ({ state, commit }, id) {
    if (state.id === id) return
    commit('START_LOADING')
    // although _embed is an api option it doesn't seem to work, so make 2 requests instead
    return Promise.all([
      api.post({ id }),
      api.comments({ id })
    ])
      .then(responses => {
        const post = responses[0].data
        post.comments = responses[1].data
        commit('LOAD_POST', post)
      })
      .catch(err => {
        commit('LOAD_ERROR', err.message)
      })
  }
}

const mutations = {
  START_LOADING (state) {
    Object.assign(state, {
      id: null,
      userId: null,
      title: null,
      body: null,
      comments: [],
      loading: true,
      error: null
    })
  },
  LOAD_POST (state, { id, userId, title, body, comments }) {
    Object.assign(state, {
      id,
      userId,
      title,
      body,
      comments,
      loading: false
    })
  },
  LOAD_ERROR (state, payload) {
    Object.assign(state, {
      loading: false,
      error: payload
    })
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
