import Vue from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faPlus,
  faCalendarPlus,
  faSpinner
} from '@fortawesome/free-solid-svg-icons'

library.add(faPlus, faCalendarPlus, faSpinner)
Vue.component('font-awesome-icon', FontAwesomeIcon)
