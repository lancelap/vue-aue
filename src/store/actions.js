import router from '../router'

export const actions = {
  error404 () {
    router.replace('/404')
  }
}
