import Vue from 'vue'
import VueRouter from 'vue-router'
import LocksView from '@/ui/views/LocksView.vue'
import ConfigsView from '@/ui/views/ConfigsView.vue'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      name: 'locks',
      path: '/locks',
      alias: '/',
      component: LocksView
    },
    {
      name: 'config',
      path: '/config',
      component: ConfigsView
    }
  ]
})
