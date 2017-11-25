import Vue from 'vue'
import Vuex from 'vuex'
import { articlesModule } from './modules/articlesModule'
import { commentsModule } from './modules/commentsModule'
import { filters } from './modules/filters'
import { mapToArr } from '../helpers'
import { actions } from './actions'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    articlesModule,
    commentsModule,
    filters
  },
  state: {},
  mutations: {},
  getters: {
    filteredArticles (state, getters) {
      const { articles } = state.articlesModule
      const { selected, dateSelection: {startTime, endTime} } = state.filters
      const arraySelected = selected.map(option => option.value)
      return mapToArr(articles).filter(article => {
        const published = Date.parse(article.date)
        return ((!arraySelected.length || arraySelected.includes(article.id)) &&
          (!startTime || !endTime || (published > startTime && published < endTime)))
      })
    }
  },
  actions
})

window.store = store

export default store
