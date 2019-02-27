import api from '@/api'

const state = {
  list: [],
  total: 0,
  loading: true,
  page: 1,
  rowsPerPage: 10,
  sortBy: null,
  descending: true
}

const getters = {
  pagination: ({ page, rowsPerPage, sortBy, descending }) => ({ page, rowsPerPage, sortBy, descending })
}

const actions = {
  load ({ getters, commit }) {
    const { page, rowsPerPage, sortBy, descending } = getters.pagination
    return api.posts({
      page,
      limit: rowsPerPage,
      sort: sortBy,
      order: descending ? 'desc' : 'asc'
    })
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
  SET_PAGINATION (state, { page, rowsPerPage, sortBy, descending }) {
    Object.assign(state, {
      page,
      rowsPerPage,
      sortBy,
      descending
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
  getters,
  actions,
  mutations
}
