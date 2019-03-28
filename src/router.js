import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Response from './views/Success.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/res',
      name: 'res',
      component: Response
    },
   
  ]
})
