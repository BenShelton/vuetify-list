<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="list"
      :pagination.sync="pagination"
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
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Home',

  data () {
    return {
      headers: [
        { text: 'Post ID', value: 'id' },
        { text: 'User ID', value: 'userId' },
        { text: 'Title', value: 'title' },
        { text: 'View', align: 'center', sortable: false }
      ],
      pagination: {
        descending: false,
        page: 1,
        rowsPerPage: 10,
        sortBy: null,
        totalItems: 0
      }
    }
  },

  computed: {
    ...mapState('posts', ['list', 'total', 'loading'])
  },

  watch: {
    pagination: {
      handler (pagination) {
        const { descending, page, rowsPerPage, sortBy } = pagination
        this.loadPosts({
          page,
          limit: rowsPerPage,
          sort: sortBy,
          order: descending ? 'desc' : 'asc'
        })
      },
      deep: true,
      immediate: true
    }
  },

  methods: {
    ...mapActions({
      loadPosts: 'posts/load'
    })
  }
}
</script>
