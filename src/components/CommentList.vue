<template>
  <div>
    <template v-if="loadingComments[articleId]">
      <Loader />
    </template>
    <template v-else>
      <ul class="list-group m-2">
        <li class="list-group-item" v-for="comment in getArrComments(comments)" :key="comment.id">
          <Comment :comment="comment"/>
        </li>
      </ul>
    </template>
  </div>
</template>

<script>
import Comment from '@/components/Comment'
import Loader from '@/components/Loader'
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'CommentList',
  props: {
    articleId: {
      type: String
    },
    comments: {
      type: Array
    }
  },
  computed: {
    ...mapState({
      loadingComments: state => state.commentsModule.loadingComments,
      loadedComments: state => state.commentsModule.loadedComments
    }),
    ...mapGetters([
      'getArrComments'
    ])
  },
  methods: {
    ...mapActions([
      'loadComments'
    ])
  },
  beforeMount: function () {
    if (this.loadedComments[this.articleId] || this.loadingComments[this.articleId]) return

    this.loadComments(this.articleId)
  },
  components: { Comment, Loader }
}
</script>
