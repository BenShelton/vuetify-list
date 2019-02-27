import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import posts from './posts'
import comments from './comments'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState({
    paths: [
      'posts.page',
      'posts.rowsPerPage',
      'posts.sortBy',
      'post.descending',
      'posts.id',
      'posts.userId',
      'posts.title'
    ]
  })],
  modules: {
    posts,
    comments
  }
})
