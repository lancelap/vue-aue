<template>
  <div>
    <template v-if="comments">
      <h5 class="mt-4">Comments:</h5>
      <button
        class="btn btn-primary"
        v-on:click="toggleOpen">
        {{ this.isOpen ? 'Hide comments' : 'Show comments' }}
      </button>
      <template v-if="isOpen">
        <CommentList
          :loadingComments="loadingComments[articleId]"
          :loadedComments="loadedComments[articleId]"
          :comments="getArrComments(comments)"/>
      </template>
    </template>
    <template v-else>
      <b>No comments yet</b>
    </template>
    <h5 class="mt-4">Add comment:</h5>
    <UserForm :articleId="articleId"/>
  </div>
</template>

<script>
import CommentList from '@/components/CommentList'
import UserForm from '@/components/UserForm'
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'WrapperCommentList',
  data: function () {
    return {
      isOpen: false
    }
  },
  props: {
    comments: {
      type: Array
    },
    articleId: {
      type: String
    }
  },
  methods: {
    ...mapActions([
      'loadComments'
    ]),
    toggleOpen: function () {
      this.isOpen = !this.isOpen
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
  beforeUpdate: function () {
    if (this.loadedComments[this.articleId] || this.loadingComments[this.articleId]) return

    if (this.isOpen) {
      this.loadComments(this.articleId)
    }
  },
  components: { UserForm, CommentList }
}
</script>
