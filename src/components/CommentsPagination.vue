<template>
  <div>
      <template v-if="total > 0">
        <nav aria-label="Page navigation example">
          <ul class="pagination justify-content-center mt-2">
              <router-link
                tag="li"
                class="page-item" active-class="active" v-for="n in paginator" :key="n"
                :to="`/comments/${n}`"
                ><a class="page-link">{{n}}</a>
              </router-link>
          </ul>
        </nav>
      </template>
      <CommentList
        :loadingComments="loadingComments"
        :loadedComments="true"
        :comments="commentIds && getArrComments(commentIds)"/>
  </div>
</template>

<script>
  import Loader from '@/components/Loader'
  import CommentList from '@/components/CommentList'
  import { mapState, mapActions, mapGetters } from 'vuex'

  export default {
    name: 'CommentsPagination',
    props: ['page'],
    computed: {
      ...mapState({
        total: state => state.commentsModule.total,
        pagination: state => state.commentsModule.pagination
      }),
      ...mapGetters({
        getArrComments: 'getArrComments'
      }),
      loadingComments: function () {
        if (this.pagination[this.page] && this.pagination[this.page].loading) return true
        return false
      },
      commentIds: function () {
        if (this.pagination[this.page] && !this.pagination[this.page].loading) {
          return this.pagination[this.page].ids
        }
        return null
      },
      paginator: function () {
        return Math.floor((this.total - 1) / 5 + 1)
      }
    },
    methods: {
      ...mapActions([
        'checkAndLoadCommentsForPage'
      ])
    },
    beforeRouteUpdate (to, from, next) {
      this.checkAndLoadCommentsForPage(to.params.page)
      next()
    },
    mounted: function () {
      this.checkAndLoadCommentsForPage(this.page)
    },
    components: { Loader, CommentList }
  }
</script>
