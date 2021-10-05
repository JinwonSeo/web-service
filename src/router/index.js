import Vue from 'vue'
import Router from 'vue-router'

import SignIn from '@/components/layouts/layout-sign-in.vue'
import ErrorNetwork from '@/components/layouts/error/layout-error-network.vue'
import Error404 from '@/components/layouts/error/layout-error-404.vue'
import Error500 from '@/components/layouts/error/layout-error-500.vue'
import Home from '@/components/views/view-home.vue'
import AdminEnumeration from '@/components/views/admin/enumeration/view-enumeration.vue'
import AdminMenu from '@/components/views/admin/menu/view-menu.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/error-network',
      name: 'error-network',
      component: ErrorNetwork,
      meta: {
        isFullScreenLayout: true
      }
    },
    {
      path: '/error-404',
      name: 'error-404',
      component: Error404,
      meta: {
        isFullScreenLayout: true
      }
    },
    {
      path: '/error-500',
      name: 'error-500',
      component: Error500,
      meta: {
        isFullScreenLayout: true
      }
    },
    {
      path: '/sign-in',
      name: 'sign-in',
      component: SignIn,
      meta: {
        isFullScreenLayout: true
      }
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/admin/enumeration',
      name: 'admin-enumeration',
      component: AdminEnumeration
    },
    {
      path: '/admin/menu',
      name: 'admin-menu',
      component: AdminMenu
    }
  ]
})