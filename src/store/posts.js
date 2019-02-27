import api from '@/api'

const state = {
  list: [],
  total: 0,
  loading: true
}

const actions = {
  load ({ commit }, { page, limit, sort, order }) {
    return api.posts({ page, limit, sort, order })
      .then(res => {
        commit('LOAD_LIST', {
          list: res.data,
          total: Number(res.headers['x-total-count'])
        })
      })
      .catch(err => {
        commit('LOAD_ERROR', err.message)
      })
  }
}

const mutations = {
  START_LOADING (state) {
    Object.assign(state, {
      loading: true,
      error: null
    })
  },
  LOAD_LIST (state, { list, total }) {
    Object.assign(state, {
      list,
      total,
      loading: false
    })
  },
  LOAD_ERROR (state, payload) {
    Object.assign(state, {
      list: [],
      total: 0,
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
