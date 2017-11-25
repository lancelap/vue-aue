<template>
  <div>
    <div v-if="loadedArticles[id]">
      <div class="card-body">
        <h4 class="card-title">{{article.title}}</h4>
        <p class="text-left">{{ article.text }}</p>
        <WrapperCommentList :comments="article.comments" :articleId="id" :key="id"/>
      </div>
    </div>
    <div v-else>
      <Loader/>
    </div>
  </div>
</template>

<script>
import WrapperCommentList from '@/components/WrapperCommentList'
import Loader from '@/components/Loader'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'ArticleComponent',
  props: ['id'],
  computed: {
    article: function () {
      return this.articles[this.id]
    },
    ...mapState({
      loadedArticles: state => state.articlesModule.loadedArticles,
      articles: state => state.articlesModule.articles
    })
  },
  methods: {
    ...mapActions([
      'loadArticle'
    ]),
    getArticle: function (id) {
      if (!this.loadedArticles[id]) {
        this.loadArticle(id)
      }
    }
  },
  beforeRouteUpdate (to, from, next) {
    if (!this.loadedArticles[to.params.id]) {
      this.loadArticle(to.params.id)
    }
    next()
  },
  created: function () {
    if (!this.loadedArticles[this.id]) {
      this.loadArticle(this.id)
    }
  },
  components: { WrapperCommentList, Loader }
}
</script>
