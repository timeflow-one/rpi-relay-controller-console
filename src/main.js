import Vue from 'vue'
import App from '@/ui/views/AppView.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
