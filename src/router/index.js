import Vue from 'vue'
import Router from 'vue-router'

import routeNames from './routeNames'
import Home from '@/views/Home.vue'
import Post from '@/views/Post.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: routeNames.HOME,
      component: Home
    },
    {
      path: '/post/:id',
      name: routeNames.POST,
      component: Post
    }
  ]
})
