import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/views/Home'
import Auth from '@/views/Authentication'
import ClientDashboard from '@/views/client/Dashboard'

Vue.use(Router)

const router = new Router({

  scrollBehavior () {
    return { x: 0, y: 0 }
  },

  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/authentication',
      name: 'authentication',
      component: Auth,
      meta: {
        noAuth: true
      }
    },
    {
      path: '/client',
      name: 'client-dashboard',
      component: ClientDashboard,
    }
  ]
})



export default router