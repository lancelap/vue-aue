import { CHANGE_DATE_RANGE, CHANGE_SELECTED } from '../mutation-types'

export const filters = {
  state: {
    dateSelection: {},
    selected: []
  },
  mutations: {
    [CHANGE_DATE_RANGE] (state, { date }) {
      console.log('CHANGE_DATE_RANGE', date)
      state.dateSelection = date
    },
    [CHANGE_SELECTED] (state, { selected }) {
      console.log('CHANGE_SELECTED', selected)
      state.selected = selected
    }
  },
  getters: {
  },
  actions: {
  }
}
