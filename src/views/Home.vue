<template>
  <v-container>
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
          >
            <v-icon>search</v-icon>
          </v-btn>
        </td>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  name: 'Home',

  data () {
    return {
      headers: [
        { text: 'Post ID', value: 'id' },
        { text: 'User ID', value: 'userId' },
        { text: 'Title', value: 'title' },
        { text: 'View', align: 'center', sortable: false }
      ]
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
        this.loadPosts()
      }
    }
  },

  methods: {
    ...mapActions({
      loadPosts: 'posts/load'
    }),
    ...mapMutations({
      setPagination: 'posts/SET_PAGINATION'
    })
  }
}
</script>
