import Vue from 'vue'
import Router from 'vue-router'
import FilterComponent from '@/components/FilterComponent'
import ArticleList from '@/components/ArticleList'
import HelloWorld from '@/components/HelloWorld'
import ArticleComponent from '@/components/ArticleComponent'
import NotFound from '@/components/NotFound'
import CommentsPagination from '@/components/CommentsPagination'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: HelloWorld
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
      redirect: '/comments/1'
    },
    {
      path: '/comments/:page',
      name: 'comments',
      component: CommentsPagination,
      props: true
    },
    {
      path: '*',
      component: NotFound
    }
  ]
})
