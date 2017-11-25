import { LOAD_ALL_ARTICLE, DELETE_ARTICLE, LOAD_ARTICLE, SUCCESS, START, FAIL } from '../mutation-types'
import { arrToMap, mapToArr } from '../../helpers'

export const articlesModule = {
  state: {
    loading: false,
    loadedArticles: {},
    articles: {}
  },
  mutations: {
    [DELETE_ARTICLE] (state, { id }) {
      console.log('DELETE_ARTICLE', id)
      state.articles = mapToArr(state.articles).filter(article => article.id !== id)
    },
    [LOAD_ALL_ARTICLE + START] (state) {
      state.loading = true
    },
    [LOAD_ALL_ARTICLE + SUCCESS] (state, { articles }) {
      state.articles = articles
      state.loading = false
    },
    [LOAD_ALL_ARTICLE + FAIL] (state) {
      state.loading = false
    },
    [LOAD_ARTICLE + START] (state, { id }) {
      state.loadedArticles = {...state.loadedArticles, [id]: false}
    },
    [LOAD_ARTICLE + SUCCESS] (state, { article, id }) {
      state.articles[article.id] = article
      state.loadedArticles[id] = true
    },
    [LOAD_ARTICLE + FAIL] (state, { id }) {
      state.loadedArticles[id] = true
    }
  },
  actions: {
    loadArticles ({ commit }) {
      commit(LOAD_ALL_ARTICLE + START)

      setTimeout(() => {
        fetch('/api/article')
          .then((response) => {
            if (response.status >= 400) {
              throw new Error(response.statusText)
            }
            return response.json()
          })
          .then((response) => {
            response = arrToMap(response)
            commit(LOAD_ALL_ARTICLE + SUCCESS, {articles: response})
          })
          .catch((error) => {
            commit(LOAD_ALL_ARTICLE + FAIL)
            console.log(error)
          })
      }, 1000)
    },
    loadArticle ({ commit }, id) {
      commit(LOAD_ARTICLE + START, { id })

      setTimeout(() => {
        fetch(`/api/article/${id}`)
          .then((response) => {
            if (response.status >= 400) {
              throw new Error(response.statusText)
            }
            return response.json()
          })
          .then((response) => {
            commit(LOAD_ARTICLE + SUCCESS, { article: response, id })
          })
          .catch((error) => {
            commit(LOAD_ARTICLE + FAIL, { id })
            console.log(error)
          })
      }, 1000)
    }
  },
  getters: {
  }
}
