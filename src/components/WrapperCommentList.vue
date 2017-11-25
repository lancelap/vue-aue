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
        <CommentList :articleId="articleId" :comments="comments"/>
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
import Comment from '@/components/Comment'
import CommentList from '@/components/CommentList'
import UserForm from '@/components/UserForm'

export default {
  name: 'WrapperCommentList',
  data: function () {
    return {
      isOpen: false
    }
  },
  methods: {
    toggleOpen: function () {
      this.isOpen = !this.isOpen
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
  components: { Comment, UserForm, CommentList }
}
</script>
