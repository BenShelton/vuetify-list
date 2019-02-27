<template>
  <v-flex xs12 sm6 md4>
    <v-text-field
      v-model="search"
      outline
      append-icon="search"
      :label="label"
    />
  </v-flex>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'

import { SEARCH_DEBOUNCE_INTERVAL } from '@/constants'

export default {
  name: 'SearchBox',

  props: {
    label: { type: String, required: true },
    field: { type: String, required: true }
  },

  data () {
    return {
      lastCall: 0,
      debounceTimeout: null
    }
  },

  computed: {
    search: {
      get () {
        // seeing as we don't know which field to track, forego using vuex helper method here
        return this.$store.state.posts[this.field]
      },
      set (val) {
        this.setSearch({
          field: this.field,
          value: val
        })
        this.debouncedLoad()
      }
    }
  },

  methods: {
    ...mapActions({
      loadPosts: 'posts/load'
    }),
    ...mapMutations({
      setSearch: 'posts/SET_SEARCH'
    }),
    debouncedLoad () {
      // v-model.lazy doesn't work on v-text-fields so manually implement a debounce function instead
      clearTimeout(this.debounceTimeout)
      this.debounceTimeout = setTimeout(this.loadPosts, SEARCH_DEBOUNCE_INTERVAL)
    }
  }
}
</script>
