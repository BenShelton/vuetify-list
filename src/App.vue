<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline">
        <span>Vuetify</span>
        <span class="font-weight-light ml-3">List Example</span>
      </v-toolbar-title>
    </v-toolbar>

    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App'
}
</script>
