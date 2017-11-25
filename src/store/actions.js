import router from '../router'
import { ADD_COMMENT } from './mutation-types'

export const actions = {
  error404 () {
    router.replace('/404')
  },
  addComment ({ commit }, payload) {
    const idComment = guid()
    console.log('@@@@', payload.comment)
    commit({
      type: ADD_COMMENT,
      comment: payload.comment,
      idComment
    })

    function guid () {
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4()
    }
    function s4 () {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1)
    }
  }
}
