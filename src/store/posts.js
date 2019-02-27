import api from '@/api'

const state = {
  list: [],
  total: 0,
  loading: true,
  page: 1,
  rowsPerPage: 10,
  sortBy: null,
  descending: true,
  id: null,
  userId: null,
  title: null
}

const getters = {
  pagination: ({ page, rowsPerPage, sortBy, descending }) => ({ page, rowsPerPage, sortBy, descending })
}

const actions = {
  load ({ state, getters, commit }) {
    commit('START_LOADING')
    const { page, rowsPerPage, sortBy, descending } = getters.pagination
    const params = {
      _page: page,
      _limit: rowsPerPage,
      _sort: sortBy,
      _order: descending ? 'desc' : 'asc'
    }
    for (const field of ['id', 'userId', 'title']) {
      const value = state[field]
      if (value) params[field] = value
    }
    return api.posts(params)
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
  SET_SEARCH (state, { field, value }) {
    Object.assign(state, {
      [field]: value
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
