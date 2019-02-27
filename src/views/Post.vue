<template>
  <v-container grid-list-lg>
    <v-dialog
      v-model="loading"
      persistent
      width="150"
    >
      <v-card class="pa-4 text-xs-center">
        <v-progress-circular indeterminate color="primary" />
        <p class="mt-4 mb-0">
          Loading...
        </p>
      </v-card>
    </v-dialog>
    <v-layout v-if="!loading">
      <v-flex xs8>
        <v-card>
          <v-img src="https://picsum.photos/510/300?random" height="255" />
          <v-card-title v-text="title" />
          <v-card-text v-text="body" />
        </v-card>
      </v-flex>
      <v-flex xs4>
        <p class="subheading">
          Comments
        </p>
        <v-layout column class="elevation-1">
          <v-flex>
            <v-layout
              v-for="comment of comments"
              :key="comment.id"
              column
              class="pa-3"
            >
              <p class="subheading" v-text="comment.email" />
              <p class="subehading" v-text="comment.name" />
              <p class="caption" v-text="comment.body" />
              <v-divider />
            </v-layout>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Post',

  mounted () {
    this.loadPost(this.$route.params.id)
  },

  computed: {
    ...mapState('post', ['userId', 'title', 'body', 'comments', 'loading'])
  },

  methods: {
    ...mapActions({
      loadPost: 'post/load'
    })
  }
}
</script>
