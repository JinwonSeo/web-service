import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store/store"
import vuetify from './plugins/vuetify'

// Utilities
import axios from 'axios'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

import 'material-design-icons-iconfont/dist/material-design-icons.css'

const requireComponents = require.context(
  './components/common', false, /[\w-].vue$/
)

requireComponents.keys().forEach(fileName => {
  // Get component config
  const componentConfig = requireComponents(fileName)
  // Get PascalCase name of component
  const componentName = upperFirst(
    //camelCase(fileName.replace('common-', '').replace(/^\.\//, '').replace(/\.\w+$/, ''))
    camelCase(fileName.replace(/^\.\//, '').replace(/\.\w+$/, ''))
  )
  // Register component globally
  Vue.component(componentName, componentConfig.default || componentConfig)
})

const requireMixins = require.context(
  './mixins/common', false, /[\w-].js$/
)

requireMixins.keys().forEach(fileName => {
  const mixinConfig = requireMixins(fileName)
  Vue.mixin(mixinConfig.default)
})

Vue.config.productionTip = false

const enhanceAccessToeken = () => {
  const email = localStorage.getItem("sproutfx.platform.access.user.email")
  const accessToken = localStorage.getItem("sproutfx.platform.access.user.accessToken")
  const refreshToken = localStorage.getItem("sproutfx.platform.access.user.refreshToken")

  if (email === null || accessToken === null || refreshToken === null) return

  axios.defaults.headers.common["Authorization"] = accessToken
}

enhanceAccessToeken()

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
