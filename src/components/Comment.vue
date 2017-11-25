<template>
  <div>
    <b class="card-title">{{ comment.user }}: </b>
    <p class="text-left">{{ comment.text }}</p>
  </div>
</template>

<script>
export default {
  name: 'Comment',
  props: {
    comment: {
      type: Object,
      required: true
    }
  }
}
</script>
