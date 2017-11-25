import Vue from 'vue'
import Router from 'vue-router'
import FilterComponent from '@/components/FilterComponent'
import ArticleList from '@/components/ArticleList'
import ArticleComponent from '@/components/ArticleComponent'
import NotFound from '@/components/NotFound'
import CommentsPagination from '@/components/CommentsPagination'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/'
    },
    {
      path: '/articles',
      children: [
        {
          path: ''
        },
        {
          path: ':id',
          component: ArticleComponent,
          props: true
        }
      ],
      component: ArticleList
    },
    {
      path: '/filters',
      name: 'filters',
      component: FilterComponent
    },
    {
      path: '/comments',
      name: 'comments',
      component: CommentsPagination
    },
    {
      path: '*',
      component: NotFound
    }
  ]
})
