<template>
  <v-container>
    <v-container grid-list-lg>
      <v-layout wrap>
        <SearchBox label="Post ID" field="id" />
        <SearchBox label="User ID" field="userId" />
        <SearchBox label="Title" field="title" />
      </v-layout>
    </v-container>
    <v-data-table
      :headers="headers"
      :items="list"
      :pagination.sync="localPagination"
      :total-items="total"
      :loading="loading"
      :rows-per-page-items="[10, 20, 50, 100]"
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td v-text="props.item.id" />
        <td v-text="props.item.userId" />
        <td class="font-weight-bold text-truncate" v-text="props.item.title" />
        <td class="text-xs-center">
          <v-btn
            icon
            :to="{ name: postRoute, params: { id: props.item.id } }"
          >
            <v-icon>view_headline</v-icon>
          </v-btn>
        </td>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'

import routeNames from '@/router/routeNames'
import SearchBox from '@/components/SearchBox.vue'
import { POLLING_INTERVAL } from '@/constants'

export default {
  name: 'Home',

  components: {
    SearchBox
  },

  mounted () {
    this.resetPoll()
  },

  beforeDestroy () {
    clearTimeout(this.pollTimeout)
  },

  data () {
    return {
      headers: [
        { text: 'Post ID', value: 'id', width: '15%' },
        { text: 'User ID', value: 'userId', width: '15%' },
        { text: 'Title', value: 'title', width: '60%' },
        { text: 'View', align: 'center', sortable: false, width: '10%' }
      ],
      postRoute: routeNames.POST,
      pollTimeout: null
    }
  },

  computed: {
    ...mapState('posts', ['list', 'total', 'loading']),
    ...mapGetters('posts', ['pagination']),
    localPagination: {
      get () {
        return this.pagination
      },
      set (val) {
        this.setPagination(val)
        this.resetPoll(true)
      }
    }
  },

  methods: {
    ...mapActions({
      loadPosts: 'posts/load'
    }),
    ...mapMutations({
      setPagination: 'posts/SET_PAGINATION'
    }),
    resetPoll (immediateRefresh) {
      clearTimeout(this.pollTimeout)
      if (immediateRefresh) this.loadPosts()
      this.pollTimeout = setTimeout(this.loadPosts, POLLING_INTERVAL)
    }
  }
}
</script>
