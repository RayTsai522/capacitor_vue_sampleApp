import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Android from '@/components/Android'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/android',
      name: 'Android',
      component: Android
    }
  ]
})
