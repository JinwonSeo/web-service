import Vue from 'vue'
import Vuex from 'vuex'
import dialog from './common/store-global-dialog.js'
import overlay from './common/store-global-overlay.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    dialog,
    overlay
  }
})