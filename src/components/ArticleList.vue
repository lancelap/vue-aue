<template>
  <div class="container">
    {{this.comments}}
    <template v-if="loading || !loaded">
      <Loader/>
    </template>
    <template v-else>
      <div class="row justify-content-center">
        <ul class="nav flex-column">
          <li class="nav-item" v-for="article in filteredArticles" :key="article.id">
            <router-link
              :to="`/articles/${article.id}`"
              class="nav-link"
              active-class="active"
              append>{{article.title}}
            </router-link>
          </li>
        </ul>
      </div>
    </template>
    <router-view></router-view>
  </div>
</template>

<script>
import ArticleComponent from '@/components/ArticleComponent'
import Loader from '@/components/Loader'
import { mapState, mapGetters, mapActions } from 'vuex'
import 'v-calendar/lib/v-calendar.min.css'

export default {
  name: 'ArticleList',
  computed: {
    ...mapState({
      loading: state => state.articlesModule.loading,
      loaded: state => state.articlesModule.loaded,
      comments: state => state.commentsModule.commentsPagination
    }),
    ...mapGetters({
      filteredArticles: 'filteredArticles'
    })
  },
  methods: {
    toggleOpenArticle: function (id) {
      if (id === this.isOpenArticleId) {
        this.isOpenArticleId = null
        return null
      }
      this.isOpenArticleId = id
    },
    ...mapActions([
      'loadArticles'
    ])
  },
  mounted: function () {
    if (this.loaded) return
    this.loadArticles()
  },
  components: { ArticleComponent, Loader }
}
</script>
