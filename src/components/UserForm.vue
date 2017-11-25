<template>
  <div>
    <form class="text-left" v-on:submit.prevent="submitComment()">
      <div class="form-group">
        <label for="inputUsername">Username</label>
        <input
          class="form-control"
          :class="{'is-invalid': !validation.username}"
          id="inputUsername"
          type="text"
          placeholder="Enter username"
          v-model="username"
        >
        <div v-show="!validation.username" class="invalid-feedback">
          Username cannot be empty.
        </div>
      </div>
      <div class="form-group">
        <label for="inputComment">Comment</label>
        <textarea
          class="form-control"
          :class="{'is-invalid': !validation.commentText}"
          id="inputComment"
          v-model="commentText"
          placeholder="Enter comment"
        >
        </textarea>
        <div v-show="!validation.comcommentTextment" class="invalid-feedback">
          Comment cannot be empty.
        </div>
      </div>
      <button
        :disabled="!isValid"
        type="submit"
        class="btn btn-primary">Submit
      </button>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Comment',
  data: () => {
    return {
      username: '',
      commentText: ''
    }
  },
  props: {
    articleId: {
      type: String
    }
  },
  computed: {
    validation: function () {
      return {
        username: !!this.username.trim(),
        commentText: !!this.commentText.trim()
      }
    },
    isValid: function () {
      const validation = this.validation
      return Object.keys(validation).every(function (key) {
        return validation[key]
      })
    }
  },
  methods: {
    ...mapActions([
      'addComment'
    ]),
    submitComment: function () {
      this.addComment({
        comment: {
          text: this.commentText,
          user: this.username,
          articleId: this.articleId
        }
      })
    }
  }
}
</script>
