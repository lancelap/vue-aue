<template>
  <div>
    <v-date-picker
      mode="range"
      :fromPage="{ month: 6, year: 2016 }"
      v-model="dataDateSelection">
    </v-date-picker>
    <vSelect
      class="mt-2 mb-2"
      multiple
      v-model="dataSelected"
      :options="articlesOption">
    </vSelect>
  </div>
</template>

<script>
  import vSelect from 'vue-select'
  import { mapState, mapMutations } from 'vuex'
  import { CHANGE_DATE_RANGE, CHANGE_SELECTED } from '../store/mutation-types'
  import 'v-calendar/lib/v-calendar.min.css'

  export default {
    name: 'FilterComponent',
    computed: {
      dataDateSelection: {
        get: function () { return this.dateSelection },
        set: function (newValue) {
          this.CHANGE_DATE_RANGE({date: newValue})
        }
      },
      dataSelected: {
        get: function () { return this.selected },
        set: function (newValue) {
          this.CHANGE_SELECTED({selected: newValue})
        }
      },
      articlesOption () {
        let articlesOption = []
        for (let key in this.articles) {
          articlesOption.push({
            label: this.articles[key].title,
            value: this.articles[key].id
          })
        }
        return articlesOption
      },
      ...mapState({
        articles: state => state.articlesModule.articles,
        dateSelection: state => state.filters.dateSelection,
        selected: state => state.filters.selected
      })
    },
    methods: {
      ...mapMutations({
        CHANGE_DATE_RANGE,
        CHANGE_SELECTED
      })
    },
    components: { vSelect }
  }
</script>
