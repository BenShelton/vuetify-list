import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import posts from './posts'
import post from './post'

Vue.use(Vuex)

export default new Vuex.Store({
  // we only want to persist the sort/filter preferences, the other data may be stale and will be reloaded
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
    post
  }
})
