<template>
  <div>
    <template v-if="loadingComments">
      <Loader />
    </template>
    <template v-else-if="!loadingComments && loadedComments">
      <ul class="list-group m-2">
        <li class="list-group-item" v-for="comment in comments" :key="comment.id">
          <Comment :comment="comment"/>
        </li>
      </ul>
    </template>
  </div>
</template>

<script>
import Comment from '@/components/Comment'
import Loader from '@/components/Loader'

export default {
  name: 'CommentList',
  props: {
    comments: {
      type: Array,
      require: true
    },
    loadedComments: {
      type: Boolean
    },
    loadingComments: {
      type: Boolean,
      require: true
    }
  },
  components: { Comment, Loader }
}
</script>
