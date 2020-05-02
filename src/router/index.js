import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: () => import('@/views/Home.vue'),
    },

    {
      path: '/:id',
      component: () => import('@/views/Inner.vue'),
    }
  ]
})
