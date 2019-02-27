<template>
  <v-flex xs12 sm6 md4>
    <v-text-field
      v-model="search"
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
      clearTimeout(this.debounceTimeout)
      this.debounceTimeout = setTimeout(this.loadPosts, SEARCH_DEBOUNCE_INTERVAL)
    }
  }
}
</script>
