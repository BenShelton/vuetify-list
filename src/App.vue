<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline">
        <span>Vuetify</span>
        <span class="font-weight-light ml-3">List Example</span>
      </v-toolbar-title>
      <v-spacer />
      <v-toolbar-items v-if="showItems">
        <v-btn
          flat
          exact
          :to="homeRoute"
        >
          <v-icon>keyboard_arrow_left</v-icon>
          Back to Posts
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import routeNames from '@/router/routeNames'

export default {
  name: 'App',

  data () {
    return {
      homeRoute: { name: routeNames.HOME }
    }
  },

  computed: {
    showItems () {
      return this.$route.name === routeNames.POST
    }
  }
}
</script>
