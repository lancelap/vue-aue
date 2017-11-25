import { ADD_COMMENT, SUCCESS, START, FAIL, LOAD_ARTICLE_COMMENTS, LOAD_COMMENTS_FOR_PAGE } from '../mutation-types'
import { arrToMap } from '../../helpers'

export const commentsModule = {
  state: {
    loadingComments: {},
    loadedComments: {},
    comments: {},
    total: 0,
    pagination: {}
  },
  mutations: {
    [ADD_COMMENT] (state, { comment }) {
      const idComment = guid()
      console.log(state)
      const article = state.articlesModule.articles[comment.articleId]

      state.comments = {
        ...state.comments,
        [article]: {
          [idComment]: {
            id: idComment,
            text: comment.text,
            user: comment.user
          }
        }
      }

      if (article.comments) {
        state.articles[comment.articleId].comments = article.comments.concat(idComment)
      } else {
        state.articles[comment.articleId] = {
          ...article,
          comments: [idComment]
        }
      }

      function guid () {
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
          s4() + '-' + s4() + s4() + s4()
      }
      function s4 () {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1)
      }
    },
    [LOAD_ARTICLE_COMMENTS + START] (state, { id }) {
      state.loadingComments = { ...state.loadingComments, [id]: true }
      state.loadedComments = { ...state.loadedComments, [id]: false }
    },
    [LOAD_ARTICLE_COMMENTS + SUCCESS] (state, { comments, id }) {
      state.comments = Object.assign({}, state.comments, comments)
      state.loadingComments[id] = false
      state.loadedComments[id] = true
    },
    [LOAD_ARTICLE_COMMENTS + FAIL] (state, { id }) {
      state.loadingComments[id] = false
      state.loadedComments[id] = false
    },
    [LOAD_COMMENTS_FOR_PAGE + START] (state, page) {
      console.log('@@@ page', page)
    },
    [LOAD_COMMENTS_FOR_PAGE + SUCCESS] (state, payload) {
      const { comments, total, page } = payload
      console.log(Object.keys(comments), total, page)
      state.comments = Object.assign({}, state.comments, comments)
      state.total = total
      state.pagination = Object.assign(
        {},
        state.pagination,
        {
          [page]: {
            loading: false,
            ids: Object.keys(comments)
          }
        }
      )
    }
  },
  actions: {
    loadComments ({ commit }, id) {
      commit(LOAD_ARTICLE_COMMENTS + START, { id })

      setTimeout(() => {
        fetch(`/api/comment?article=${id}`)
          .then((response) => {
            if (response.status >= 400) {
              throw new Error(response.statusText)
            }
            return response.json()
          })
          .then((response) => {
            response = arrToMap(response)
            commit(LOAD_ARTICLE_COMMENTS + SUCCESS, {comments: response, id})
          })
          .catch((error) => {
            commit(LOAD_ARTICLE_COMMENTS + FAIL, { id })
            console.log(error)
          })
      }, 1000)
    },
    addComment ({ commit, rootState }) {
      commit({
        type: ADD_COMMENT,
        payload: {
          commit
        }
      })
    },
    checkAndLoadCommentsForPage ({ commit, rootState }, payload) {
      const { pagination } = rootState.commentsModule
      if (pagination[payload.page] && (pagination[payload.page].loading || pagination[payload.page].ids)) {
        return
      }

      commit(LOAD_COMMENTS_FOR_PAGE + START, payload.page)

      fetch(`/api/comment?limit=5&offset=${(payload.page - 1) * 5}`)
      .then((response) => {
        if (response.status >= 400) {
          throw new Error(response.statusText)
        }
        return response.json()
      })
      .then((response) => {
        const { total } = response
        const comments = arrToMap(response.records)

        commit(LOAD_COMMENTS_FOR_PAGE + SUCCESS, { comments, total, page: payload.page })
      })
      .catch((error) => {
        commit(LOAD_COMMENTS_FOR_PAGE + FAIL)
        console.log(error)
      })
    }
  },
  getters: {
    getArrComments: (state) => (comments) => {
      let commentsArr = []
      comments.forEach(commentId => {
        commentsArr.push(state.comments[commentId])
      })
      return commentsArr
    }
  }
}