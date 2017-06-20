import Vue from 'vue'
import Router from 'vue-router'
import Guard from '../services/auth/middleware'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    // Each of these routes are loaded asynchronously, when a user first navigates to each corresponding endpoint.
    // The route will load once into memory, the first time it's called, and no more on future calls.
    // This behavior can be observed on the network tab of your browser dev tools.
    {
      path: '/login',
      name: 'login',
      component: function (resolve) {
        require(['@/components/Login.vue'], resolve)
      },
      beforeEnter: Guard.guest
    },
    {
      path: '/signup',
      name: 'signup',
      component: function (resolve) {
        require(['@/components/Signup.vue'], resolve)
      }
    },
    {
      path: '*',
      component: function (resolve) {
        require(['@/components/NotFound.vue'], resolve)
      }
    },
    {
      path: '/',
      name: 'dashboard',
      component: function (resolve) {
        require(['@/components/Dashboard.vue'], resolve)
      },
      beforeEnter: Guard.auth
    }
  ]
})

export default router
